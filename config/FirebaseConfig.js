// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "meet-sheduler.firebaseapp.com",
  projectId: "meet-sheduler",
  storageBucket: "meet-sheduler.appspot.com",
  messagingSenderId: "513320509249",
  appId: "1:513320509249:web:2e98883a788dc6f0dfcbc0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);