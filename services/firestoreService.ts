import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { BotBuild } from '../types';

const BUILDS_COLLECTION = 'builds';

export const getBotBuildsForUser = async (userId: string): Promise<BotBuild[]> => {
    if (!db) throw new Error("Firestore is not initialized.");
    
    const buildsRef = collection(db, BUILDS_COLLECTION);
    const q = query(buildsRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
    
    const querySnapshot = await getDocs(q);
    const builds: BotBuild[] = [];
    querySnapshot.forEach((doc) => {
        builds.push({ id: doc.id, ...doc.data() } as BotBuild);
    });
    return builds;
};

export const addBotBuild = async (build: Omit<BotBuild, 'id'>): Promise<string> => {
    if (!db) throw new Error("Firestore is not initialized.");

    const docRef = await addDoc(collection(db, BUILDS_COLLECTION), build);
    return docRef.id;
};