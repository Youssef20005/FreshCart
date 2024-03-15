import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import logo from "../../assets/images/image/freshcart-logo.svg"

export default function AthurizedLayout() {
  return (
    <>
 <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
  <div className="container-fluid mx-4">
<Link to=""><img src={logo} alt="logo"/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
       
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 px-2 ">
<li className='nav-link' to="signin">
  <NavLink className="nav-link" to="signin">Signin</NavLink>

</li>
<li className='nav-link' to="signup">
  <NavLink className="nav-link" to="signup">Signup</NavLink>

</li>
        
        </ul>
       
     
    </div>
  </div>
</nav>






        <Outlet/>
        
        
        </>
  )
}
