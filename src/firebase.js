import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCxLfLC3JqDX-ThtwC4HWnK1fQ___uu4u0",
    authDomain: "banggiavang-a2f47.firebaseapp.com",
    projectId: "banggiavang-a2f47",
    storageBucket: "banggiavang-a2f47.firebasestorage.app",
    messagingSenderId: "551536845584",
    appId: "1:551536845584:web:f67a6fe8bc213a83453b95",
    measurementId: "G-J438FXX067"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
