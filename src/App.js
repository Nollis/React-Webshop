import { CssBaseline, ThemeProvider } from "@mui/material";
import { useDeferredValue, useEffect, useState, useTransition } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Account from "./scenes/account";
import Customers from "./scenes/customers";
import Cart from "./scenes/cart";
import Productadmin from "./scenes/productadmin";
import Categoryadmin from "./scenes/productadmin/categories";
import Login from "./scenes/login";
import Footer from "./components/footer/Footer";
import Main from "./scenes/main";

function App() {
  const [cartItems, setCartItems] = useState([]);
  

  const onAdd = (product) => {
    
    const exist = cartItems.find((x) => x.candyId === product.candyId);
    if (exist) {
      const newCartItems = cartItems.map((x) =>
        x.candyId === product.candyId ? { ...exist, Quantity: exist.Quantity + 1 } : x
      );
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      const newCartItems = [...cartItems, { ...product, Quantity: 1 }];
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.candyId === product.candyId);
    if (exist.Quantity === 1) {
      const newCartItems = cartItems.filter((x) => x.candyId !== product.candyId);
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      const newCartItems = cartItems.map((x) =>
        x.candyId === product.candyId ? { ...exist, Quantity: exist.Quantity - 1 } : x
      );
      setCartItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  };

  const [isPending, startTransition] = useTransition();

  //

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
          <Route path="/categoryadmin" element={<Categoryadmin />} />
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
