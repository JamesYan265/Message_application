import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBOAHe3CaUPprMYrulUjMcGNWABnFwceMQ",
    authDomain: "public-message-application.firebaseapp.com",
    projectId: "public-message-application",
    storageBucket: "public-message-application.appspot.com",
    messagingSenderId: "473837277732",
    appId: "1:473837277732:web:31b168e44f3531bf47beb1"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;