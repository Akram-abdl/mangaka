// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  firebaseConfig: {
    apiKey: "AIzaSyAuwrAggKVb8dO7tiSN6hNZ40saYsKLjFE",
    authDomain: "mangakafb.firebaseapp.com",
    projectId: "mangakafb",
    storageBucket: "mangakafb.appspot.com",
    messagingSenderId: "736146979950",
    appId: "1:736146979950:web:f665e7305e26bc9ee13a7f",
    measurementId: "G-MGMPXD6STV",
  },
};

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export default config;

export async function getMoney(email: string) {
  const querySnapshot = await getDocs(collection(db, "balance"));
  const result: number[] = [];
  querySnapshot.forEach((doc) => {
    if (doc.get("user_id") === email) {
      result.push(doc.get("amount"));
    }
  });
  console.log(result);
  return result[0];
}

export async function addMoney(amountToAdd: number, email: string) {
  const querySnapshot = await getDocs(collection(db, "balance"));
  var id = "";
  querySnapshot.forEach((document) => {
    if (document.get("user_id") === email) {
      id = document.ref.id;
      const docRef = doc(db, "balance", id);
      updateDoc(docRef, {
        amount: amountToAdd,
      });
    }
  });
}
