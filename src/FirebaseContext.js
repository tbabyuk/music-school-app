// firestore imports
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// createContext
import { createContext } from "react";


// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA-pcq2kIT7BvgJjMTJ_2hkWvNkJsTgAsE",
  authDomain: "music-school-app-8394b.firebaseapp.com",
  projectId: "music-school-app-8394b",
  storageBucket: "music-school-app-8394b.appspot.com",
  messagingSenderId: "1078654343061",
  appId: "1:1078654343061:web:363dd17b2f8762c4e9089c"
};


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);


// setting up context
export const DataContext = createContext();


function FirebaseContextProvider({children}) {

  return (
    <DataContext.Provider value={{db}}>
        {children}
    </DataContext.Provider>
  )
}

export default FirebaseContextProvider




