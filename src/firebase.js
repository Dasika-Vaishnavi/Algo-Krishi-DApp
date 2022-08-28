// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEuVdHVP668_gNXFzxeohbDX1si9wNfgg",
  authDomain: "vadaiyaai.firebaseapp.com",
  projectId: "vadaiyaai",
  storageBucket: "vadaiyaai.appspot.com",
  messagingSenderId: "878872310646",
  appId: "1:878872310646:web:a9203627b03456c5a7c057",
  measurementId: "G-10NV9HEZB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;