import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from "./pages/Home/index";
import Search from "./components/Search/Search";
import SellerPage from "./pages/SellerPage/index";
import Profile from "./pages/Profile/index";
import Checkout from "./pages/Checkout/index";
import OrderSuccessPage from "./pages/Checkout/OrderSuccessPage/OrderSuccessPage";
import Admin from "./pages/Admin/index";
import DataDeletion from "./components/DataDeletion/DataDeletion";
import AboutUs from './legal/AboutUs';
import ContactUs from './legal/ContactUs';
import FAQPage from './legal/FAQPage';
import TermsAndConditions from './legal/TermsAndConditions';
import PrivacyPolicy from './legal/PrivacyPolicy';
import CancellationRefundPolicy from './legal/CancellationRefundPolicy';
import ShippingDeliveryPolicy from './legal/ShippingDeliveryPolicy';
import PageNotFound from "./components/PageNotFound/PageNotFound";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Homepage />,
  },
  {
    path: "/search",
    element: <Search />
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
    path: "/order-success",
    element: <OrderSuccessPage />
  },
  {
    path:"/admin",
    element: <Admin />,
  },
  {
    path: "/data-deletion",
    element: <DataDeletion />
  },
  {
    path: "/about-us",
    element: <AboutUs />
  },
  {
    path: "/contact-us",
    element: <ContactUs />
  },
  {
    path: "/faq",
    element: <FAQPage />
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
