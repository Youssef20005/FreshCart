import React, { useContext, useEffect } from 'react'
import logo from "../../assets/images/image/freshcart-logo.svg"
import { Link, NavLink } from 'react-router-dom'
import { StoreContext } from '../../context/storeContext';
export default function Navbar() {
 let {counter,getCart,setCounter} = useContext(StoreContext)
 useEffect(() => {
  let fetchCartItems = async () => {
    try {
      let data = await getCart();
      if (data.status === "success") {
        setCounter(data.numOfCartItems);
      } else {
        // Handle error or unexpected data structure
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // Handle error
    }
  };

  fetchCartItems();
}, [getCart, setCounter]);

 
  return (
  <>
 <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
  <div className="container-fluid mx-4">
<Link to=""><img src={logo} alt="logo"/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
        <li className="nav-item">
          <NavLink className="nav-link" to="home">Home</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link" to="products">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="categories">Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="brands">Brands</NavLink>
        </li>
        </ul>
       
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 px-2 ">
        {/* <li className="nav-item position-relative ">
<Link to='/wishlist' className="btn position-relative ">
WishList
<i className="fa-solid fa-heart fs-4 mx-2"></i>
 {counter?<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {counter}
    <span className="visually-hidden">unread messages</span>
  </span>:""} 
</Link>

        </li> */}
        <li className="nav-item position-relative ">
<Link to='/cart' className="btn position-relative mx-3">
  Cart
<i className="fa-solid fa-cart-shopping fs-4"></i>

 {counter? <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {counter}
    <span className="visually-hidden">unread messages</span>
  </span>:""}
</Link>

                

       
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/SignIn"  >Logout</Link>
        </li>
        
        </ul>
       
     
    </div>
  </div>
</nav>

  </>
  )
}
