import React, { useState, useEffect } from "react";
import css from "./Products.module.css";
import Plane from "../../assets/plane.png";
import Product from "./Product";
import api from "../../http-common";

const Products = (props) => {
  const { cartItems, onAdd, onRemove } = props;

  const [candies, setCandies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/api/Candy");
        setCandies(res.data);
        setFiltered(res.data);
      } catch (err) {
        throw new Error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    api.get("/api/Candy/categories").then((res) => setCategories(res.data));
  }, []);

  const filter = (categoryId) => {
    setFiltered(candies.filter((candy) => candy.candyCategoryId === categoryId));
  };

  return (
    <div className={css.container}>
      <img src={Plane} className="imgPlane" alt="" />
      <h1>Our featured products</h1>

      <div className={css.products}>
        <ul className={css.menu}>
          <li onClick={() => setFiltered(candies)}>All</li>
          {categories.map((e) => {
            return (
              <li key={e.categoryId} onClick={() => filter(e.categoryId)}>
                {e.categoryName}
              </li>
            );
          })}
        </ul>

        <div className={css.list}>
          {filtered.map((product) => (
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
