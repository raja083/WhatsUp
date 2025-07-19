import React from 'react'
import Sidebar from './Sidebar'
import MessageBox from './MessageBox'

import Navbar from '@/components/Navbar'
import EmptyChatScreen from './EmptyChatScreen'
const ChatPage = () => {
  const selectedUser = null;
  return (
    <div className='h-full overflow-hidden'>
    <Navbar/>
    <div className='flex  mt-16 h-[calc(100vh-4rem)]'>
      <Sidebar/>
      {
        selectedUser?<MessageBox/>:<EmptyChatScreen/>
      }
    </div>
    </div>
  )
}

export default ChatPage
