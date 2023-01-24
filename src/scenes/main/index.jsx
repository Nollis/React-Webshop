import Hero from "../../components/hero/Hero";
import Slider from '../../components/slider/Slider';
import Products from '../../components/products/Products';
import Tagline from '../../components/Tagline'
import api from "../../http-common";
import React, { useState, useEffect } from "react";

function Main(props) {

  const [allcandies, setProducts] = useState([]);

  useEffect(() => {
    api.get("/api/Candy").then((result) => setProducts(result.data));
  }, []);

  const { cartItems, onAdd, onRemove } = props;
  return (
    <>
    <Hero />
    <Tagline />
    <Slider />
    <Products products={allcandies} cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
    </>
  )
}

export default Main