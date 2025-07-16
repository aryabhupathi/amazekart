import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartAdd, cartUpdate } from "../redux/Actions";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Box,
  IconButton,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const existingCartItem = cart.find((item) => item.id === Number(id));
  const [quantity, setQuantity] = useState(
    existingCartItem ? existingCartItem.quantity : 1
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/ ${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);
  useEffect(() => {
    if (existingCartItem) {
      setQuantity(existingCartItem.quantity);
    }
  }, [existingCartItem]);
  const handleAddToCart = () => {
    if (existingCartItem) {
      dispatch(cartUpdate({ id: product.id, quantity }));
    } else {
      dispatch(cartAdd({ ...product, quantity }));
    }
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };
  if (!product) return <Typography variant="h6">Loading...</Typography>;
  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
      <Card
        sx={{
          width: { xs: "100%", md: "90%" },
          maxWidth: 1200,
          boxShadow: 6,
          borderRadius: 4,
          bgcolor: "#fff",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: 10,
          },
        }}
      >
        <Grid container spacing={4} alignItems="stretch">
          <Grid item size={{ xs: 12, md: 5 }}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              sx={{
                objectFit: "contain",
                height: { xs: 250, md: 400 },
                p: 2,
                borderRadius: 3,
                boxShadow: 2,
                bgcolor: "#f9f9f9",
                width: "90%",
                margin: "auto",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 7 }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                p: 4,
                bgcolor: "#fafafa",
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: "#333",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {product.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 2,
                  WebkitLineClamp: 6,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {product.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight="bold" color="#FF6B6B">
                Category:{" "}
                <span style={{ textTransform: "capitalize" }}>
                  {product.category}
                </span>
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mt: 1, color: "#e65100" }}
              >
                Price: ${parseFloat(product.price).toFixed(2)}
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mt: 1, color: "#2e7d32" }}
              >
                Total: ${(product.price * quantity).toFixed(2)}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mt: 3,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Quantity:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    px: 1,
                    bgcolor: "#fff",
                  }}
                >
                  <IconButton
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    size="small"
                    sx={{
                      color: "#d32f2f",
                      "&:hover": {
                        bgcolor: "#ffebee",
                      },
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ mx: 2, fontWeight: "bold" }}>
                    {quantity}
                  </Typography>
                  <IconButton
                    onClick={increaseQuantity}
                    size="small"
                    sx={{
                      color: "#2e7d32",
                      "&:hover": {
                        bgcolor: "#e8f5e9",
                      },
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
              <Button
                onClick={handleAddToCart}
                variant="contained"
                startIcon={<ShoppingCartCheckoutIcon />}
                sx={{
                  mt: 4,
                  bgcolor: "#FF6B6B",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 2,
                  py: 1.2,
                  boxShadow: 3,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    bgcolor: "#F9A825",
                    boxShadow: 6,
                  },
                  width: "100%",
                }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Grid>
        </Grid>
        {/* Snackbar Alert */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%", fontSize: "1rem" }}
            action={
              <Button size="small" color="inherit">
                <Link
                  to="/cart"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  View Cart
                </Link>
              </Button>
            }
          >
            Product added to cart!
          </Alert>
        </Snackbar>
      </Card>
    </Box>
  );
};
export default ProductDetail;
