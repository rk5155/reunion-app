// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3hDCbTJQLWQQ__N6ev2dEATG_uytxaY4",
  authDomain: "reunion-app-3e01a.firebaseapp.com",
  projectId: "reunion-app-3e01a",
  storageBucket: "reunion-app-3e01a.firebasestorage.app",
  messagingSenderId: "567462110388",
  appId: "1:567462110388:web:649759ff7b3003baf623e1",
  measurementId: "G-17LVTRHY11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);