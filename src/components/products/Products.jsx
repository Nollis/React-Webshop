import React, { useState, useEffect } from "react";
import css from "./Products.module.css";
import Plane from "../../assets/plane.png";
import Product from './Product';
import axios from "axios";
//import {useAutoAnimate} from '@formkit/auto-animate/react'

const Products = (props) => {
  const { cartItems, onAdd, onRemove } = props;

  const [candies, setCandies] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7127/api/Candy")
    .then(result => setCandies(result.data))
  },[]);

  console.log(candies);

  const [MenuProducts, setMenuProducts] = useState(candies);

  const filter = (type) => {
    setMenuProducts(candies.filter((candy) => candy.type === type));
  };

  return (
    <div className={css.container}>
      <img src={Plane} alt="" />
      <h1>Our featured products</h1>

      <div className={css.products}>
        <ul className={css.menu}>
          <li onClick={() => setMenuProducts(candies)}>All</li>
          <li onClick={() => filter("choclate1")}>Choclate 1</li>
          <li onClick={() => filter("chocolate2")}>Choclate 2</li>
          <li onClick={() => filter("chocolate3")}>Choclate 3</li>
        </ul>

        <div className={css.list}>
          {candies.map((product) => (
            <Product
              key={product.candyId}
              product={product}
              item={cartItems.find((x) => x.id === product.candyId)}
              onAdd={onAdd}
              onRemove={onRemove}
            ></Product>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
