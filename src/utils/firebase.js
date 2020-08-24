import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyAnnfMS0ptw6ue2EGvc9RSjJ2xbzl6mscI",
    authDomain: "journey-94ae8.firebaseapp.com",
    databaseURL: "https://journey-94ae8.firebaseio.com",
    projectId: "journey-94ae8",
    storageBucket: "journey-94ae8.appspot.com",
    messagingSenderId: "303699006581",
    appId: "1:303699006581:web:ecbf06983998fec30ed43c",
    measurementId: "G-G9325R4F5K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();