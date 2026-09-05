import { fetchCloudSiteData, saveCloudSiteData, subscribeToCloudSiteData, FullSiteData } from './firebase';

// Key for local storage mirror cache
const LOCAL_CACHE_KEY = 'radiolina_global_cloud_cache';

// Free JSONBin / KV Bin endpoint as instant fallback if Firebase is not yet configured
const REST_CLOUD_ENDPOINT = import.meta.env.VITE_CLOUD_STORAGE_URL || 'https://api.jsonbin.io/v3/b/66e01234radiolina_fallback';

/**
 * Load complete site configuration from Cloud (or local cache if offline)
 */
export async function loadGlobalSiteConfig(): Promise<FullSiteData | null> {
  // 1. Try Firebase Firestore
  const firestoreData = await fetchCloudSiteData();
  if (firestoreData) {
    // Cache locally for instant next load
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(firestoreData));
    return firestoreData;
  }

  // 2. Try REST Cloud Endpoint fallback if available
  try {
    const res = await fetch(REST_CLOUD_ENDPOINT, {
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      const json = await res.json();
      const record = json.record || json;
      if (record && record.siteTexts) {
        localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(record));
        return record as FullSiteData;
      }
    }
  } catch (err) {
    console.log('[Cloud Storage] REST fallback check skipped or offline');
  }

  // 3. Try Local Cached Copy
  try {
    const cached = localStorage.getItem(LOCAL_CACHE_KEY);
    if (cached) {
      return JSON.parse(cached) as FullSiteData;
    }
  } catch (err) {
    // ignore
  }

  return null;
}

/**
 * Save site configuration to Cloud and broadcast globally
 */
export async function saveGlobalSiteConfig(data: Partial<FullSiteData>): Promise<{ success: boolean; cloud: 'firebase' | 'rest' | 'local' }> {
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

  // 2. Try REST Endpoint fallback
  try {
    const res = await fetch(REST_CLOUD_ENDPOINT, {
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

  return { success: true, cloud: 'local' };
}

/**
 * Subscribe to real-time changes
 */
export function listenToGlobalChanges(onUpdate: (data: FullSiteData) => void): () => void {
  return subscribeToCloudSiteData(onUpdate);
}
