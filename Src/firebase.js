
//import firebase from "firebase";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


  const firebaseConfig = {
    apiKey: "AIzaSyBguoNMsTg1QL52Xo4gNTfm6vpXfu_hap4",
    authDomain: "linkedin-clone-a9055.firebaseapp.com",
    projectId: "linkedin-clone-a9055",
    storageBucket: "linkedin-clone-a9055.appspot.com",
    messagingSenderId: "309209797305",
    appId: "1:309209797305:web:a4edd3ba75303127850168"
  };
 // Initialize Firebase
  //const app = initializeApp(firebaseConfig);
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export {auth, provider, storage};
  export default db;