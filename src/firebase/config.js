// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH_fMeDkvAex_MIA9Ytneik2I3nxpUtDA",
  authDomain: "jasiwood-store.firebaseapp.com",
  projectId: "jasiwood-store",
  storageBucket: "jasiwood-store.firebasestorage.app",
  messagingSenderId: "41799061686",
  appId: "1:41799061686:web:d503690033d605c43cd617"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);