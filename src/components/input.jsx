import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useContext } from 'react'
import { useState } from 'react';
import { AuthContext } from '../contex/Auth';
import { ChatContext } from '../contex/chatcontext';
import { db, storage } from '../firebase';
import {v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
const Input = () => {
  const {currentuser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const [text,setText]=useState("");
  const [img,setImg]=useState(null);
  const handlesend = async()=>{
    if(img){
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(

        (error) => {
          //seterr('error in uploading image');
        }, 
        () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          await updateDoc(doc(db,"chats",data.chatId),{
            messages:arrayUnion({
            id:uuid(),
            text,
            senderId:currentuser.uid,
            date:Timestamp.now(),
            img:downloadURL,
            }),
          });
        });
    });
    }else{
      await updateDoc(doc(db,"chats",data.chatId),{
        messages:arrayUnion({
        id:uuid(),
        text,
        senderId:currentuser.uid,
        date:Timestamp.now(),
        }),
      });
      }
      //const y= {text === "" ? text : "photo"}
      await updateDoc(doc(db,"userChats",currentuser.uid),{
        [data.chatId+ ".lastMessage" ]:{
             text
        },
        [data.chatId+".date"] :serverTimestamp(),
      });
      await updateDoc(doc(db,"userChats",data.user.uid),{
        [data.chatId+ ".lastMessage" ]:{
          text
        },
        [data.chatId+".date"] :serverTimestamp(),
      });
    setText("");
    setImg(null);
  };
  const handleKey = (e) => {
    e.code === "Enter" && handlesend();
  };
  return (
    <div className='input' onKeyDown={handleKey}>
      <input type="text" name="" id="" placeholder='Type a message...'onChange={(e)=>setText(e.target.value)} value ={text}/>
      <div className="send">
      <i class="material-icons" id='profile_img' >attach_file</i>
      <input style={{display:"none"}} type="file" name="" id="file" onChange={(e)=>setImg(e.target.files[0])}/>
            <label htmlFor="file">
                <i class="material-icons" id='profile_img' >add_a_photo</i>
            </label>
        <i class="material-icons" id='send'onClick={handlesend}>send</i>
      </div>
    </div>
  )
}

export default Input;
