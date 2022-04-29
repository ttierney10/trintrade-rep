// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmCGEbshPcFpsM-dNr9pFSlkPc85n5TQ8",
  authDomain: "trintrade-db.firebaseapp.com",
  projectId: "trintrade-db",
  storageBucket: "trintrade-db.appspot.com",
  messagingSenderId: "595286794420",
  appId: "1:595286794420:web:c6bbe0d19bd46b36d2b7e1",
  measurementId: "G-GBPE2R18L9"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
var db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default db;

