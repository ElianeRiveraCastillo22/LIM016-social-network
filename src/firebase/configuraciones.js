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
  addDoc,
  query,
  onSnapshot,
  arrayUnion,
  orderBy,
  increment,
  arrayRemove,
  getDocs,
  deleteDoc
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
  addDoc,
  query,
  onSnapshot,
  arrayUnion,
  orderBy,
  increment,
  arrayRemove,
  getDocs,
  deleteDoc
}
/* `<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill="white" d="M4.95242 5.55686L6.51094 2.25231C6.71098 1.82809 7.28902 1.82809 7.48906 2.25231L9.04756 5.55686L12.5329 6.09004C12.9801 6.15845 13.1583 6.73377 12.8346 7.06377L10.313 9.63423L10.9081 13.2656C10.9845 13.7319 10.5168 14.0875 10.1167 13.8673L7 12.1518L3.88328 13.8673C3.48316 14.0875 3.01545 13.7319 3.09187 13.2656L3.68695 9.63423L1.16545 7.06377C0.841703 6.73377 1.01993 6.15845 1.46711 6.09004L4.95242 5.55686Z" stroke="#F6AF00" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill="white" d="M4.95242 5.55686L6.51094 2.25231C6.71098 1.82809 7.28902 1.82809 7.48906 2.25231L9.04756 5.55686L12.5329 6.09004C12.9801 6.15845 13.1583 6.73377 12.8346 7.06377L10.313 9.63423L10.9081 13.2656C10.9845 13.7319 10.5168 14.0875 10.1167 13.8673L7 12.1518L3.88328 13.8673C3.48316 14.0875 3.01545 13.7319 3.09187 13.2656L3.68695 9.63423L1.16545 7.06377C0.841703 6.73377 1.01993 6.15845 1.46711 6.09004L4.95242 5.55686Z" stroke="#F6AF00" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill="white" d="M4.95242 5.55686L6.51094 2.25231C6.71098 1.82809 7.28902 1.82809 7.48906 2.25231L9.04756 5.55686L12.5329 6.09004C12.9801 6.15845 13.1583 6.73377 12.8346 7.06377L10.313 9.63423L10.9081 13.2656C10.9845 13.7319 10.5168 14.0875 10.1167 13.8673L7 12.1518L3.88328 13.8673C3.48316 14.0875 3.01545 13.7319 3.09187 13.2656L3.68695 9.63423L1.16545 7.06377C0.841703 6.73377 1.01993 6.15845 1.46711 6.09004L4.95242 5.55686Z" stroke="#F6AF00" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill="white" d="M4.95242 5.55686L6.51094 2.25231C6.71098 1.82809 7.28902 1.82809 7.48906 2.25231L9.04756 5.55686L12.5329 6.09004C12.9801 6.15845 13.1583 6.73377 12.8346 7.06377L10.313 9.63423L10.9081 13.2656C10.9845 13.7319 10.5168 14.0875 10.1167 13.8673L7 12.1518L3.88328 13.8673C3.48316 14.0875 3.01545 13.7319 3.09187 13.2656L3.68695 9.63423L1.16545 7.06377C0.841703 6.73377 1.01993 6.15845 1.46711 6.09004L4.95242 5.55686Z" stroke="#F6AF00" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill="white" d="M4.95242 5.55686L6.51094 2.25231C6.71098 1.82809 7.28902 1.82809 7.48906 2.25231L9.04756 5.55686L12.5329 6.09004C12.9801 6.15845 13.1583 6.73377 12.8346 7.06377L10.313 9.63423L10.9081 13.2656C10.9845 13.7319 10.5168 14.0875 10.1167 13.8673L7 12.1518L3.88328 13.8673C3.48316 14.0875 3.01545 13.7319 3.09187 13.2656L3.68695 9.63423L1.16545 7.06377C0.841703 6.73377 1.01993 6.15845 1.46711 6.09004L4.95242 5.55686Z" stroke="#F6AF00" stroke-opacity="0.74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
` */
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
