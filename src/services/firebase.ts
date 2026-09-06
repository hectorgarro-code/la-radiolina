import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot 
} from 'firebase/firestore';

// Configuration can come from environment variables or direct config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD4FFxzQXy244K_HIS-uZiRyQivJ3p-kM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "radiolina-musica.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "radiolina-musica",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "radiolina-musica.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "317141189190",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:317141189190:web:d419fec7ad9296f926c047"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Firestore document reference for site data
const CONFIG_DOC_PATH = ['site', 'configuration'] as const;

export interface FullSiteData {
  siteTexts?: any;
  estudioInstrumentos?: any[];
  planPacks?: any[];
  alumnos?: any[];
  recursos?: any[];
  dialChannels?: any[];
  radioSets?: any[];
  eventoClub?: any;
  updatedAt?: string;
}

export function isFirebaseConfigured(): boolean {
  const key = firebaseConfig.apiKey;
  return Boolean(key && !key.includes('demo') && key.length > 20);
}

/**
 * Fetch complete site data from Cloud (Firestore)
 */
export async function fetchCloudSiteData(): Promise<{ data: FullSiteData | null; connected: boolean }> {
  if (!isFirebaseConfigured()) {
    console.info('[Cloud Storage] Firebase no está configurado con credenciales reales.');
    return { data: null, connected: false };
  }
  try {
    const docRef = doc(db, CONFIG_DOC_PATH[0], CONFIG_DOC_PATH[1]);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { data: docSnap.data() as FullSiteData, connected: true };
    }
    return { data: null, connected: true };
  } catch (error) {
    console.warn('[Cloud Storage] Firebase fetch failed or permission denied:', error);
    return { data: null, connected: false };
  }
}


/**
 * Save complete site data to Cloud (Firestore)
 */
export async function saveCloudSiteData(data: Partial<FullSiteData>): Promise<boolean> {
  if (!isFirebaseConfigured()) {
    console.info('[Cloud Storage] No se puede guardar en Firebase: credenciales no configuradas.');
    return false;
  }
  try {
    const docRef = doc(db, CONFIG_DOC_PATH[0], CONFIG_DOC_PATH[1]);
    await setDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log('[Cloud Storage] Data saved to Firebase Firestore successfully');
    return true;
  } catch (error) {
    console.warn('[Cloud Storage] Firebase save failed:', error);
    return false;
  }
}

/**
 * Subscribe to real-time changes in Firestore
 */
export function subscribeToCloudSiteData(onUpdate: (data: FullSiteData) => void): () => void {
  if (!isFirebaseConfigured()) {
    return () => {};
  }
  try {
    const docRef = doc(db, CONFIG_DOC_PATH[0], CONFIG_DOC_PATH[1]);
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        onUpdate(docSnap.data() as FullSiteData);
      }
    }, (error) => {
      console.warn('[Cloud Storage] Firestore real-time listener error:', error);
    });
  } catch (error) {
    console.warn('[Cloud Storage] Could not set up Firestore listener:', error);
    return () => {};
  }
}

