import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logo from "./logo.png";

const Topbar = (props) => {
  const { countCartItems } = props;

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Logo */}
      <Box display="flex">
        <Link to="/">
          <img src={Logo} alt="" height="50px" />
        </Link>
      </Box>

      {/* menu BAR */}
      <Box display="flex">
        <Box m="0" p="5px" justifyContent="center" borderRadius="4px">
          <Link to="/productadmin" className="menu-item">
            <span>Product Admin</span>
          </Link>
        </Box>
        <Box m="0" p="5px" justifyContent="center" borderRadius="4px">
          <Link to="/customers" className="menu-item">
            <span>Customer Admin</span>
          </Link>
        </Box>
        <Box m="0" p="5px" justifyContent="center" borderRadius="4px">
          <Link to="/account" className="menu-item">
            <span>Create Account</span>
          </Link>
        </Box>
        <Box m="0" p="5px" justifyContent="center" borderRadius="4px">
          <Link to="/login" className="menu-item">
            <span>Log In</span>
          </Link>
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
