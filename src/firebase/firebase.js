// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8h8LOXdwK3ZGzcQa0izEZGSX-XtqHydI",
  authDomain: "weather-app-b5130.firebaseapp.com",
  projectId: "weather-app-b5130",
  storageBucket: "weather-app-b5130.appspot.com",
  messagingSenderId: "272185013720",
  appId: "1:272185013720:web:ef95286f21b2acf7256ead",
  measurementId: "G-2NRZ9GHLKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };