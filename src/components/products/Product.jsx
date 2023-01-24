
import React from 'react'
import css from "./Products.module.css";

function product(props) {
    const { item, product, onAdd, onRemove } = props;
  return (
    <div className={css.product}>
  <div className="left-s">
    <div className="name">
      <span>{product.candyName}</span>
      <span>{product.candyDescription}</span>
    </div>
    <span>{product.candyPrice}$</span>
    <div>
      <button onClick={() => onAdd(product)}>Add To Cart</button>
    </div>
  </div>

   <img src={`../assets/${product.candyCategoryId}/${product.candyImage}`} alt="" className="img-p" />
</div>
  );
}

export default product