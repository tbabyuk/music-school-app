import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"



// firebase config
const firebaseConfig = {
    apiKey: "AIzaSyA-pcq2kIT7BvgJjMTJ_2hkWvNkJsTgAsE",
    authDomain: "music-school-app-8394b.firebaseapp.com",
    projectId: "music-school-app-8394b",
    storageBucket: "music-school-app-8394b.appspot.com",
    messagingSenderId: "1078654343061",
    appId: "1:1078654343061:web:363dd17b2f8762c4e9089c"
};


const app = initializeApp(firebaseConfig)


// init firestore
export const db = getFirestore(app)


