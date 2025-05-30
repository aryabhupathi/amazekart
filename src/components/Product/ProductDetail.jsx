// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { cartAdd, cartUpdate } from "../redux/Actions";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CardMedia,
//   Box,
//   IconButton,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import { Link } from "react-router-dom";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   const existingCartItem = cart.find((item) => item.id === Number(id));
//   const [quantity, setQuantity] = useState(
//     existingCartItem ? existingCartItem.quantity : 1
//   );
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   useEffect(() => {
//     fetch(`https://fakestoreapi.com/products/${id}`)
//       .then((res) => res.json())
//       .then((data) => setProduct(data));
//   }, [id]);

//   useEffect(() => {
//     if (existingCartItem) {
//       setQuantity(existingCartItem.quantity);
//     }
//   }, [existingCartItem]);

//   const handleAddToCart = () => {
//     if (existingCartItem) {
//       dispatch(cartUpdate({ id: product.id, quantity }));
//     } else {
//       dispatch(cartAdd({ ...product, quantity }));
//     }
//     setOpenSnackbar(true);
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   const increaseQuantity = () => {
//     setQuantity((prev) => prev + 1);
//   };

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity((prev) => prev - 1);
//     }
//   };

//   if (!product) return <Typography>Loading...</Typography>;

//   return (
//     <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//       <Card sx={{ width: { xs: "100%", md: "80%" }, p: 2, boxShadow: 3 }}>
//         <Grid container spacing={3} alignItems="center">
//           <Grid item size={{ xs: 12, md: 4 }}>
//             <CardMedia
//               component="img"
//               sx={{ width: "100%", height: "auto", objectFit: "contain" }}
//               image={product.image}
//               alt={product.title}
//             />
//           </Grid>

//           <Grid item size={{ xs: 12, md: 8 }}>
//             <CardContent>
//               <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//                 {product.title}
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 2 }}>
//                 {product.description}
//               </Typography>
//               <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
//                 Category: {product.category}
//               </Typography>
//               <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
//                 Price: ${product.price}
//               </Typography>
//               <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
//                 Total: ${(product.price * quantity).toFixed(2)}
//               </Typography>

//               <Box
//                 sx={{ display: "flex", alignItems: "center", mt: 2, gap: 2 }}
//               >
//                 <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                   Quantity
//                 </Typography>

//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "row",
//                     alignItems: "center",
//                     border: "1px solid black",
//                     borderRadius: "5px",
//                     p: 0.5,
//                   }}
//                 >
//                   <IconButton
//                     onClick={decreaseQuantity}
//                     disabled={quantity <= 1}
//                   >
//                     <RemoveIcon />
//                   </IconButton>

//                   <Typography
//                     variant="h6"
//                     sx={{ mx: 2, minWidth: 30, textAlign: "center" }}
//                   >
//                     {quantity}
//                   </Typography>

//                   <IconButton
//                     onClick={increaseQuantity}
//                   >
//                     <AddIcon />
//                   </IconButton>
//                 </Box>
//               </Box>

//               <Button
//                 onClick={handleAddToCart}
//                 variant="contained"
//                 sx={{ mt: 3, width: "100%" }}
//               >
//                 Add to Cart
//               </Button>
//             </CardContent>
//           </Grid>
//         </Grid>
//         <Snackbar
//           open={openSnackbar}
//           autoHideDuration={3000}
//           onClose={handleCloseSnackbar}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         >
//           <Alert
//             onClose={handleCloseSnackbar}
//             severity="success"
//             sx={{ width: "100%" }}
//           >
//             Product added to cart!
//             <Button color="inherit" size="small">
//               <Link
//                 to="/cart"
//                 style={{ textDecoration: "none", color: "green" }}
//               >
//                 View Cart
//               </Link>
//             </Button>
//           </Alert>
//         </Snackbar>
//       </Card>
//     </Box>
//   );
// };

// export default ProductDetail;

import React, { useEffect, useState } from "react";
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
    fetch(`https://fakestoreapi.com/products/${id}`)
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
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <Card
        sx={{
          width: { xs: "100%", md: "80%" },
          maxWidth: 1200,
          boxShadow: 4,
          borderRadius: 4,
          bgcolor: "#fdfdfd",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item size={{xs:12, md:5}}>
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
                bgcolor: "#f7f7f7",
                width: "90%",
              }}
            />
          </Grid>

          <Grid item size={{xs:12, md:7}} sx={{
                borderRadius: 3,
                boxShadow: 5,
                bgcolor: "#f7f7f7",}}>
            <CardContent >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {product.description}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Category:{" "}
                <span style={{ color: "#007BFF" }}>{product.category}</span>
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mt: 2, color: "#e65100" }}
              >
                Price: ${product.price}
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mt: 1, color: "#2e7d32" }}
              >
                Total: ${(product.price * quantity).toFixed(2)}
              </Typography>

              {/* Quantity Controls */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mt: 3,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Quantity
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
                    sx={{ color: "#d32f2f" }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                  <IconButton
                    onClick={increaseQuantity}
                    size="small"
                    sx={{ color: "#2e7d32" }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                variant="contained"
                startIcon={<ShoppingCartCheckoutIcon />}
                sx={{
                  mt: 4,
                  bgcolor: "linear-gradient(to right, #2196F3, #21CBF3)",
                  background: "linear-gradient(45deg, #43cea2 30%, #185a9d 90%)",
                  color: "#fff",
                  fontWeight: "bold",
                  width: "100%",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #11998e 30%, #0388fc 90%)",
                  },
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
            sx={{ width: "100%" }}
            action={
              <Button size="small" color="inherit">
                <Link to="/cart" style={{ color: "#fff", textDecoration: "none" }}>
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
