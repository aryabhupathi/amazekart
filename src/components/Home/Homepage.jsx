import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        fetchProductsByCategory(data);
      });
  }, []);

  const fetchProductsByCategory = (categories) => {
    const productRequests = categories.map((category) =>
      fetch(`https://fakestoreapi.com/products/category/${category}?limit=4`)
        .then((res) => res.json())
    );

    Promise.all(productRequests).then((results) => {
      const productsData = {};
      categories.forEach((category, index) => {
        productsData[category] = results[index];
      });
      setProducts(productsData);
      setLoading(false);
    });
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;

  return (
    <Container sx={{ mt: 3, bgcolor: "#F5F5F5", py: 3, borderRadius: 2 }}>
      <Box textAlign="center" py={3} sx={{ bgcolor: "#FFF", borderRadius: 2, mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="#FF5722"gutterBottom>
          Welcome to ShopCart
        </Typography>
        <Typography variant="h6" color="textSecondary" maxWidth={600} mx="auto">
          Discover top-quality products at unbeatable prices. Shop from a variety of categories
          and find everything you need in one place.
        </Typography>
        <Button variant="contained" size="small" color="primary" sx={{ mt: 3 }} component={Link} to="/product">
          Shop Now
        </Button>
      </Box>

      {categories.map((category) => (
        <Box key={category} sx={{ mb: 3, p: 2, bgcolor: "#FFFFFF", borderRadius: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1, p: 1, bgcolor: "#DCDCDC", borderRadius: 1 }}
          >
            <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
              {category}
            </Typography>
            <Button
              variant="outlined"
              component={Link}
              to={`/product`}
              
          size="small"
            >
              View All
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3} mb={3}>
            {products[category]?.map((product) => (
              <Grid item size={{xs:12, sm:6, md:3}} key={product.id}>
                <Card
                  sx={{
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                    bgcolor: "#FAFAFA",
                    borderRadius: 2,
                  }}
                >
                  <CardMedia
                    sx={{ height: 180, backgroundSize: "contain", p: 2 }}
                    image={product.image}
                    title={product.title}
                  />
                  <CardContent>
                    <Typography variant="body1" noWrap>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ${product.price}
                    </Typography>
                  </CardContent>
                  <Box sx={{ textAlign: "center", mb: 2 }}>
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/product/${product.id}`}
                      size="small"
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
};

export default Home;