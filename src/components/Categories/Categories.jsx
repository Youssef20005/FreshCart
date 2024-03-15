import axios from 'axios'
import { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function Categories() {
  let [categories, setCategories] = useState([]);
 async function getApiCategoriy()
  {
   let {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/categories/")
  setCategories(data.data);
  console.log(data.data);
  }
  useEffect(()=>{
    getApiCategoriy();
  },[])
  var settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  }; 
  
 

  return (
    <div className='py-4 container'>
   <h3>Shop Popular Categories</h3>
   <Slider {...settings}>
    {
    categories.map((category)=>(
      
      
        <div className='px-1' key={category._id}>
             <img src={category.image} className='w-100' height={200} alt="" />
        <h5>{category.name}</h5>
        </div>
        
    ))

      
    }
        
      </Slider> 
    
   
    
  
    </div>
  )
  
  }