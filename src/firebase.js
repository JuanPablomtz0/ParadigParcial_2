import firebase from 'firebase/app'
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAEmTpNIx7KGR3gjGnCD0clT1DbPSqiKMQ",
    authDomain: "parcial-2-1d66c.firebaseapp.com",
    projectId: "parcial-2-1d66c",
    storageBucket: "parcial-2-1d66c.appspot.com",
    messagingSenderId: "612360248097",
    appId: "1:612360248097:web:3f31f971660616ded9fc60"
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()