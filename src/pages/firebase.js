// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAPLifTFL33dvsdAcLhZWSqtvbR72qHop8",
  authDomain: "auth-7ec71.firebaseapp.com",
  databaseURL: "https://auth-7ec71-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "auth-7ec71",
  storageBucket: "auth-7ec71.appspot.com",
  messagingSenderId: "999701155447",
  appId: "1:999701155447:web:51ea5cbadff74c0acf8072"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const user = auth.currentUser;
const googleAuth = new GoogleAuthProvider();

export { app, auth, db, googleAuth };

