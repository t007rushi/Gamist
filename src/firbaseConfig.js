// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZAmnM1i38_Pw23gOXIyRUDtFZ715NeY4",
  authDomain: "gamist-343a8.firebaseapp.com",
  projectId: "gamist-343a8",
  storageBucket: "gamist-343a8.appspot.com",
  messagingSenderId: "449423802393",
  appId: "1:449423802393:web:481ecd3deadb76a454aa88",
  measurementId: "G-DQ9SQH1YFK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);