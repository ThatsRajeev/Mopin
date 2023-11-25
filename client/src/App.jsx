import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from "./pages/Home/index";
import ErrorPage from "./components/ErrorPage";
import SellerPage from "./pages/SellerPage/SellerPage";
import Profile from "./pages/Profile/Profile";
import Checkout from "./pages/Checkout/Checkout";

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
