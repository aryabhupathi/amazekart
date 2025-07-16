import { AppBar, Toolbar, IconButton, Badge, Button, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Header = () => {
  const cart = useSelector((state) => state.cart);
  const cartCount = cart.length;
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#FF6B6B",
        padding: { xs: "0 10px", sm: "0 20px" },
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: { xs: "wrap", md: "nowrap" },
          gap: { xs: 2, md: 0 },
          alignItems: "center",
        }}
      >
        <Button
          component={Link}
          to="/"
          color="inherit"
          sx={{
            fontSize: { xs: "1rem", sm: "1.2rem" },
            fontWeight: "bold",
            textTransform: "none",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#F9A825",
              color: "#333333",
              borderRadius: 1,
            },
          }}
        >
          ShopCart
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton
            component={Link}
            to="/cart"
            color="inherit"
            sx={{
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 1,
              },
            }}
          >
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
