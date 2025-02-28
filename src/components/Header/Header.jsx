import React from "react";
import { AppBar, Toolbar, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          sx={{ fontSize: "1.2rem", fontWeight: "bold", textTransform: "none" }}
          color="inherit"
          component={Link}
          to="/"
        >
          ShopCart
        </Button>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <IconButton component={Link} to="/cart" color="inherit">
            <Badge badgeContent={totalCartItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
