import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from "./pages/Home/index";
import SellerPage from "./pages/SellerPage/index";
import Profile from "./pages/Profile/index";
import Checkout from "./pages/Checkout/Checkout";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ContactUs from './legal/ContactUs';
import TermsAndConditions from './legal/TermsAndConditions';
import PrivacyPolicy from './legal/PrivacyPolicy';
import CancellationRefundPolicy from './legal/CancellationRefundPolicy';
import ShippingDeliveryPolicy from './legal/ShippingDeliveryPolicy';

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
    path: "/contact-us",
    element: <ContactUs />
  },
  {
    path: "/terms",
    element: <TermsAndConditions />
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />
  },
  {
    path: "/cancellation-refund",
    element: <CancellationRefundPolicy />
  },
  {
    path: "/shipping-delivery",
    element: <ShippingDeliveryPolicy />
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
