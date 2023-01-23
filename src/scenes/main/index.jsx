import React from 'react';
import Hero from "../../components/hero/Hero";
import Slider from '../../components/slider/Slider';
import Products from '../../components/products/Products';
import Tagline from '../../components/Tagline'

function Main(props) {
  const { cartItems, products, onAdd, onRemove } = props;
  return (
    <>
    <Hero />
    <Tagline />
    <Slider />
    <Products cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
    </>
  )
}

export default Main