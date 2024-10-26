import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TrackingBookingDetail from "./Components/TrackingBookingDetail";
import DocterList from "./Components/DoctorList.jsx";
import Navbar from "./Components/Navbar.jsx";
import Banner from "./Components/Banner.jsx";
import BookingPage from "./pages/Booking.jsx";
import NhanHang from "./Components/NhanHang.jsx";
import Footer from "./Components/Footer.jsx";
import NotFound from "./Components/NotFound.jsx";
import AboutUs from "./pages/AboutUsPage.jsx";
import Login from "./Components/LoginContainer.jsx";
import Test from "./Components/BookingList.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />}>
          <Route index element={<App />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/NhanHang" element={<NhanHang />} />
          <Route path="/Banner" element={<Banner />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/DoctorList" element={<DocterList />} />
          <Route path="/*" element={<NotFound />} />

        </Route>
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
