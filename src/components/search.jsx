import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
//import { async } from '@firebase/util';
import { AuthContext } from '../contex/Auth';
const Search = () => {
  const [username,setusername]=useState("");
  const [user,setuser]=useState(null);
  const [err,seterr]=useState(false);
  const { currentuser } = useContext(AuthContext);
  const handleSearch = async () => {
      //setusername("");
      setuser(null);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setuser(doc.data());
      });
    } catch (err) {
      seterr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const HandleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentuser.uid > user.uid
        ? currentuser.uid + user.uid
        : user.uid + currentuser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentuser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentuser.uid,
            displayName: currentuser.displayName,
            photoURL: currentuser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      seterr(true);
    }

    setuser(null);
    setusername("");
  };
  
  return (
      <div className='search'>
        <div className="input">
          <input  type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setusername(e.target.value)}
          value={username}
          />
         <i className='material-icons' onClick={handleSearch}>search</i>

        </div>
        {err && <span>user not found </span>}
        {user && (
          <div className="info user" onClick={HandleSelect}>
          <img src={user.photoURL} alt="" />
          <span className="title">{user.displayName}</span>
        </div>
        )}
      </div>
  );
};

export default Search;
