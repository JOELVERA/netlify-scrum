import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyWDRtZSNIAkpPU3wjQBR5Q_gXgMw17Qk",
    authDomain: "desplieguenetlify.firebaseapp.com",
    projectId: "desplieguenetlify",
    storageBucket: "desplieguenetlify.appspot.com",
    messagingSenderId: "852811336187",
    appId: "1:852811336187:web:cb20e2b88937d3988de35e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}