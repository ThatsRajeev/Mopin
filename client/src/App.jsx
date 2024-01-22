import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from "./pages/Home/index";
import SellerPage from "./pages/SellerPage/index";
import Profile from "./pages/Profile/index";
import Checkout from "./pages/Checkout/Checkout";
import PageNotFound from "./components/PageNotFound/PageNotFound";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Homepage />,
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
  },
  {
    path: "*",
    element: <PageNotFound />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
