import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyABQahsdN4Jib9gJPgduVJPFrKf3IkjVP0",
    authDomain: "challenge-808c2.firebaseapp.com",
    projectId: "challenge-808c2",
    storageBucket: "challenge-808c2.appspot.com",
    messagingSenderId: "597821846446",
    appId: "1:597821846446:web:e3eef0f9825a1bc1050e3f",
    measurementId: "G-S6SRK0XLVV"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();

export {db,auth};