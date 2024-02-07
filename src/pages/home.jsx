import React from 'react'
import Sidebar from '../components/sidebar';
import Chatbar from '../components/chatbar';
const home = () => {
  return (
    <div className='homepage'>
      <div className='container'>
      <Sidebar></Sidebar>
      <Chatbar></Chatbar>
      </div>
    </div>
  )
}

export default home;



