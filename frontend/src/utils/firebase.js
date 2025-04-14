// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDnrMINVXvQNp-MwGy-bhNSu12P06UU8XM",
  authDomain: "warantl.firebaseapp.com",
  projectId: "warantl",
  storageBucket: "warantl.firebasestorage.app",
  messagingSenderId: "282542846929",
  appId: "1:282542846929:web:568597e0b0c20703eea6f0",
  measurementId: "G-PF9R22CD8Q"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const analytics = getAnalytics(app);