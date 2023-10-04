import React, {useState} from 'react'
import { FaPaperclip } from 'react-icons/fa';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../util/firebase';
import { v4 as uuidv4 } from 'uuid';
import { doc, updateDoc, arrayUnion, Timestamp, serverTimestamp} from "firebase/firestore";
import { db } from '../util/firebase';
import { useChatContext } from '../util/ChatContext';
import { useAuthContext } from '../util/AuthContext';

export default function Chatinput() {

  const [img , setImg] = useState(null) 
  const [text , setText] = useState('') 
  const uniqueId = uuidv4()
  const {data} = useChatContext()
  const {user} = useAuthContext()


async function handleSend() {
  try{
   if(img) {
      const storageRef = ref(storage,uniqueId)
      const uploadTask = uploadBytesResumable(storageRef, img)

      uploadTask.on(
        (error) => {

        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          await updateDoc(doc(db,'chats',data.chatId), {
            messages : arrayUnion ({
              id:uniqueId,
              senderId:user.uid,
              date:Timestamp.now(),
              text,
              img:downloadURL
            })
          })
        }
      )
   } else {
    await updateDoc(doc(db,'chats',data.chatId), {
      messages : arrayUnion ({
        id:uniqueId,
        senderId:user.uid,
        date:Timestamp.now(),
        text
      })
    })
   }

   await updateDoc(doc(db, 'userchats', user.uid), {
    [data.chatId + '.lastMessage'] : {
      text
    },
    [data.chatId + '.date']:  serverTimestamp()
    
   })
   await updateDoc(doc(db, 'userchats', data.theUser.uid), {
    [data.chatId + '.lastMessage'] : {
      text
    },
    [data.chatId + '.date']:  serverTimestamp()
    
   })

   setImg(null)
   setText('')
  }catch(err) {
    console.log(err.message)
  }


}









  return (
    <div className='p-2 chat-input bg-[white] flex items-center  justify-between'>
    <input className='w-[80%] outline-none' type='text' placeholder='Type something...' value={text} onChange={(e) => setText(e.target.value)} />
    <div className='flex items-center gap-1'>
      <input type='file' id = 'file' className='hidden' onChange={(e) => setImg(e.target.files[0])} />
    <FaPaperclip className='text-gray-500 w-[25px] h-[25px] mr-[-5px] mt-[3px]'   />
    <label htmlFor='file'>
    <img  src='images/gallery.png' className='w-[35px] h-[25px]' alt='gallery' />
    </label> 
    <button  onClick={ ()=> handleSend()} className='p-1 bg-blue-500 text-white rounded-[5px]'>Send</button>
    </div>
   </div>
  )
}
