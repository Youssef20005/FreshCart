import React from 'react'
import Categories from '../Categories/Categories'
import Products from '../products/Products'
import MainSlider from '../MainSLider/MainSlider'
import { Helmet } from 'react-helmet'
import Footer from '../Footer/Footer'

export default function Home() {


  return (
    <>
    <Helmet>
    <title>Fresh Cart</title>
    <meta name="description" content="Home" />
    </Helmet>
    <MainSlider/>
    <Categories/>
    <Products/>
    <Footer/>



    </>
  )
}
