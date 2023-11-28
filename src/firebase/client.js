import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDTQ3WOHOEVX4IdoJP_GB9RtCqfNhIM3fk",
    authDomain: "entreparentesis-c29ca.firebaseapp.com",
    projectId: "entreparentesis-c29ca",
    storageBucket: "entreparentesis-c29ca.appspot.com",
    messagingSenderId: "446717538911",
    appId: "1:446717538911:web:b40951f1f56d57830621ea"
  };
  

  const app = initializeApp(firebaseConfig);
  export const db=getFirestore(app)