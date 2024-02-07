import { doc, onSnapshot } from 'firebase/firestore';
import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../contex/Auth';
import { ChatContext } from '../contex/chatcontext';
import { db } from '../firebase';

const Chatlist = () => {
  const [chats,setchats] = useState([]);
  const {currentuser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);
   useEffect(() => {
    const getchats = () => {
      const unsub = onSnapshot(doc(db,"userChats", currentuser.uid), (doc) => {
        setchats(doc.data());
       // console.log(currentuser);
      });
    return () =>{
        unsub();
    };
  };
    currentuser.uid && getchats();
   }, [currentuser.uid]);

   console.log(chats);
   const handleselect = (u) =>{
     dispatch({type:"CHANGE_USER",payload:u})
   }
  return (
    <div className='chatlist'>
{Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
      // console.log(chat);
    < div className="user" key={chat[0]} onClick = {()=>handleselect(chat[1].userInfo)}>
    <img src= {chat[1].userInfo.photoURL}alt=''/>
      <div className="userinfo">
      <span className="title">{chat[1].userInfo.displayName}</span>
      <p>{chat[1].lastMessage?.text}</p>
    </div>
      </div>
))}
     
    </div>
    );
};

export default Chatlist;
