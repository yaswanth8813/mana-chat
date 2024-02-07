import React from 'react';
import Navbar from './navbar';
import Search from './search';
//import Chat from './chat';
import Chatlist from './chatlist';
const sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar></Navbar>
      <Search></Search>
      <Chatlist></Chatlist>
    </div>
  )
}

export default sidebar;
