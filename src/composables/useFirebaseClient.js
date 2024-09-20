import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCaTLWABm9c_hfJE8khv9cCHdK8Y_K9kK8",
  authDomain: "list-todo-b4c71.firebaseapp.com",
  projectId: "list-todo-b4c71",
  storageBucket: "list-todo-b4c71.appspot.com",
  messagingSenderId: "301560874592",
  appId: "1:301560874592:web:0bc611022953a1d31fe505"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// collection todos
const collectionName = 'todos';
const todosRef = collection(db, collectionName);

export default function useFirebaseClient() {
  return { db, todosRef, collectionName }
}