import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { StoreContext } from '../../context/storeContext'
import { Helmet } from 'react-helmet'

export default function Productdetails() {
    let {counter,setCounter}=useContext(StoreContext)
    let {id}=useParams()
    let [product,setProduct]=useState({})
    let [loading,setLoading]=useState(true)
    function getProduct(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((res)=>{
            console.log(res.data)
            setProduct(res.data.data)
            setLoading(false)
    
    
    
    }).catch((err)=>{console.log(err)})
    }
    useEffect(()=>{getProduct()},[])
        if(loading) return <Loading/>
   
  return (
    <>

    <Helmet>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
        
    </Helmet>
<div className="container my-5">
    <div className="row mt-5">
        <div className="col-md-3">
            <img src={product.imageCover} className='w-100' alt="" />

        </div>
        <div className="col-md-9">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <span className='text-main mt-1'>{product.category.name}</span>
           <div className='d-flex justify-content-between p-1'>
           <h5>{product.price}EGP</h5>
            <span><i className="rating-color fa-solid fa-star"></i>{product.ratingsAverage}</span>
           </div>
            <button onClick={() => setCounter(counter + 1)} className='btn bg-main text-white w-100'>+ Add To Cart</button>
        </div>
    </div>
</div>
    </>
  )
}
