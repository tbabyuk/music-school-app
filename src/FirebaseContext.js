// firestore imports
// CDN firebase and firestore imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";


// createContext
import { createContext } from "react";


// firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDBaoqxXhQlcRHZ-jFDyIEASZ01O6ypd6Q",
    authDomain: "dcam-todos-react.firebaseapp.com",
    projectId: "dcam-todos-react",
    storageBucket: "dcam-todos-react.appspot.com",
    messagingSenderId: "408866416720",
    appId: "1:408866416720:web:fde75d87f820e28c8c8955"
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




