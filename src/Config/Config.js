import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyClx5uECR9PTIq3kcyAL6cZC2Z3C8OSrMQ",
    authDomain: "restaurants-app-2831a.firebaseapp.com",
    projectId: "restaurants-app-2831a",
    storageBucket: "restaurants-app-2831a.appspot.com",
    messagingSenderId: "222513564860",
    appId: "1:222513564860:web:8400c20f459984d13dd4b9",
    measurementId: "G-6HV1C3QJKN"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export {auth,db,storage}