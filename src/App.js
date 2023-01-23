import { CssBaseline, ThemeProvider } from "@mui/material";
import { useDeferredValue, useEffect, useState, useTransition } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Account from "./scenes/account";
import Customers from "./scenes/customers";
import Cart from "./scenes/cart";
import Productadmin from "./scenes/productadmin";
import Login from "./scenes/login";
import Footer from "./components/footer/Footer";
import Main from "./scenes/main";
import axios from 'axios';

function App() {
  const [cartItems, setCartItems] = useState([]);
  //localStorage.clear();

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      const newCartItems = cartItems.map((x) =>
        x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
      );
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      const newCartItems = [...cartItems, { ...product, qty: 1 }];
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      const newCartItems = cartItems.filter((x) => x.id !== product.id);
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      const newCartItems = cartItems.map((x) =>
        x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
      );
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  };

  const [isPending, startTransition] = useTransition();

  //debugger;

  useEffect(() => {
    startTransition(() => {
      setCartItems(
        localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : []
      );
    });
  }, []);

  const cartItemsCount = useDeferredValue(cartItems.length);

  return isPending ? (
    <div>Loading...</div>
  ) : (
    <div className="app">
      <main className="content">
        <Topbar countCartItems={cartItemsCount} />
        <Routes>
          <Route
            path="/"
            element={
              <Main cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
            }
          />
          <Route path="/productadmin" element={<Productadmin />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/cart"
            element={
              <Cart cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
            }
          />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
