import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Snackbar,
  Alert,
  CardMedia,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { cartUpdate, cartRemove } from "../redux/Actions";
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
          color: "#FF6B6B",
        }}
      >
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            bgcolor: "#fff8f0",
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: "1.2rem", color: "#555" }}>
            Your cart is empty.
          </Typography>
          <Button
            component="a"
            href="/products"
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: "#FF6B6B",
              color: "#fff",
              "&:hover": {
                bgcolor: "#F9A825",
              },
            }}
          >
            Browse Products
          </Button>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {cart.map((item) => (
              <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: 4,
                    padding: 2,
                    textAlign: "center",
                    borderRadius: 3,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: "120px",
                      height: "120px",
                      objectFit: "contain",
                      margin: "auto",
                      borderRadius: 2,
                      boxShadow: 2,
                      bgcolor: "#fff",
                      p: 1,
                    }}
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent sx={{ flexGrow: 1, px: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        color: "#333",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#e65100" }}>
                      Price: ${parseFloat(item.price).toFixed(2)}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#2e7d32" }}>
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1,
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        dispatch(
                          cartUpdate({
                            id: item.id,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                      disabled={item.quantity <= 1}
                      sx={{
                        color: "#d32f2f",
                        "&:hover": {
                          bgcolor: "#ffebee",
                        },
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ mx: 2 }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        dispatch(
                          cartUpdate({
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
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
                  <Button
                    onClick={() => dispatch(cartRemove(item.id))}
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{
                      mt: 1,
                      textTransform: "none",
                      borderColor: "#ef5350",
                      color: "#ef5350",
                      "&:hover": {
                        bgcolor: "#ef5350",
                        color: "#fff",
                      },
                    }}
                  >
                    Remove from Cart
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              mt: 5,
              p: 3,
              bgcolor: "#fff0f4",
              borderRadius: 3,
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#FF6B6B",
              }}
            >
              Total Amount: ${totalAmount.toFixed(2)}
            </Typography>
            <Button
              onClick={() => setOpenSnackbar(true)}
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: "#FF6B6B",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#F9A825",
                },
                width: "100%",
                py: 1.2,
              }}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: "100%", fontWeight: "bold" }}
        >
          Your purchase was successful!
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default Cart;
