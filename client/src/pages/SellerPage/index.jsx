import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import useWindowResize from "../../hooks/useWindowResize";
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
  const dishes = useSelector((state) => state.dishes);
  const dishesData = useMemo(() => dishes.bySeller[sellerDetails.name] || {},
                                  [dishes.bySeller[sellerDetails.name]])
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const windowWidth = useWindowResize();

  useEffect(() => {
    let newTotalItems = 0;
    let newTotalPrice = 0;

    for (const dishName in dishesData) {
      const dish = dishesData[dishName];
      newTotalItems += dish.qty;
      newTotalPrice += dish.qty * dish.price;
    }

    setTotalItems(newTotalItems);
    setTotalPrice(newTotalPrice);
  }, [dishesData]);

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
