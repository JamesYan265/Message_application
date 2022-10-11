import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey:"AIzaSyDLYAlMk8d4CPwlL9heZreAb_9FhSGNoPU",
    authDomain: "message-box-151b0.firebaseapp.com",
    projectId: "message-box-151b0",
    storageBucket: "message-box-151b0.appspot.com",
    messagingSenderId: "229284509119",
    appId: "1:229284509119:web:033bd3fa4d1560a7f9dd0a"
  };
  
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;