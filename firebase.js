import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2CAJpG85vkb85h5k0EOEJhgyv9lKR32I",
  authDomain: "fir-revision-dc9a5.firebaseapp.com",
  projectId: "fir-revision-dc9a5",
  storageBucket: "fir-revision-dc9a5.appspot.com",
  messagingSenderId: "179373106407",
  appId: "1:179373106407:web:e0f815b315f873f42cae42",
};

// Initialize Services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
