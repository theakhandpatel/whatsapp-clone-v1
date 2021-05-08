import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//GET Below Settings from Firebase > Project Overview > Settings > General > Your apps > Firebase SDK snippet > Config
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDcPqT5G2EsILKksKTRuvtaD8fU17SF_dY",
  authDomain: "whatsup-19876.firebaseapp.com",
  projectId: "whatsup-19876",
  storageBucket: "whatsup-19876.appspot.com",
  messagingSenderId: "158780517389",
  appId: "1:158780517389:web:0b1965d0daec068e513944",
})

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
