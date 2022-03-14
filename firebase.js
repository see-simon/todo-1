// import firebase from 'firebase/app'
// import firebase from "firebase"
import  firebase from 'firebase'
import "firebase/auth"
import "firebase/database"
import 'firebase/firestore'


const app = firebase.initializeApp({
    apiKey: "AIzaSyBUPSgw5FVcqegYiVJEyvZnUBbPD5o5L9c",
    authDomain: "codetripe1.firebaseapp.com",
    databaseURL: "https://codetripe1-default-rtdb.firebaseio.com",
    projectId: "codetripe1",
    storageBucket: "codetripe1.appspot.com",
    messagingSenderId: "930880363923",
    appId: "1:930880363923:web:165cda42e547d58bae5c66",
    measurementId: "G-6RN73BPSX4"

  
})

export const auth = app.auth()
export const bf = app.firestore()
export const db = app.database()
export default app