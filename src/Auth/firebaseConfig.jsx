import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apikey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const saveHighScore = async (userId, score) => {
  try {
    await setDoc(doc(db, "highScores", userId), { score });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getHighScore = async (userId) => {
  try {
    const docSnap = await getDoc(doc(db, "highScores", userId));
    if (docSnap.exists()) {
      return docSnap.data().score;
    } else {
      return 0;
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
};

export {
  auth,
  provider,
  signInWithPopup,
  signOut,
  db,
  saveHighScore,
  getHighScore,
};
