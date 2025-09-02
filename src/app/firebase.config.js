// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhiWpd6QPGpjz4j5kEgkNQSthc8ICikUU",
  authDomain: "doctor-apointing-sys.firebaseapp.com",
  projectId: "doctor-apointing-sys",
  storageBucket: "doctor-apointing-sys.firebasestorage.app",
  messagingSenderId: "197400154812",
  appId: "1:197400154812:web:5672bf50b01c9e68c1b6b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;