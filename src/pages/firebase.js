// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyCxOkpSZyG5Tq5GyuqFG2CnhqfkWdssqsU",

  authDomain: "e-sport-5483a.firebaseapp.com",

  projectId: "e-sport-5483a",

  storageBucket: "e-sport-5483a.appspot.com",

  messagingSenderId: "730449756980",

  appId: "1:730449756980:web:cab7457f0bc891da04db61"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);