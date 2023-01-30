import React, { useState } from 'react';
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logo from "./logo.png";
import {useCookies} from "react-cookie";

const Topbar = (props) => {
  const { countCartItems } = props;
  const [cookie, setCookie, removeCookie] = useCookies();
  const [admin, setAdmin] = useState(false);
  const [toggle, setToggle] = useState(true)
  const isAdmin = cookie.Admin;
  const UserId = cookie.UserId;


  if(isAdmin === true) {
    setAdmin(true);
  }

  function IsLoggedIn() {
    if (UserId !== undefined) {
      return (
      <Link  onClick={logout} className="menu-item">
        <span>Log Out</span>
      </Link>
      );
    }
    else {
      return (
        <Link to="/login" className="menu-item">
          <span>Log In</span>
        </Link>
        );
    }
  }

  const logout = (e) => {
    removeCookie('UserId', { path: '/'});
    removeCookie('Admin', { path: '/'});
}

const toggleAdmin = () => {
  setCookie('Admin', true, { path: '/'});
  setAdmin(!admin);
}

const toggleUser = () => {
  setCookie('Admin', false, { path: '/'});
  setAdmin(!admin);
}


  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Logo */}
      <Box display="flex">
        <Link to="/">
          <img src={Logo} alt="" height="50px" />
        </Link>
        {admin ?
        <Button onClick={() => toggleAdmin()}>User</Button>
        :
        <Button onClick={() => toggleUser()}>Admin</Button>
      }
      </Box>

      {/* menu BAR */}
      <Box display="flex">
          {admin ? (
            <>
            <Box m="0" p="5px" justifyContent="center" borderRadius="4px">
              <Link to="/productadmin" className="menu-item">
                <span>Product Admin</span>
              </Link>
            </Box>
            <Box m="0" p="5px" justifyContent="center" borderRadius="4px">
              <Link to="/categoryadmin" className="menu-item">
                <span>Category Admin</span>
              </Link>
            </Box>
            <Box m="0" p="5px" justifyContent="center" borderRadius="4px">
              <Link to="/customers" className="menu-item">
                <span>Customer Admin</span>
              </Link>
            </Box>
            </>
            ) : (
              <></>
          )}
        <Box m="0" p="5px" justifyContent="center" borderRadius="4px">
          <Link to="/account" className="menu-item">
            <span>Create Account</span>
          </Link>
        </Box>
        <Box m="0" p="5px" justifyContent="center" borderRadius="4px">
          <IsLoggedIn />
        </Box>
        <Box m="0" p="5px" justifyContent="center" borderRadius="4px">
          <Link to="/cart" className="menu-item">
            <ShoppingCartIcon />
            {countCartItems ? (
              <span className="cart-basket">{countCartItems}</span>
            ) : (
                <span className="cart-basket">0</span>
            )}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
