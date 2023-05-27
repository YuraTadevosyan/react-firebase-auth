import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD17lIMmN8jJu3yFnST2SwTkJrTvrfkw24",
    authDomain: "react-firebase-auth-810bb.firebaseapp.com",
    projectId: "react-firebase-auth-810bb",
    storageBucket: "react-firebase-auth-810bb.appspot.com",
    messagingSenderId: "466773520729",
    appId: "1:466773520729:web:70fa59529e7769b64d1c48"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);