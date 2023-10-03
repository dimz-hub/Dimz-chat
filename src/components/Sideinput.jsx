import React, {useState} from 'react'
import { collection, query, where, getDoc, getDocs, setDoc, doc, updateDoc, serverTimestamp  } from "firebase/firestore";
import { db } from '../util/firebase';
import {useAuthContext} from '../util/AuthContext'


export default function Sideinput() {
  
  const [userName, setUserName] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [error,setError] = useState(false)
 const {user} = useAuthContext()



    async function handleSearch() {
      const usersRef = collection(db, 'users');
     const q = query(usersRef, where('displayName', '==', userName));
     const querySelector = await getDocs(q);
try{
 if(querySelector.empty) {
    setError(true)
    setCurrentUser(null)
 }else{
   querySelector.forEach((doc) => {
     setCurrentUser(doc.data());
     setError(false)
    
    });
  }
  
}catch(err) {
    setError(true)
  
}

}

    function handlePress(e) {
      if(e.key === 'Enter'){
      handleSearch()
      }
  }

  async function handleSelect() {
    
    const combinedId = user.uid > currentUser.uid 
    ? user.uid + currentUser.uid 
    : currentUser.uid + user.uid

    
    try{
       const res = await getDoc( doc(db, "chats", combinedId))
       if(!res.exists() ) {
        await setDoc(doc(collection(db,'chats'), combinedId), { messages: []})
        await updateDoc(doc(db, 'userchats', user.uid),{
          [combinedId + '.userInfo'] : {
          uid:currentUser.uid,
          displayName:currentUser.displayName,
          photoURL: currentUser.photoURL
          },
          [combinedId + '.date'] : serverTimestamp()
        })
        await updateDoc(doc(db, 'userchats', currentUser.uid),{
          [combinedId + '.userInfo'] : {
          uid:user.uid,
          displayName:user.displayName,
          photoURL: user.photoURL
          },
          [combinedId + '.date'] : serverTimestamp()
        })
       }
    }catch(err) {
      setError(true)
      console.log(err.message)
    }
setCurrentUser(null)
setUserName('')
  }



  return (
    <div>
      <input type='text' placeholder='Find a user' className='w-[100%] outline-none p-3 placeholder-gray-500 bg-transparent' onKeyDown={(e) => handlePress(e)} onChange={(e) => setUserName(e.target.value) } value={userName}/>
     {
           currentUser &&
       <div className='flex items-center gap-[10px] p-2' onClick={handleSelect}>
         <img src={currentUser?.photoURL} alt='user-image' className='w-[40px] h-[40px] object-conver rounded-[50%]'/>
      <p className='text-white font-[500]'>{currentUser?.displayName}</p>
    </div>
      }
    </div>
  )
}
