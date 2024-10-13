import React from "react";
import { Routes, Route, Link } from "react-router-dom"; // Nhập khẩu Link

import Header from "./Components/Header.jsx";
import Navbar from "./Components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import AboutUs from "./buttonComponents/AboutUs.jsx";

import GuestView from "./Components/GuestView.jsx";

const App = () => {
  return (
    <div>
      <Routes>
       {/*  <Route path="/" element={<GuestView />} /> */}
        <Route path="/" element={<AboutUs />} />
      </Routes>
    </div>
  );
};

export default App;