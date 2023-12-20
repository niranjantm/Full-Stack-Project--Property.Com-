// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey:process.env.REACT_APP_API_KEY,
  authDomain: "real-estate-1-b3f63.firebaseapp.com",
  projectId: "real-estate-1-b3f63",
  storageBucket: "real-estate-1-b3f63.appspot.com",
  messagingSenderId: "422124047084",
  appId: "1:422124047084:web:cd3d5eddcfd910ef47b3c9"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);