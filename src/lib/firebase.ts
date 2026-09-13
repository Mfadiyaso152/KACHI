import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDWBGuW5JLDmt-wzNqh883JrnAh5rt3950",
  authDomain: "kachi-41979.firebaseapp.com",
  projectId: "kachi-41979",
  storageBucket: "kachi-41979.firebasestorage.app",
  messagingSenderId: "1054006254338",
  appId: "1:1054006254338:web:907b5580b6c5264b85801b",
  measurementId: "G-BMKM5X86TN"
};

// Initialize Firebase safely
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth Providers
export const googleProvider = new GoogleAuthProvider();

// Helper sign in functions
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error: any) {
    return { user: null, error: error?.message || 'فشل تسجيل الدخول بواسطة Google' };
  }
}

export async function logOut() {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message };
  }
}

export { 
  onAuthStateChanged, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  orderBy 
};
export type { User };
