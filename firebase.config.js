// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRZC2ePD1ev4Jus3CBOlXq7WFyQREem_0",
  authDomain: "linkozi-2e9d1.firebaseapp.com",
  databaseURL: "https://linkozi-2e9d1-default-rtdb.firebaseio.com",
  projectId: "linkozi-2e9d1",
  storageBucket: "linkozi-2e9d1.appspot.com",
  messagingSenderId: "306537205723",
  appId: "1:306537205723:web:0ed927a80a3fd0c74c61fe",
  measurementId: "G-XFPTHCX45W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;