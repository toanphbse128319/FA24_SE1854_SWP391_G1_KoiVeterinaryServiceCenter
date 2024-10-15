import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Login from "./pages/Login";
import AboutUsPage from "./pages/AboutUsPage";
import Header from "./Components/Header";
import LoginContainer from "./Components/LoginContainer";
import SignUp from "./Components/SignUpContainer";
import TrackingBookingDetail from "./Components/TrackingBookingDetail";
import Back from './buttonComponents/BackButton';

// Layout component
const Layout = () => {
  return (
    <>
      <Header />
      <Back />
      <Outlet />
    </>
  );
};

// App component
// const App = () => {
//   return (
//     <Router>
//       <Layout />
//       <Routes>
//         <Route index element={<AboutUsPage />} />
//         <Route path="login" element={<LoginContainer />} />
//         <Route path="signup" element={<SignUp />} />
//         <Route path="booking" element={<TrackingBookingDetail />} />
//       </Routes>
//     </Router>
//   );
// };

const App = () => {
  return (
    <Router>
      <Layout />
      <Routes>
        <Route index element={<AboutUsPage />} />
        <Route path="login" element={<LoginContainer />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="booking" element={<TrackingBookingDetail />} />
      </Routes>
    </Router>
  );
};

export default App;