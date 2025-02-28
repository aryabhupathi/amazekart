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

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        applyFilter(data, initialCategory);
      });
  }, [initialCategory]);

  useEffect(() => {
    applyFilter(products, selectedCategory);
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory, products]);

  const applyFilter = (allProducts, category) => {
    if (!category) {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(
        allProducts.filter((product) => product.category === category)
      );
    }
    setCurrentPage(1);
  };

  const handleFilterChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };

  const resetFilter = () => {
    setSelectedCategory("");
    localStorage.removeItem("selectedCategory");
  };

  // Pagination
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* Heading */}
      <Box
        textAlign="center"
        py={3}
        sx={{ bgcolor: "#FFF", borderRadius: 2, mb: 3 }}
      >
        <Typography variant="h4" fontWeight="bold" color="#FF5722" gutterBottom>
          Welcome to ShopCart
        </Typography>
        <Typography variant="h6" color="textSecondary" maxWidth={600} mx="auto">
          Discover top-quality products at unbeatable prices. Shop from a
          variety of categories and find everything you need in one place.
        </Typography>
      </Box>

      {/* Filter Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 1,
          padding: 1,
          marginBottom: 2,
          backgroundColor: "#fDfDfD",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
        >
          Filter Products
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              onChange={handleFilterChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={resetFilter}
            variant="contained"
            color="secondary"
            size="small"
            disabled={!selectedCategory}
          >
            Reset
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Product */}
      <Grid container spacing={3}>
        {currentProducts.map((product) => (
          <Grid item key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding:'5px'
              }}
            >
              <CardMedia
                sx={{ height: 180, backgroundSize: "contain" }}
                image={product.image}
                title={product.title}
              />
              <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 16,
                    fontWeight: "bold",
                    mb: 1,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 1 }}
                >
                  ${product.price}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  component={Link}
                  to={`/product/${product.id}`}
                  variant="contained"
                  sx={{ width: "100%", mt: "auto" }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
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
