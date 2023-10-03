import React, {useState, useEffect} from 'react'
import Message from './Message'
import {useChatContext} from '../util/ChatContext'
import { doc, onSnapshot } from "firebase/firestore";
import {db} from '../util/firebase'

export default function Messages() {

const [messages, setMessages] = useState([])
const {data} = useChatContext()

useEffect(() => {

  function getMessages() {
    const unsub =  onSnapshot(doc(db, 'chats' , data.chatId), (doc) => {
      if (doc.exists()) {
       setMessages(doc.data().messages)
     }
     })
     return () => {
       unsub()
     }
  }

  data.chatId && getMessages()
},[data.chatId])

  return (
    <div>
  {messages && messages.map(m => {
        
        return (

          <Message message = {m} key={m.id} />
        )
       
  
        
      })}

    </div>
  )
}
