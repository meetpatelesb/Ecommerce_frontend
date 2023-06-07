import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import "./index.css";
// import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/login" element={<Login />}></Route> */}
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
