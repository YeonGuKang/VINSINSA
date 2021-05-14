import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAQ-V_4jVKLXPlEnerxGcXlg453BWzga1Y",
    authDomain: "vintage-web-921d4.firebaseapp.com",
    projectId: "vintage-web-921d4",
    storageBucket: "vintage-web-921d4.appspot.com",
    messagingSenderId: "80332495712",
    appId: "1:80332495712:web:e2a4b2cb5d67c51e9f5c05",
    measurementId: "G-JS05K5BN90"
};

export default firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
 