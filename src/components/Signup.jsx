import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {  createUserWithEmailAndPassword , updateProfile} from "firebase/auth";
import { auth } from '../util/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../util/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../util/firebase';
import { useNavigate } from 'react-router-dom';

export default function Signup() {


 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 const [displayName, setDisplayName] = useState("")
 const [file, setFile] = useState(null)
 const [error, setError] = useState(false)
 const [loading,setLoading] = useState(false)
  
 const navigate = useNavigate()


async function handleSubmit(e) {
    e.preventDefault()
    try{

      const res  = await createUserWithEmailAndPassword(auth, email, password)
      
      const storageRef = ref(storage, displayName);
      
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
      
      (error) => {
        setError(true)
      }, 
      
    async  () => {
      try{

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        console.log(downloadURL)
        
          await updateProfile(res.user, {
            displayName,
            photoURL:downloadURL
          });
          
         
          await setDoc(doc(db, "users", res.user.uid), {
            uid : res.user.uid,
            displayName,
            email,
           photoURL: downloadURL
          });
          await setDoc(doc(db, "userchats", res.user.uid), {});
        }catch(err) {
          setError(true)
          console.log(err.message)
        }
          
        }
        );
        setLoading(true)
        navigate('/chat')
 

}catch(err) {
  setError(true)
  console.log(err.message)
}
}


return (
        <div className=' h-[100vh] flex items-center justify-center'>
    
        <div className='signup flex flex-col items-center rounded-[20px] h-[70vh] w-[50%] gap-[px] xs:w-[100%] xs:h-[100%] xs:rounded-none  xs:pt-[75px] '>
          
           <h1 className='mb-[10px] font-bold text-2xl'>
            DIMZ CHAT
           </h1>
    
           <h2 className='font-[500] text-xl xs:mb-[40px]'>SignUp</h2>
           <form  onSubmit={handleSubmit}  className='flex flex-col items-center justify-center gap-[30px] mt-[10px] '>
            <span className = ' xs:mb-[20px]' >
            <input type='text' id='name' className='rounded-[20px] text-[black]' placeholder='display name' onChange={(e) => setDisplayName(e.target.value)}  required/>
            </span>
            <span className = ' xs:mb-[20px]'>
            <input type='email' id='email' className='rounded-[20px] text-[black]' placeholder='email' onChange={(e) => setEmail(e.target.value)} required />
            </span>
          <span className = ' xs:mb-[20px]'>
            <input type='password'id='password' className='rounded-[20px] text-[black]' placeholder='password' onChange={(e) => setPassword(e.target.value)} required />
          </span>
            <input type='file' className='hidden ' id='file' onChange={(e) => setFile(e.target.files[0])} required/>
    
           <label htmlFor= 'file' className='flex mt-[-15px] xs:mb-[20px] items-center xs:gap-[40px]'>
          <img src='images/gallery.png' className='w-[40px]' />
          <p>
            Add a avatar 
          </p>
           </label>
    
           <button className='w-[300px] bg-[black] pt-[10px] pb-[10px] mt-[-10px] rounded-[20px] xs:mb-[60px]'>SignUp</button>
          
           </form>
    <p>You have an Account &#x1F914;, <Link to='/signin' className='font-bold underline'> Login</Link></p> 
            {error && <span>Something went wrong</span>}
            {loading && <span>Loadind..., Patience is Key </span>}
           </div>
        </div>
      )
}
