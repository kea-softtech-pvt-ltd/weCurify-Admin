import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// let firebaseApp 
const firebaseConfig = {
    apiKey: "AIzaSyCS2lBCypJWuztMyaDqn7npCIZZxI8a6JI",
    authDomain: "keacure-316111.firebaseapp.com",
    projectId: "keacure-316111",
    storageBucket: "keacure-316111.appspot.com",
    messagingSenderId: "976025917950",
    appId: "1:976025917950:web:314a49c3e00c69472f48af",
    measurementId: "G-12D5QXWFGF"
}
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }