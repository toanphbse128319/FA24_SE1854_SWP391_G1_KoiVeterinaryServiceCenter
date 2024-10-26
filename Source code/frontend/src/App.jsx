import React from "react";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import NhanHang from "./Components/NhanHang";
import Footer from "./Components/Footer";
import AboutUsFake from "./Components/AboutUsFake";
import Doctor  from "./Components/DoctorLanding";
import { Outlet } from "react-router-dom";
import News from "./Components/News";

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Banner />
      <NhanHang />
      <AboutUsFake />
      <Doctor/>
      <News/>
      <Footer />
      
    </div>
  );
};

export default App;
