import React from 'react'
import Sidebar from './Sidebar'
import Mainchat from './Mainchat'
import { useAuthContext } from '../util/AuthContext'

export default function Chat() {

  const {user} = useAuthContext()
  
  return (
    <div  className = 'flex items-center justify-center  h-[100vh] '>
        <div className='chat bg-blue-500 opacity-76 w-[50%] h-[70vh]  border-[white] overflow-hidden border-[1px] rounded-[20px]'>
 
        <Sidebar  user = {user} /> 
        <Mainchat  />
        </div>
       

    </div>
  )
}
