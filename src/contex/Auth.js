import { onAuthStateChanged } from 'firebase/auth';
import {createContext,useEffect,useState} from 'react';
import {auth} from "../firebase";
export const AuthContext=createContext();

export const Authcontextprovider = ({children}) => {
    const [currentuser,setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth,(user) =>{
        setCurrentUser(user);
    });
    return () => {
        unsub();
    }
  },[]);
  return(
  <AuthContext.Provider value={{currentuser}}>
    {children}
    </AuthContext.Provider>
  );
};