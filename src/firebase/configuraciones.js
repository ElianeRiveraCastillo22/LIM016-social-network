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
    updateProfile,
	updatePassword
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
	where,
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
	updatePassword,
	//firestore
	db,
	doc,
	updateDoc,
	setDoc,
	getDoc,
	collection,
	addDoc,
	query,
	where,
	onSnapshot,
	arrayUnion,
	orderBy,
	increment,
	arrayRemove,
	getDocs,
	deleteDoc,
	updateProfile
}
