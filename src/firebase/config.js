import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDbA2H-GcqbqeyQ9uUEXxXUCHl8PsMToYQ",
  authDomain: "quickbook-30686.firebaseapp.com",
  projectId: "quickbook-30686",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);