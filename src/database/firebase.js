import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQ-XTG4gkYLmHpLEG2XqkpsJ-DLE5oNQ8",
    authDomain: "kontak-5e83a.firebaseapp.com",
    projectId: "kontak-5e83a",
    storageBucket: "kontak-5e83a.firebasestorage.app",
    messagingSenderId: "63987543644",
    appId: "1:63987543644:web:ea1b6d2a6752ae8cf90099"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const Db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export default Db;
