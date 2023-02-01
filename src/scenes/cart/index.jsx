import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header";
import api from "../../http-common";
import { useCookies } from "react-cookie";

function Cart(props) {
  const { cartItems, onAdd, onRemove } = props;
  const [cookie, setCookie, removeCookie] = useCookies();
  const [oldCart, setOldCart] = useState([cartItems]);
  const [newCart, setNewCart] = useState([]);
  const itemsPrice = cartItems.reduce((a, c) => a + c.Quantity * c.candyPrice, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  function postOrderItem(orderItem) {
    
    return api.post(`/api/Candy/purchase`, orderItem);
  }

  async function checkOut() {
    const CartId = parseInt(cookie.CartId);
    

    const itemorders = cartItems.map((obj) => {
      return {
        CandyId: obj.candyId,
        CandyName: obj.candyName,
        Price: obj.candyPrice,
        Quantity: obj.Quantity,
        CartId: CartId,
      };
      // return {
      //   ...obj,
      //   cartId: CartId,
      // };
    });

    // let i = 0;

    // await Promise.all(
    //   addCartId.map((orderItem) =>
    //     postOrderItem(orderItem)
    //       .then((res) => {
    //         i++;
    //         console.log(res.data);
    //         if(i === addCartId.length) {
    //           localStorage.clear();
    //         }
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //       })
    //   )
    // );
     


      await api.get(`/api/Candy/purchase`, itemorders).then((res) => {
        console.log(res.data);
        if (res.data !== "") {
          localStorage.clear();
          alert("Items added to order.");
        } else {
          alert("Order failed!");
        }
      })
  }

  function deleteCart() {
    localStorage.clear();
  }

  return (
    <Box m="20px">
      <Header
        title="Shopping cart"
        subtitle="Items you have added to your cart"
      />
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item.candyId} className="row">
            <div className="col-1">{item.candyName}</div>
            <div className="col-1">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>
            <div className="col-1 text-right">
              {item.Quantity} x ${item.candyPrice.toFixed(2)}
            </div>
          </div>
        ))}
        {cartItems.length !== 0 && (
          <>
            <hr />
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">
                ${shippingPrice.toFixed(2)}
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <Button onClick={checkOut}>Checkout</Button>
              <Button onClick={deleteCart}>Delete cart</Button>
            </div>
          </>
        )}
      </div>
    </Box>
  );
}

export default Cart;
