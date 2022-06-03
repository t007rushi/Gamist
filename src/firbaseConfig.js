import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZAmnM1i38_Pw23gOXIyRUDtFZ715NeY4",
  authDomain: "gamist-343a8.firebaseapp.com",
  projectId: "gamist-343a8",
  storageBucket: "gamist-343a8.appspot.com",
  messagingSenderId: "449423802393",
  appId: "1:449423802393:web:481ecd3deadb76a454aa88",
  measurementId: "G-DQ9SQH1YFK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
