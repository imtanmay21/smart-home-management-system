// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDayUZwUBBKeDHhc6Z7GgJE4gRNptLqPyQ",
  authDomain: "smart-home-management-sy-e9dd8.firebaseapp.com",
  projectId: "smart-home-management-sy-e9dd8",
  storageBucket: "smart-home-management-sy-e9dd8.appspot.com",
  messagingSenderId: "118160485022",
  appId: "1:118160485022:web:7008ea1f25118e87a4298f",
  measurementId: "G-N643PC5W4V",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
