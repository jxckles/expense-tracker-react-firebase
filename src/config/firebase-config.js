//authentication
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJSQenV0pwQP8Ev9IhB8W_gz8wh5zbl1c",
  authDomain: "expenses-tracker-743e4.firebaseapp.com",
  projectId: "expenses-tracker-743e4",
  storageBucket: "expenses-tracker-743e4.firebasestorage.app",
  messagingSenderId: "721400497988",
  appId: "1:721400497988:web:34a0edcb4e5dc526777911",
  measurementId: "G-8LRJG49L4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// google auth variables
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

