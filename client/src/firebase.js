import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPueYuXufJKALHnrSVI-oi43MTpaZGTLc",
  authDomain: "phone-auth21c.firebaseapp.com",
  projectId: "phone-auth21c",
  storageBucket: "phone-auth21c.appspot.com",
  messagingSenderId: "101333056185",
  appId: "1:101333056185:web:8641527607897a634ab968",
  measurementId: "G-L6QPBHXLFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
