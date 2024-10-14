import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
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

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <AboutUsPage /> },
      { path: "login", element: <LoginContainer /> },
      { path: "signup", element: <SignUp /> },
      { path: "booking", element: <TrackingBookingDetail /> },
    ],
  },
]);

// App component
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;