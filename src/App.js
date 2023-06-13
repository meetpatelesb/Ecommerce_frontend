import React, { useEffect, useState } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
  Navigate,
  createRoutesFromElements,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ProductCart from "./pages/ProductCart";
import OrderPage from "./pages/OrderPage";
import OrderComplete from "./pages/Orders";
// import "./index.css";
// import 'bootstrap/dist/css/bootstrap.min.css'
const LocalData = JSON.parse(localStorage.getItem("token"));
const token = LocalData?.token;

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

// const FinalRoute = (props) => {
//   const { isPublic, cmp } = props;
//   if (isPublic) {
//     if (!token) {
//       return cmp;
//     } else {
//       return <Navigate to="/home" />;
//     }
//   } else {
//     if (token) {
//       return cmp;
//     } else {
//       return <Navigate to="/login" />;
//     }
//   }
// };

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/">
//       <Route
//         path="/login"
//         element={<FinalRoute isPublic={true} cmp={<Login />} />}
//       />
//       <Route
//         path="/signup"
//         element={<FinalRoute isPublic={true} cmp={<Signup />} />}
//       />

//       <Route
//         path="/home"
//         element={<FinalRoute isPublic={false} cmp={<Home />} />}
//       />
//       <Route
//         path="/addproduct"
//         element={<FinalRoute isPublic={false} cmp={<AddProduct />} />}
//       />
//       <Route
//         path="/cart"
//         element={<FinalRoute isPublic={false} cmp={<ProductCart />} />}
//       />
//       <Route
//         path="/order"
//         element={<FinalRoute isPublic={false} cmp={<OrderPage />} />}
//       />
//       <Route
//         path="/orderlist"
//         element={<FinalRoute isPublic={false} cmp={<OrderComplete />} />}
//       />

//       <Route path="" element={<Navigate to={"/home"} />} />
//     </Route>
//   )
// );

// const App = () => {
//   return <RouterProvider router={router} />;
// };

export default App;
