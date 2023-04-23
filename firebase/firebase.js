// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBN6rTRj-V7-nOMGOp97ZurlWJbsxp5FMk",
    authDomain: "healthmonitorapp-78c16.firebaseapp.com",
    databaseURL: "https://healthmonitorapp-78c16-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "healthmonitorapp-78c16",
    storageBucket: "healthmonitorapp-78c16.appspot.com",
    messagingSenderId: "733757429666",
    appId: "1:733757429666:web:266403c3441358eaffc4fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const real = getDatabase(app)