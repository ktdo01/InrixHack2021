// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDu5qZRymeeT9gFBW8HYD55Jv0YSjYkiP8",
  authDomain: "inrix-hackathon.firebaseapp.com",
  projectId: "inrix-hackathon",
  storageBucket: "inrix-hackathon.appspot.com",
  messagingSenderId: "856859029254",
  appId: "1:856859029254:web:3615b074e2ada41ffa3887",
  measurementId: "G-MSH428WG86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
var config = {};


config.appId = "<your-app-id-here>";
config.hashToken = "<your-hash-token-here>";
config.authTokenUrl = "https://api.iq.inrix.com/auth/v1/appToken";
module.exports = config;