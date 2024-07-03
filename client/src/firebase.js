// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-9a0ab.firebaseapp.com",
  projectId: "mern-estate-9a0ab",
  storageBucket: "mern-estate-9a0ab.appspot.com",
  messagingSenderId: "352311575242",
  appId: "1:352311575242:web:0170e4143bbe04f0056a33"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);