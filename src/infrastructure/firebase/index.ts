import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCV6fShNf20o89oju9CvuGPLgIQIAVHuYs",
  authDomain: "smw-tools.firebaseapp.com",
  projectId: "smw-tools",
  storageBucket: "smw-tools.appspot.com",
  messagingSenderId: "52764647301",
  appId: "1:52764647301:web:5d8cd87a9a12fd72fbeeec"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();

export {
    app,
    auth,
    provider,
    db,
};
