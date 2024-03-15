import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Offline } from 'react-detect-offline'

export default function MainLayout() {
  return (
    <>
<Navbar/>
<Outlet/>

<div>

  <Offline>
  <div className='network'>
  <i className="fa-solid fa-wifi"></i>  You are offline!
   </div>
  </Offline>



</div>

    </>
  )
}

