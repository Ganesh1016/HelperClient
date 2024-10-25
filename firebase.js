// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2FL0NZJaUdYsDenC0UzV2pgGSFqEUwZo",
  authDomain: "helperrr-shazam.firebaseapp.com",
  projectId: "helperrr-shazam",
  storageBucket: "helperrr-shazam.appspot.com",
  messagingSenderId: "435119272777",
  appId: "1:435119272777:web:6188f844f5519204d46098",
  measurementId: "G-B1Z7RSG7W2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp); // Initialize auth instance

export { auth, analytics };
