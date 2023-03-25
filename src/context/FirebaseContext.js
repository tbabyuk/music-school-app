import { db } from "../firebase/config";

// createContext
import { createContext } from "react";


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




