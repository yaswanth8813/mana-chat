import React, { useContext } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../contex/Auth';
const Navbar = () => {
  const {currentuser}= useContext(AuthContext);
  return (
    <div className='navbar'>
        <div className="user">
        <img src= {currentuser.photoURL} alt="" srcset="" />
        <p className="username">{currentuser.displayName}</p>
        </div>
        <button onClick={()=>signOut(auth)}>Log Out</button>
    </div>
  )
}

export default Navbar;
