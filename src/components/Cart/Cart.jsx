import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/storeContext';
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { getCart, removeItem, setCounter, updateQuantity } = useContext(StoreContext);
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await getCart();
        if (data.status === "success") {
          setCartItems(data);
          setLoading(false);
        } else {
          console.error('Error fetching cart items:', data);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  async function removeHandler(productId) {
    try {
      const data = await removeItem(productId);
      if (data.status === "success") {
        setCounter(data.numOfCartItems);
        toast.warning("Item removed successfully!");
        setCartItems(data);
      }
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error("Failed to remove item!");
    }
  }

  async function updateQuantityHandler(productId, count) {
    try {
      const data = await updateQuantity(productId, count);
      if (data.status === "success") {
        setCounter(data.numOfCartItems);
        toast.success("Quantity updated successfully!");
        setCartItems(data);
      } else {
        toast.error("Quantity update failed!");
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error("Failed to update quantity!");
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (!cartItems || cartItems.numOfCartItems === 0) {
    return <h1 className='text-center text-main my-5'>Cart is Empty !</h1>;
  }

  return (
    <div className="container my-5 bg-main-light p-3">
      <h2>Shop Cart:</h2>
      <p className='text-main'>Total Cart Price: {cartItems?.data?.totalCartPrice} EGP</p>
      {cartItems?.data?.products.map(item => (
        <div className="row border-bottom p-3" key={item._id}>
          <div className="col-md-1">
            <img src={item.product.imageCover} className='w-100' alt="" />
          </div>
          <div className="col-md-11 d-flex justify-content-between">
            <div>
              <h5>{item.product.title}</h5>
              <p className='text-main m-0'> Price: {item.price} EGP</p>
              <button onClick={() => removeHandler(item.product._id)} className='btn text-main m-0 p-0'><i className='fa-solid fa-trash-can'></i> Remove</button>
            </div>
            <div>
              <button disabled={item.count === item.product.count} onClick={() => updateQuantityHandler(item.product._id, item.count + 1)} className='brdr'>+</button>
              <span className='mx-3'>{item.count}</span>
              <button disabled={item.count === 1} onClick={() => updateQuantityHandler(item.product._id, item.count - 1)} className='brdr'> -</button>
            </div>
          </div>
        </div>
      ))}
      <Link to={`/address/${cartItems.data._id}`} className='btn bg-main text-white my-3'> Place Order</Link>
    </div>
  );
}
