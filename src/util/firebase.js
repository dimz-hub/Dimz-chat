// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBlUBBIITYC3R8m9GxGlDgAzadYOJhkd7Q",
  authDomain: "dimz-chat.firebaseapp.com",
  projectId: "dimz-chat",
  storageBucket: "dimz-chat.appspot.com",
  messagingSenderId: "672145359015",
  appId: "1:672145359015:web:771df4f9f393253def1b82",
  measurementId: "G-83J6RR69BB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
