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

const firebaseConfigTesting = {
  apiKey: "AIzaSyD7LHlgYG4AF2V4ki3D3hQO-m5d-AkeEcI",
  authDomain: "testing-1e568.firebaseapp.com",
  projectId: "testing-1e568",
  storageBucket: "testing-1e568.appspot.com",
  messagingSenderId: "427064329349",
  appId: "1:427064329349:web:4a18862246da17d45c15ec",
};

if (process.env.NODE_ENV === "test") {
  firebase.initializeApp(firebaseConfigTesting);
} else {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
