import React from "react";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import NhanHang from "./Components/NhanHang";
import Footer from "./Components/Footer";
import AboutUsFake from "./Components/AboutUsFake";
import Doctor  from "./Components/DoctorList";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <NhanHang />
      <AboutUsFake />
      <Doctor/>
      <Footer />
      
    </div>
  );
};

export default App;
