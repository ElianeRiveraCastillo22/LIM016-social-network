/* import firebase from "firebase/compat/app"; */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  setPersistence,
  browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  collection,
  addDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyByPJrQx9oWGrr7qi5C_pucJItSbOOe54A",
  authDomain: "queer-place-b571e.firebaseapp.com",
  projectId: "queer-place-b571e",
  storageBucket: "queer-place-b571e.appspot.com",
  messagingSenderId: "343097311813",
  appId: "1:343097311813:web:08d083e367fa8013a3192c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
const auth = getAuth(app);
const dataUser = auth.currentUser;
const provider = new GoogleAuthProvider();

//firestore
const db = getFirestore(app);

export{
  //auth
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  dataUser,
  GoogleAuthProvider,
  signInWithPopup,
  provider,
  signOut,
  setPersistence,
  browserSessionPersistence,
  //firestore
  db,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  collection,
  addDoc
}

/* import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  where} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';


const firebaseConfig = {
  apiKey: 'AIzaSyCYMriyYLnj7mjwQ990OLhGaxulpUI6ONE',
  authDomain: 'queerplace-lim16.firebaseapp.com',
  projectId: 'queerplace-lim16',
  storageBucket: 'queerplace-lim16.appspot.com',
  messagingSenderId: '1092619679372',
  appId: '1:1092619679372:web:0b0ca2cc48f7cbf0256da9',
  measurementId: 'G-KEF6M5WVLL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
// Init Services FireStore
const db = getFirestore(app);
// inizializacion de store

export {
  // Authentication
  app,
  auth,
  provider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  sendEmailVerification,
  updateProfile,
  // Firestore
  db,
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
}; */
