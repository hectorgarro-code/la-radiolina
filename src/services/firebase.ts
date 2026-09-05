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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSy_demo_radiolina_key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "radiolina-musica.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "radiolina-musica",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "radiolina-musica.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "100000000000",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:100000000000:web:abcdef123456"
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

/**
 * Fetch complete site data from Cloud (Firestore)
 */
export async function fetchCloudSiteData(): Promise<FullSiteData | null> {
  try {
    const docRef = doc(db, CONFIG_DOC_PATH[0], CONFIG_DOC_PATH[1]);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as FullSiteData;
    }
  } catch (error) {
    console.warn('[Cloud Storage] Firebase fetch failed or not configured, falling back to local/REST:', error);
  }
  return null;
}

/**
 * Save complete site data to Cloud (Firestore)
 */
export async function saveCloudSiteData(data: Partial<FullSiteData>): Promise<boolean> {
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
