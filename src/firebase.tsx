import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

// eslint-disable-next-line no-console
console.log(process.env["REACT_APP_FIREBASE_API_KEY"]);

const firebaseConfig = {
  /* apiKey: process.env["REACT_APP_FIREBASE_API_KEY"],
  authDomain: process.env["REACT_APP_FIREBASE_AUTH_DOMAIN"],
  projectId: process.env["REACT_APP_FIREBASE_PROJECT_ID"],
  storageBucket: process.env["REACT_APP_FIREBASE_STORAGE_BUCKET"],
  messagingSenderId: process.env["REACT_APP_FIREBASE_MESSAGING_SENDER_ID"],
  measurementId: process.env["REACT_APP_FIREBASE_MEASUREMENT_ID"],
  appId: process.env["REACT_APP_FIREBASE_APP_ID"], */
  apiKey: "AIzaSyB3Vp5Rh8hAUbf1QOXWl3LpVLD3WOJ-sXY",
  authDomain: "app-form-63d47.firebaseapp.com",
  projectId: "app-form-63d47",
  storageBucket: "app-form-63d47.appspot.com",
  messagingSenderId: "879043170968",
  appId: "1:879043170968:web:f5f21e9a805e9073a736ed",
  measurementId: "G-1XX064NSZ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {analytics, db};