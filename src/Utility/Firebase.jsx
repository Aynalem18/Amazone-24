
import firebase from "firebase/compat/app";
// authentication
import{getAuth} from 'firebase/auth';
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADT1iekmmSy3m1sNncIPMJNmh_Sp05aUw",
  authDomain: "clone-4a33b.firebaseapp.com",
  projectId: "clone-4a33b",
  storageBucket: "clone-4a33b.firebasestorage.app",
  messagingSenderId: "664696112423",
  appId: "1:664696112423:web:2c0495a031789a641b9502"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const  auth = getAuth(app);
export const db = app.firestore();