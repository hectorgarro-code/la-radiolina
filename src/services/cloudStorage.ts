import { fetchCloudSiteData, saveCloudSiteData, subscribeToCloudSiteData, FullSiteData } from './firebase';

// Key for local storage mirror cache
const LOCAL_CACHE_KEY = 'radiolina_global_cloud_cache';

// Check if custom REST cloud endpoint is provided
const CUSTOM_REST_ENDPOINT = import.meta.env.VITE_CLOUD_STORAGE_URL;

/**
 * Load complete site configuration from Cloud (or local cache if offline)
 */
export async function loadGlobalSiteConfig(): Promise<{ data: FullSiteData | null; source: 'firebase' | 'rest' | 'local' | 'none' }> {
  // 1. Try Firebase Firestore
  const { data: firestoreData, connected } = await fetchCloudSiteData();
  if (connected) {
    if (firestoreData) {
      localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(firestoreData));
    }
    return { data: firestoreData, source: 'firebase' };
  }


  // 2. Try REST Cloud Endpoint fallback if valid custom endpoint is configured
  if (CUSTOM_REST_ENDPOINT && CUSTOM_REST_ENDPOINT.startsWith('http')) {
    try {
      const res = await fetch(CUSTOM_REST_ENDPOINT, {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        const json = await res.json();
        const record = json.record || json;
        if (record && (record.siteTexts || record.planPacks || record.alumnos)) {
          localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(record));
          return { data: record as FullSiteData, source: 'rest' };
        }
      }
    } catch (err) {
      console.log('[Cloud Storage] REST fallback check skipped or offline');
    }
  }

  // 3. Try Local Cached Copy
  try {
    const cached = localStorage.getItem(LOCAL_CACHE_KEY);
    if (cached) {
      return { data: JSON.parse(cached) as FullSiteData, source: 'local' };
    }
  } catch (err) {
    // ignore
  }

  return { data: null, source: 'none' };
}

/**
 * Save site configuration to Cloud and broadcast globally
 */
export async function saveGlobalSiteConfig(data: Partial<FullSiteData>): Promise<{ success: boolean; cloud: 'firebase' | 'rest' | 'none' }> {
  // Always update local cache first
  try {
    const existing = localStorage.getItem(LOCAL_CACHE_KEY);
    const prevData = existing ? JSON.parse(existing) : {};
    const updated = { ...prevData, ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed saving to local cache:', e);
  }

  // 1. Try Firebase Firestore
  const firebaseSuccess = await saveCloudSiteData(data);
  if (firebaseSuccess) {
    return { success: true, cloud: 'firebase' };
  }

  // 2. Try REST Endpoint fallback if custom endpoint configured
  if (CUSTOM_REST_ENDPOINT && CUSTOM_REST_ENDPOINT.startsWith('http')) {
    try {
      const res = await fetch(CUSTOM_REST_ENDPOINT, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        return { success: true, cloud: 'rest' };
      }
    } catch (err) {
      console.warn('[Cloud Storage] REST cloud save failed:', err);
    }
  }

  // If both cloud providers fail or are not configured, indicate cloud sync failed
  return { success: false, cloud: 'none' };
}

/**
 * Subscribe to real-time changes
 */
export function listenToGlobalChanges(onUpdate: (data: FullSiteData) => void): () => void {
  return subscribeToCloudSiteData(onUpdate);
}

