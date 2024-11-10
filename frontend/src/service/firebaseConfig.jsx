// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ853IV6lcYn5fe2Nw-fSqXU6m-fjN4-g",
  authDomain: "tripnest-227d0.firebaseapp.com",
  projectId: "tripnest-227d0",
  storageBucket: "tripnest-227d0.firebasestorage.app",
  messagingSenderId: "593593235835",
  appId: "1:593593235835:web:9dd5deabfa10dd9ec3e5de",
  measurementId: "G-1FGTLMQ6MS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);