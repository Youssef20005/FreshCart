import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { baseUrl } from "../components/utils/baseUrl";

function addToCart({ productId }) {
    return axios.post(
      baseUrl + 'cart',
      { productId },
      {
        headers: { token: localStorage.getItem('token') }
      }
    ).then(({ data }) => data)
     .catch((err) => {
       console.log(err);
       // Handle error here
     });
  }
 
  function getCart() {
    return axios.get(
      baseUrl + 'cart',
     
      {
        headers: { token: localStorage.getItem('token') }
      }
    ).then(({ data }) => data)
     .catch((err) => {
       console.log(err);
       // Handle error here
     });
  }
  function removeItem(productId) {
    return axios.delete(
      baseUrl + 'cart/'+productId,
     
      {
        headers: { token: localStorage.getItem('token') }
      }
    ).then(({ data }) => data)
     .catch((err) => {
       console.log(err);
       // Handle error here
     });
  }
  function updateQuantity(productId,count) {
    return axios.put(
      baseUrl + 'cart/'+productId,{
        count
      },
     
      {
        headers: { token: localStorage.getItem('token') }
      }
    ).then(({ data }) => data)
     .catch((err) => {
       console.log(err);
       // Handle error here
     });
  }
  function pay(cartId,shippingAddress) {
    return axios.post(
      baseUrl + 'orders/checkout-session/'+cartId,{
        shippingAddress
      },
     
      {
        headers: { token: localStorage.getItem('token') }
      }
    ).then(({ data }) => data)
     .catch((err) => {
       console.log(err);
       // Handle error here
     });
  }


  export const StoreContext = createContext(0);
    


export default function StoreContextProvider({ children }) {
  const [token, setToken] = useState(null);
  useEffect( 
    function() {
if (localStorage.getItem("tkn")) {
  setToken(localStorage.getItem("tkn"));
}
    } , []
  )
    const [counter, setCounter] = useState(0);

    return (
        <StoreContext.Provider value={{ token, setToken ,pay, addToCart,counter, setCounter,getCart,removeItem,updateQuantity}}>
            {children}
        </StoreContext.Provider>
    );
}
