
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Container,
  Divider,
  Pagination,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 12;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleFilterChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setCurrentPage(1)

    if (category === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  const resetFilter = () => {
    setSelectedCategory("");
    setFilteredProducts(products);
    setCurrentPage(1);
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
      {/* Filter */}
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 1,
          border:'2px solid red'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Filter Products
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
          <FormControl sx={{ padding:1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Category</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedCategory}
              onChange={handleFilterChange}
              label="Category"
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={resetFilter} variant="contained" color="secondary">
            Reset
          </Button>
        </Box>
      </Box> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 1,
          padding: 1,
          marginBottom: 2,
          backgroundColor: "#fDfDfD"
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
          Filter Products
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Category</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedCategory}
              onChange={handleFilterChange}
              label="Category"
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={resetFilter} variant="contained" color="secondary" size="small">
            Reset
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {currentProducts.map((product) => (
          <Grid item key={product.id} size={{xs:12, sm:6, md:4, lg:3}}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
