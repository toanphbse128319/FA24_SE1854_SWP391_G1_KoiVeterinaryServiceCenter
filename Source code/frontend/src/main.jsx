import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import TrackingBookingDetail from  "./Components/TrackingBookingDetail"
import Docter from "./Components/Doctor'sSummaryInformation";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Docter />,
  },
  {
    path: "/booking",
    element: <TrackingBookingDetail />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);