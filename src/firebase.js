// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-f1lXtTDDstOi22_l1-AjvGA3hlITivE",
  authDomain: "hcr-intranet.firebaseapp.com",
  projectId: "hcr-intranet",
  storageBucket: "hcr-intranet.appspot.com",
  messagingSenderId: "1088735893239",
  appId: "1088735893239:web:d8ac6bc50096a6eef8a5f2",
  measurementId: "G-P2D71N4JX1"

};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta a autenticação
export const auth = getAuth(app);
