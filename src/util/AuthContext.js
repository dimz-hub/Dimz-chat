import React, {useContext, createContext, useState, useEffect} from 'react'
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';

const AuthContext = createContext()




 export const AuthContextProvider = ({children}) => {
    
    const [user, setUser] = useState(null)

useEffect(() => {
  const unsub =   onAuthStateChanged(auth, (user) => {
        setUser(user)
    })
    return () => {

        unsub()
        
    }
}, []);

    return (
         <AuthContext.Provider  value={{user}}>
           {children}
         </AuthContext.Provider>
    )
}


export const useAuthContext = () => useContext(AuthContext)