import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from "./Homepage";
import ErrorPage from "./error-page";
import SellerPage from "./SellerPage";
import Profile from "./Profile";
import Checkout from "./Checkout";
import Help from "./Help";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Homepage />,
    errorElement: <ErrorPage />
  },
  {
    path: "sellers/:sellerId",
    element: <SellerPage />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/checkout",
    element: <Checkout />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
