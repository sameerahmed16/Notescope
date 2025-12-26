// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase authentication
import { getStorage } from "firebase/storage"; // For storing profile images
import { getFirestore } from "firebase/firestore"; // Firestore to store user data

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7xK93Tq-3-Au-exmj9jVeFeUZ3KJp9-w",
  authDomain: "notescope-92320.firebaseapp.com",
  projectId: "notescope-92320",
  storageBucket: "notescope-92320.appspot.com",
  messagingSenderId: "217835463409",
  appId: "1:217835463409:web:7e5dce9021ddbcb1efff50",
  measurementId: "G-VVFZNY3DCD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app); // Firestore (optional) for storing user details

// Export auth, storage, and db to use them in the app
export { auth, storage, db };
