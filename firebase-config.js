// Firebase Configuration
// Replace these values with your Firebase project credentials
// Get them from: https://console.firebase.google.com/project/YOUR_PROJECT/settings/general

const firebaseConfig = {
    apiKey: "AIzaSyB0B4U-6qcP-KLVoOHOZMSJdMOoJME-XXU",
    authDomain: "gen-lang-client-0969537603.firebaseapp.com",
    projectId: "gen-lang-client-0969537603",
    storageBucket: "gen-lang-client-0969537603.firebasestorage.app",
    messagingSenderId: "935485296208",
    appId: "1:935485296208:web:38505e038040b8b83b4b55",
    measurementId: "G-K0BPW1KFYQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = firebase.auth();

// Initialize Firestore
const db = firebase.firestore();

// Export for use in other files
window.firebaseAuth = auth;
window.firebaseDb = db;
