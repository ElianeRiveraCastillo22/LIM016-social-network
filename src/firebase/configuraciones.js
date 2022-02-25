import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
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
import {getFirestore, collection, getDocs, getDoc, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc, where} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';


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
};
