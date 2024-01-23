// Import the functions you need from the SDKs you need
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXbKR5w4xKir7f9jGnWtuznbhm3luNPRM",
  authDomain: "lyingflat-f8463.firebaseapp.com",
  projectId: "lyingflat-f8463",
  storageBucket: "lyingflat-f8463.appspot.com",
  messagingSenderId: "306312420421",
  appId: "1:306312420421:web:166bd66640d8752e3cd72c",
  measurementId: "G-6XXTQ0Z4MF"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();