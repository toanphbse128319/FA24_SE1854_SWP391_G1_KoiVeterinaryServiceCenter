import React from "react";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import NhanHang from "./Components/NhanHang";
import Footer from "./Components/Footer";
import AboutUsFake from "./Components/AboutUsFake";
import Doctor  from "./Components/DoctorLanding";
import { Outlet } from "react-router-dom";
import News from "./Components/News";
import { useState, useEffect } from 'react';
import { FetchAPI } from "./Helper/Utilities";
import PaymentStatusPage from "./pages/PaymentConfirmation";

import PaymentStatusPage from "./pages/PaymentConfirmation";

const App = () => {
    const [services, SetServices] = useState([]);
    const [sdm, SetSDM] = useState([]);
    const [loading, SetLoading] = useState(true);

    useEffect(() => {
        async function GetData(){
            try {
                // Set loading to true before fetching
                SetLoading(true);
                FetchAPI({ endpoint: '/service' }).then( response => response.json().then( json => SetServices( json ) ) );
                FetchAPI({ endpoint: '/servicedeliverymethod' }).then( response => response.json().then( json => SetSDM( json ) ) );
                
                
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                // Set loading to false after fetching
                SetLoading(false);
            }
        }
        GetData();
    }, []);
    if(loading){
        return (
            <div>Loading...</div>
        );
    }

  return (
    <div className="overflow-x-hidden">
      <Navbar services={services} SetServices={SetServices} sdm={sdm} SetSDM={SetSDM}/>
      <Banner allServices={services} sdm={sdm} />
      <NhanHang />
      <AboutUsFake />
      <Doctor/>
      <News/>
      <Footer />
      
    </div>
  );
};

export default App;
