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


const App = () => {
    const [services, SetServices] = useState([]);
    const [sdm, SetSDM] = useState([]);
    const [loading, SetLoading] = useState(true);

    useEffect(() => {
        async function GetData(){
            try {
                // Set loading to true before fetching
                SetLoading(true);
                let response = await FetchAPI({ endpoint: '/service' });
                if( !response.ok )
                    return false;
                let json = await response.json();
                SetServices( json );
                response = await FetchAPI({ endpoint: '/servicedeliverymethod' });
                if( !response.ok )
                    return false;
                json = await response.json();
                SetSDM( json );
                return true;
            } catch (error) {
                console.error("Error fetching data:", error);
            } 
        }
        GetData().then( result => SetLoading( !result ));
    }, []);
    if(loading){
        return (
            <div>Loading...</div>
        );
    }

  return (
    <div className="overflow-x-hidden">
      <Navbar allServices={services} SetServices={SetServices} sdm={sdm} SetSDM={SetSDM}/>
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
