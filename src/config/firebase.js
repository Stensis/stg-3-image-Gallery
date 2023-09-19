// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword as signInWithEmail, signOut as authSignOut, onAuthStateChanged } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC7IUISm0gAmhDZe7loAxhzkw2tiku4E9o",
  authDomain: "gallery-image-e3e49.firebaseapp.com",
  projectId: "gallery-image-e3e49",
  storageBucket: "gallery-image-e3e49.appspot.com",
  messagingSenderId: "548049402311",
  appId: "1:548049402311:web:f6f0ec547a940a0fac41e2",
  measurementId: "G-V81NLE5MJR",
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
