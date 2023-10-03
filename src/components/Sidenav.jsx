import React from 'react'

export default function Sidenav({user}) {
  return (
    <div className=' sideNav flex items-center justify-between text-white p-2 '>
     <div>

        <h2 className='font-[700]  text-base'>Dimz Chat</h2>
     </div>
        <div className='flex items-center font-[600] text-sm gap-1'>
            <div className='flex items-center  gap-[5px]'>
                <img src={user.photoURL} alt='' className='rounded-[50%] w-[30px] h-[30px] object-cover' />
                <p>{user.displayName}</p>
            </div>
            <button className='p-1 rounded-[5px] bg-black opacity-90'>Logout</button>
        </div>
    </div>
  )
}
