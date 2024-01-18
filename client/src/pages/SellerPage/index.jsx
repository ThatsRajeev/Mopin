import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useWindowResize from "../../hooks/useWindowResize";
import fetchCartInfo from "../../utils/fetchCartInfo";
import SellerDetailsSection from "./SellerDetailsSection/SellerDetailsSection";
import MealFilterContainer from "./MealFilterContainer/MealFilterContainer";
import CartContainer from "./CartContainer/CartContainer";
import MealSubscription from "./MealSubscription/MealSubscription";
import MeetTheMakers from "./MeetTheMakers/MeetTheMakers";
import homecooks from "../../data/homecooks";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function SellerPage() {
  const { sellerId } = useParams();
  const sellerDetails = homecooks.find(item => item.name === sellerId);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dishQty, setdishQty] = useState({});
  const windowWidth = useWindowResize();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    fetchCartInfo(cart, sellerDetails.name, setdishQty, setTotalItems, setTotalPrice);
  }, [sellerDetails.name]);

  return (
    <>
      <Navbar showNavbar = {windowWidth < 768 ? "none" : ""}/>
      <SellerDetailsSection
        sellerDetails={sellerDetails}
        showCheckboxes={showCheckboxes}
        setShowCheckboxes={setShowCheckboxes}
      />
      <MealFilterContainer
        sellerDetails={sellerDetails}
        dishQty={dishQty}
        setTotalItems={setTotalItems}
        setTotalPrice={setTotalPrice}
      />
      <CartContainer
        totalItems={totalItems}
        totalPrice={totalPrice}
      />
      <MealSubscription
        sellerDetails={sellerDetails}
        showCheckboxes={showCheckboxes}
        setShowCheckboxes={setShowCheckboxes}
      />
      <MeetTheMakers
        sellerDetails={sellerDetails}
      />
      <Footer />
    </>
  );
}

export default SellerPage;
