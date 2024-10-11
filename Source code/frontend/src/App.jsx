import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header.jsx";
import Navbar from "./Components/Navbar.jsx";
import Login from "./pages/Login.jsx"
import GuestView from "./Components/GuestView.jsx"


 const App = () => {
  return (
    <div>
      <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/AboutUs">AboutUs</a>
        </li>
        <li>
          <a href="/Footer">Footer</a>
        </li>
      </ul>
    </nav>
    
      <Routes>
        <Route path= "/" element = {<GuestView/>} />
      </Routes>
    </div>
    
  );
};
export default App;





