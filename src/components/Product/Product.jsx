import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/storeContext';

export default function Product({ item }) {
  let {counter, setCounter, addToCart} = useContext(StoreContext);
  let [loading,setLoading]=useState(true)
  async function addToCartHandler(productId) {
    setLoading(false)
    try {
      const data = await addToCart({ productId });
      console.log(data);
      // Handle success here if needed

      if(data.status==="success")
      {
        setLoading(true)
      setCounter(data.numOfCartItems)
        toast.success("product added successfully!")
      }
      else{
        toast.error("product added failed!")
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle error here if needed
    }
  }
  
  return (
    <div className="col-md-2">
      <div className="product cursor-pointer rounded-3 py-3 m-2">
        <Link to={'/product_details/' + item.id}>
          <img src={item.imageCover} className='w-100' alt="" />
          {item.category && item.category.name && (
            <span className='text-main'>{item.category.name}</span>
          )}
          {item.title && (
            <h5>{item.title.split(" ").slice(0, 2).join(" ")}</h5>
          )}
          <div className='d-flex justify-content-between p-1'>
            <span>{item.price}EGP</span>
            <span><i className="rating-color fa-solid fa-star"></i>{item.ratingsAverage}</span>
          </div>
        </Link>
        <button disabled={!loading} onClick={() => addToCartHandler(item.id)} className='btn bg-main text-white w-100'>
          {loading ? 'Add to cart' : <i className="fa-solid fa-spinner fa-spin"></i>}
        </button>

      </div>
    </div>
  );
}
