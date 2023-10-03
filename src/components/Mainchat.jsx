import React from 'react'
import Mainnav from './Mainnav'
import Chattingpage from './Chattingpage'
import Chatinput from './Chatinput'

export default function Mainchat() {
  return (
    <div className='main-chat'>
      <Mainnav />
      <Chattingpage />
      <Chatinput />
    </div>
  )
}
