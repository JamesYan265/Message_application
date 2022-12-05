import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBOAHe3CaUPprMYrulUjMcGNWABnFwceMQ",
    authDomain: "public-message-application.firebaseapp.com",
    projectId: "public-message-application",
    storageBucket: "public-message-application.appspot.com",
    messagingSenderId: "473837277732",
    appId: "1:473837277732:web:31b168e44f3531bf47beb1"
  };
  
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;