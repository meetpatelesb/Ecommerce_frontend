import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ProductCart from "./pages/ProductCart";
import OrderPage from "./pages/OrderPage";
import OrderComplete from "./pages/Orders";
// import "./index.css";
// import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="*" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/addproduct" element={<AddProduct />}></Route>
          <Route path="/cart" element={<ProductCart />}></Route>
          <Route path="/order" element={<OrderPage />}></Route>
          <Route path="/orderlist" element={<OrderComplete />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
