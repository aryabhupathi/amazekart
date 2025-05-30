import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  Divider,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
const ITEMS_PER_PAGE = 8;
const ProductList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory =
    queryParams.get("category") ||
    localStorage.getItem("selectedCategory") ||
    "";
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      fetch("https://fakestoreapi.com/products/categories").then((res) =>
        res.json()
      ),
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
    ])
      .then(([categoryData, productData]) => {
        setCategories(categoryData);
        setProducts(productData);
      })
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    if (!products.length) return;
    const filtered = selectedCategory
      ? products.filter((p) => p.category === selectedCategory)
      : products;
    setFilteredProducts(filtered);
    localStorage.setItem("selectedCategory", selectedCategory);
    setCurrentPage(1);
  }, [products, selectedCategory]);
  const handleFilterChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const resetFilter = () => {
    setSelectedCategory("");
    localStorage.removeItem("selectedCategory");
  };
  const handlePageChange = (value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };
  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress color="secondary" />
      </Container>
    );
  }
  return (
    <Container sx={{ mt: 4 }}>
      <Box
        textAlign="center"
        py={4}
        px={3}
        sx={{ bgcolor: "#fff8f0", borderRadius: 3, mb: 4 }}
      >
        <Typography variant="h3" fontWeight="bold" color="#d84315" gutterBottom>
          Welcome to ShopCart
        </Typography>
        <Typography variant="h6" color="textSecondary" maxWidth={700} mx="auto">
          Discover top-quality products at unbeatable prices. Shop from a
          variety of categories and find everything you need in one place.
        </Typography>
      </Box>
      <Box
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          bgcolor: "white",
          boxShadow: 3,
          border: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "center", sm: "space-between" },
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#d84315",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          Filter Products
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { xs: "center", sm: "flex-end" },
            alignItems: { xs: "stretch", sm: "center" },
            gap: 2,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <FormControl sx={{ width: { xs: "100%", sm: 150 } }} size="small">
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              onChange={handleFilterChange}
              label="Category"
              sx={{
                borderRadius: 2,
                bgcolor: "#fff",
                boxShadow: 1,
              }}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={resetFilter}
            variant="contained"
            color="error"
            disabled={!selectedCategory}
            sx={{
              textTransform: "none",
              px: 2,
              borderRadius: 2,
              fontWeight: 600,
              boxShadow: 2,
              alignSelf: { xs: "center", sm: "flex-end" },
              "&:hover": {
                boxShadow: 4,
              },
            }}
          >
            Reset Filter
          </Button>
        </Box>
      </Box>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={3}>
        {currentProducts.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ width: "100%", mt: 4 }}>
            No products found in this category.
          </Typography>
        ) : (
          currentProducts.map((product) => (
            <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: { xs: 160, sm: 180 },
                    objectFit: "contain",
                    width: "100%",
                    borderRadius: "8px 8px 0 0",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                    paddingTop: 2,
                  }}
                  image={product.image}
                  alt={product.title}
                />
                <CardContent
                  sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                >
                  <Tooltip title={product.title}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        mb: 1,
                      }}
                    >
                      {product.title}
                    </Typography>
                  </Tooltip>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 1 }}
                  >
                    {formatPrice(product.price)}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    component={Link}
                    to={`/product/${product.id}`}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    fullWidth
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};
export default ProductList;
