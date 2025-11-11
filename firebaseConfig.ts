import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
// FIX: Changed the import path from a non-standard alias to a relative path.
import { firebaseConfig as config } from './firebaseCredentials';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let isFirebaseConfigured = false;

// Check if the config object has any values.
// An empty config is provided in the example file.
if (config && Object.values(config).some(v => v)) {
    try {
        app = initializeApp(config);
        auth = getAuth(app);
        db = getFirestore(app);
        isFirebaseConfigured = true;
    } catch (e) {
        console.error("Firebase initialization failed:", e);
        isFirebaseConfigured = false;
    }
} else {
    console.warn("Firebase configuration is missing. Please set up 'firebaseCredentials.ts'.");
}

export { app, auth, db, isFirebaseConfigured };