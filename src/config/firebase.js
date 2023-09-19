// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword as signInWithEmail, signOut as authSignOut, onAuthStateChanged } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export const signInUserWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmail(auth, email, password);
    return { success: true };
  } catch (error) {
    console.error("Error signing in", error);
    if (error.code === "auth/user-not-found") {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        return { success: true };
      } catch (creationError) {
        console.error("Error creating account", creationError);
        return { success: false, error: creationError.message };
      }
    }
    return { success: false, error: error.message };
  }
};


export const signOutUser = async () => {
  try {
    await authSignOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Error signing out", error);
    return { success: false, error: error.message };
  }
};

export const authStateListener = (setUser) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
};

export { auth };
