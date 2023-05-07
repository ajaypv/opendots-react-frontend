import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDo0I_1jsZhiRHQWerg4cSp6jM0MPGI7es",
  authDomain: "mypro-d968a.firebaseapp.com",
  databaseURL: "https://mypro-d968a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mypro-d968a",
  storageBucket: "mypro-d968a.appspot.com",
  messagingSenderId: "479890053772",
  appId: "1:479890053772:web:03c847d8f0f9e1410679a9",
  measurementId: "G-PNGGVSPP71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
export default app;

