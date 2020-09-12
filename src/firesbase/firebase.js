import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_0dC0QS1qrbZh6AwygvLT6E4pI1iiihE",
  authDomain: "chat-app-62d34.firebaseapp.com",
  databaseURL: "https://chat-app-62d34.firebaseio.com",
  projectId: "chat-app-62d34",
  storageBucket: "chat-app-62d34.appspot.com",
  messagingSenderId: "479306225342",
  appId: "1:479306225342:web:c1ef445a878ebdfb7130ef",
  measurementId: "G-0EQL7M816C",
};
const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore;

export default app;
