import React from 'react'
import Messages from './messages';
import Input from './input';
import { ChatContext } from '../contex/chatcontext';
import { useContext } from 'react';
const Chatbar = () => {
  const {data}=useContext(ChatContext);
  return (
    <div className='chatbar'>
      <div className="chatinfo">
        <div className="chattitle">
        <img src={data.user.photoURL} alt="" srcset="" />
        <span className="title">{data.user?.displayName}</span>
        </div>
        <div className="chaticons">
          <i className='material-icons'>videocam</i>
          <i className='material-icons'>phone_in_talk</i>
          <i className='material-icons'>more_vert</i>
        </div>
      </div>
      <Messages></Messages>
      <Input></Input>
    </div>
  )
}

export default Chatbar;
