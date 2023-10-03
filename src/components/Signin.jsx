import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {  signInWithEmailAndPassword} from "firebase/auth";
import { auth } from '../util/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

export default function Signin() {


 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")

 const [error, setError] = useState(false)
  
 const navigate = useNavigate()


async function handleSubmit(e) {
    e.preventDefault()
try{

    signInWithEmailAndPassword(auth, email, password)
    navigate('/chat')
}catch(e){
    setError(true)
}
   
       

}


return (
        <div className=' h-[100vh] flex items-center justify-center'>
    
        <div className='signup flex flex-col items-center rounded-[20px] h-[70vh] w-[50%] gap-[px] xs:w-[100%] xs:h-[100%] xs:rounded-none  xs:pt-[75px] '>
          
           <h1 className='mb-[10px] font-bold text-2xl'>
            DIMZ CHAT
           </h1>
    
           <h2 className='font-[500] text-xl xs:mb-[40px] mb-[40px]'>SignIn</h2>
           <form  onSubmit={handleSubmit}  className='flex flex-col items-center justify-center gap-[30px] mt-[10px] '>
         
            <span className = ' xs:mb-[20px]'>
            <input type='email' id='email' className='rounded-[20px] text-[black]' placeholder='email' onChange={(e) => setEmail(e.target.value)} required />
            </span>
          <span className = ' xs:mb-[20px]'>
            <input type='password'id='password' className='rounded-[20px] text-[black]' placeholder='password' onChange={(e) => setPassword(e.target.value)} required />
          </span>
       
    
           <button className='w-[300px] bg-[black] pt-[10px] pb-[10px] mt-[-10px] rounded-[20px] xs:mb-[60px] mb-[20px]'>SignUp</button>
          
           </form>
    <p>You don't have an Account ?&#x1F632; , change that <Link to='/signup' className='font-bold underline'> Now</Link></p> 
            {error && <span>Something went wrong</span>}
           </div>
        </div>
      )
}
