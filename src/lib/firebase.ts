import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  OAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDWBGuW5JLDmt-wzNqh883JrnAh5rt3950",
  authDomain: "kachi-41979.firebaseapp.com",
  projectId: "kachi-41979",
  storageBucket: "kachi-41979.firebasestorage.app",
  messagingSenderId: "1054006254338",
  appId: "1:1054006254338:web:907b5580b6c5264b85801b",
  measurementId: "G-BMKM5X86TN"
};

// Initialize Firebase safely (avoid multiple initializations)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Auth Providers
export const googleProvider = new GoogleAuthProvider();
export const microsoftProvider = new OAuthProvider('microsoft.com');

// Helper sign in functions
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error: any) {
    return { user: null, error: error?.message || 'فشل تسجيل الدخول بواسطة Google' };
  }
}

export async function signInWithMicrosoft() {
  try {
    const result = await signInWithPopup(auth, microsoftProvider);
    return { user: result.user, error: null };
  } catch (error: any) {
    return { user: null, error: error?.message || 'فشل تسجيل الدخول بواسطة Microsoft' };
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

export { onAuthStateChanged };
export type { User };
