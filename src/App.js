import { Provider } from "react-redux";
import store from "./components/redux/Store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Box } from "@mui/material";
import ProductList from "./components/Product/ProductList";
import ProductDetail from "./components/Product/ProductDetail";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";

const App = () => {
  return (
    <Provider store={store}>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor:'#F5F5F5' }}
      >
        <Router>
          <Header />
          <Container sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Container>
          <Footer />
        </Router>
      </Box>
    </Provider>
  );
};

export default App;
