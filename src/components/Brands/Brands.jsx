import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import Brand from '../Brand/Brand';

export default function Brands() {
 
  function getBrands() {
    return axios.get(
       "https://ecommerce.routemisr.com/api/v1/brands"
     );
  
   }
  
   let {data}=useQuery('getProducts',getBrands)
  return (
    <>
    <div className="container my-5">
<div className="row">
  {data?.data.data.map((item) => {
    return <Brand item={item} key={item._id}/>
  })}

</div>
    </div>
    
    </>
  )
}
