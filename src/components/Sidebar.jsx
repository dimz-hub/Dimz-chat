import React from 'react'
import Sidenav from './Sidenav'
import Sideinput from './Sideinput'
import Sideuser from './Sideuser'

export default function Sidebar({user}) {
  return (
    <div className='sidebar w-[100%]'>
        <Sidenav user = {user} />
        <Sideinput />
        <Sideuser />
    </div>
  )
}
