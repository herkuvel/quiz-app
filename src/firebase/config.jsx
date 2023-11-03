import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqiivoZ1RWIDsB1GR8o2oqcfdUIxKnuRg",
  authDomain: "quiz-app-54d6f.firebaseapp.com",
  projectId: "quiz-app-54d6f",
  storageBucket: "quiz-app-54d6f.appspot.com",
  messagingSenderId: "555092272183",
  appId: "1:555092272183:web:4caab935865de514604bb2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
