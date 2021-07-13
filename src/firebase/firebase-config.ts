import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOqInvoyKV0G5mAelETRxOe3fjG70-uMU",
  authDomain: "journal-app-ef1ba.firebaseapp.com",
  projectId: "journal-app-ef1ba",
  storageBucket: "journal-app-ef1ba.appspot.com",
  messagingSenderId: "200199566988",
  appId: "1:200199566988:web:8b9e3a1c77cbeadb88ada9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
