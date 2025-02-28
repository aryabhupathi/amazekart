import React, { useState } from "react";
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

  const handleBuyNow = () => {
    if (cart.length > 0) {
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
      >
        Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", fontSize: "1.2rem" }}
        >
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cart.map((item) => (
              <Grid item size={{ xs: 12, sm: 6 }} key={item.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: 3,
                    padding: 2,
                    textAlign: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                      margin: "auto",
                    }}
                    image={item.image}
                    title={item.title}
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body1">
                      Price: ${item.price}
                    </Typography>
                    <Typography variant="body1">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </CardContent>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>

                  <Button
                    onClick={() => dispatch(cartRemove(item.id))}
                    variant="contained"
                    color="error"
                    sx={{ mt: 1 }}
                  >
                    Remove
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
              p: 2,
              bgcolor: "whitesmoke",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Total Amount: ${totalAmount.toFixed(2)}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </Box>
        </>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Purchase Successful!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cart;
