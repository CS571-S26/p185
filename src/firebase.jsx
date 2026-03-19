// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgbBet5vty0kRFcidzLHNcQZYrXWy0ntU",
    authDomain: "scoopnpull.firebaseapp.com",
    projectId: "scoopnpull",
    storageBucket: "scoopnpull.firebasestorage.app",
    messagingSenderId: "367702482158",
    appId: "1:367702482158:web:e79fd9d44adc7fe7fd27ff",
    measurementId: "G-147RV2QFBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);

