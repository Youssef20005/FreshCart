import React from "react";
import slider1 from "../../assets/images/image/slider-image-1.jpeg";
import slider2 from "../../assets/images/image/slider-image-2.jpeg";
import slider3 from "../../assets/images/image/slider-image-3.jpeg";
import blog1 from "../../assets/images/assortment-citrus-fruits.png";
import blog2 from "../../assets/images/image/istockphoto-1470758472-612x612.jpg";
import Slider from "react-slick";
export default function MainSlider() {
 var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1500,
    arrows: false
  }; 
  
 

  return (
    <>
   <div className="container mt-2">
  <div className="row gx-0">
    <div className="col-md-10">
    <Slider {...settings}>
        <img height={400} src={slider1} className=" w-100" alt="" />
        <img height={400} src={slider2} className="w-100" alt="" />
        <img height={400} src={slider3} className="w-100" alt="" />
      </Slider> 
    </div>
    <div className="col-md-2">
      <img src={blog2} className="w-100" height={200} alt="" />
      <img src={blog1} className="w-100" height={200} alt="" />

    </div>
  </div>
   </div>
    
  
    </>
  );
    }

