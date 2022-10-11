import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey:"AIzaSyDLYAlMk8d4CPwlL9heZreAb_9FhSGNoPU",
    authDomain: "message-box-151b0.firebaseapp.com",
    projectId: "message-box-151b0",
    storageBucket: "message-box-151b0.appspot.com",
    messagingSenderId: "229284509119",
    appId: "1:229284509119:web:033bd3fa4d1560a7f9dd0a"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;