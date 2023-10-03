import React , {useState, useEffect}from 'react'
import {useAuthContext} from "../util/AuthContext"
import { doc, onSnapshot } from "firebase/firestore";
import {useChatContext } from '../util/ChatContext'
import { db } from '../util/firebase';
import { reducerCases } from '../util/Constant';

export default function Sideuser() {

  const [chat,setChat] =  useState([])
  const {user} = useAuthContext()
  const {dispatch}  = useChatContext()
  useEffect(() => {

    const getData = () =>{

      const unsub = onSnapshot(doc(db, "userchats", user.uid), (doc) => {
        setChat( doc.data());
        
      });
      
    return () => {
      unsub()
    }
    }

user.uid && getData()
    
  },[user.uid])

  function handleSelect(u) {
    dispatch({type:reducerCases.change_user, payload:u})
  }

  console.log(chat)
  return (
    <div className='pb-2'>
    {Object.entries(chat).sort((a,b) => b[1].date - a[1].date)?.map((chat) => {
      return (
     <div onClick= {() => handleSelect(chat[1]?.userInfo)} className=' flex items-center pl-2 gap-2 text-[white] hover:bg-[rgba(0,0,0,0.4)]' key={chat[0]}>
         <img src={chat[1]?.userInfo?.photoURL} className='user-img w-[40px] h-[40px] rounded-[50%]' /> 
         <div>
         <p className='font-semibold'>{chat[1]?.userInfo?.displayName}</p>
         <p className='font-thin'>{chat[1]?.lastMessage?.text}</p>
         </div>
      </div>
      )
    }
    )
    }
 </div>
  )
}
