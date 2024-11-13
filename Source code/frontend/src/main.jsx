import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TrackingBookingDetail from "./Components/TrackingBookingDetail";
import DoctorLanding from "./Components/DoctorLanding.jsx";
import Navbar from "./Components/Navbar.jsx";
import Banner from "./Components/Banner.jsx";
import BookingPage from "./pages/Booking.jsx";
import NhanHang from "./Components/NhanHang.jsx";
import Footer from "./Components/Footer.jsx";
import NotFound from "./Components/NotFound.jsx";
import AboutUs from "./pages/AboutUsPage.jsx";
import Login from "./pages/Login.jsx";
import Booking from "./pages/Booking.jsx";
import Confirm from "./pages/Confirm.jsx";
import DoctorList from "./Components/Doctor'sSummaryInformation.jsx";
import News from "./Components/News.jsx";
import PaymentStatusPage from "./pages/PaymentConfirmation.jsx";
import Test from "./Components/BookingList.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Manager from "./Components/Manager/Manager.jsx"
import PageTransition from "./Components/PageTransition.tsx";
import PaymentNotice from "./Components/PaymentNotice.jsx";
import DoctorListHome from "./Components/DoctorList.jsx";
import Map from "./Components/MapPicker.jsx";
import OnlineService from "./pages/OnlineService.jsx";
import SchduleCustomer from "./Components/ScheduleCustomer.jsx"
import PondAtHome from "./pages/PondAtHome.jsx";
import AtHomeService from "./pages/AtHomeService.jsx";
import CenterService from "./pages/CenterService.jsx";


import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";


//add to booking detail
import FishPoolServiceSelection from "./Components/BookingDetail.jsx";
//
import BookingList from "./Components/BookingList.jsx";
import StaffPage from "./pages/StaffPage.jsx";
import ManageLanding from "./Components/Manager/ManageLanding.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<App />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/NhanHang" element={<NhanHang />} />
          <Route path="/Banner" element={<Banner />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/DoctorLanding" element={<DoctorLanding />} />
          <Route path="/News" element={<News />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
        <Route path="/Doctor'sSummaryInformation" element={<DoctorList />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/paymentstatus" element={<PaymentStatusPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Confirm" element={<Confirm />} />
        <Route path="/Map" element={<Map />} />
        <Route
          path="/MyProfile"
          element={
            <PageTransition>
              <MyProfile />
            </PageTransition>
          }   
        />
        Test
        <Route path="/test" element={<Test />} />
        <Route path="/StaffPage" element={<StaffPage />} />
        <Route path="/PaymentNotice" element={<PaymentNotice />} />
        <Route path="/temp" element={<BookingList />} />
        <Route path="/bookinglist" element={<BookingList />} />
        <Route path="/ManageLanding" element={<ManageLanding />} />
        <Route path="/Manager" element={<Manager />} />
        <Route path="/ScheduleCustomer" element={<SchduleCustomer />} />
        <Route path="/OnlineService" element={<OnlineService />} />
        <Route path="/AtHomeService" element={<AtHomeService />} />
        <Route path="/PondAtHome" element={<PondAtHome />} />
        <Route path="/CenterService" element={<CenterService />} />
        <Route path="/DoctorListHome" element={<DoctorListHome />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
