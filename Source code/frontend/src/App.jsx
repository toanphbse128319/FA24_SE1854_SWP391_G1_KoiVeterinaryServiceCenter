
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Login from "./pages/Login";
import AboutUsPage from "./pages/AboutUsPage";
import Header from "./Components/Header";
import LoginContainer from "./Components/LoginContainer";

import Banner from "./Components/Banner";
import NhanHang from "./Components/NhanHang"
import Navbar from "./Components/Navbar"
import Booking from "./pages/Booking"
const App = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div >
        <Banner/>  
      </div>
      <div>
        <NhanHang/>
      </div>
    </div>
  );
};
export default App;



