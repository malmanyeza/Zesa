// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, getDoc, query, orderBy, where, updateDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_LGrOQD3AOxEmYU2tMbP0n-Fxb3txQ5E",
  authDomain: "zesa2-e8f31.firebaseapp.com",
  projectId: "zesa2-e8f31",
  storageBucket: "zesa2-e8f31.appspot.com",
  messagingSenderId: "572550940757",
  appId: "1:572550940757:web:4a2d6384ed469653e5acdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db, getFirestore, collection, addDoc, doc, setDoc, getDocs, getDoc, query, orderBy, where, updateDoc } 