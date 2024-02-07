import React, { useContext} from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { AuthContext } from '../contex/Auth';
import { ChatContext } from '../contex/chatcontext';

const Mesage = ( {message}) => {
  const {currentuser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

   const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div ref={ref} className={`message ${message.senderId === currentuser.uid && "owner"}`}>
      <div className="messagecontent">
        {message.text && <p>{message.text}</p> }

       {message.img && <img src= {message.img} className="image" alt="He" srcset="" /> }
        
      </div>
    </div>
  )
}

export default Mesage;
