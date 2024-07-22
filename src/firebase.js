import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDXxZiV0SuNy7oBCLdoMQCuuhLjtKcO-6k",
    authDomain: "goals-website-3aab9.firebaseapp.com",
    databaseURL: "https://goals-website-3aab9-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "goals-website-3aab9",
    storageBucket: "goals-website-3aab9.appspot.com",
    messagingSenderId: "1036069119466",
    appId: "1:1036069119466:web:1ffd1eca3b36cb8752fe93",
    measurementId: "G-JH3N327726"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

export { database };
