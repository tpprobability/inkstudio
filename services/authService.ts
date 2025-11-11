import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    if (!auth) {
        console.error("Firebase Auth is not initialized.");
        throw new Error("Authentication service is not available.");
    }
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("Error during Google sign-in:", error);
        throw error;
    }
};

export const signOutUser = async () => {
    if (!auth) {
        console.error("Firebase Auth is not initialized.");
        return;
    }
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out:", error);
    }
};