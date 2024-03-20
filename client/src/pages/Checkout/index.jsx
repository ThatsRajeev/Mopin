import React, { useState, useEffect, useMemo } from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useWindowResize from "../../hooks/useWindowResize";
import Navbar from "../../components/Navbar/Navbar";
import UserDetails from "./UserDetails/UserDetails";
import OrderSummary from "./OrderSummary/OrderSummary";
import { styled } from "@mui/system";

const CheckoutContainer = styled('div')({
  "@media (min-width: 769px)": {
    backgroundColor: "#D9D9D9",
    minHeight: "100vh",
  }
});

const CheckoutDiv = styled('div')({
  display: "flex",
  maxWidth: "1200px",
  margin: "0 auto",
});

const EmptyCart = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",

  "> p": {
    color: "rgba(0, 0, 0, 0.64)",
    margin: "8px 16px 24px",
  },

  "> button": {
    margin: 0,
  }
});

const EmptyCartImg = styled('div')({
  height: "256px",
  width: "350px",
  backgroundImage: "url(https://mopin-assets.s3.ap-south-1.amazonaws.com/base+images/woman-kitchen-cooks-from-organic-products-recycling-vegetables-natural-products_98982-525__1_-removebg-preview.avif)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
});

const Checkout = () => {
  const dishes = useSelector((state) => state.dishes);
  const dishesData = useMemo(() => dishes.bySeller || {}, [dishes.bySeller]);
  const subscriptions = useSelector((state) => state.subscriptions);
  const subscriptionsData = useMemo(
    () => subscriptions.bySeller || {},
    [subscriptions.bySeller]
  );
  const [costDetails, setCostDetails] = useState({});

  const navigate = useNavigate();
  const windowWidth = useWindowResize();

  useEffect(() => {
    let newTotalPrice = 0;

    for (const [seller, sellerDishes] of Object.entries(dishesData)) {
      for (const [dishName, dish] of Object.entries(sellerDishes)) {
        newTotalPrice += dish.qty * dish.price;
      }
    }

    for (const [seller, subsDetails] of Object.entries(subscriptionsData)) {
      newTotalPrice += subsDetails.subsPrice;
    }

    setCostDetails((prev) => ({
      totalPrice: newTotalPrice,
      packagingAndDelivery: Object.keys(dishesData).length > 0 ? 14 : 0,
      govtTaxes: Math.round(0.05 * newTotalPrice),
      platformFees: Object.keys(dishesData).length > 0 ? 3 : 0,
    }));
  }, [dishesData, subscriptionsData]);

  return (
    <>
      <Navbar
        showAddress="none"
        header="Secure Checkout"
        showNavbar={windowWidth < 768 ? "none" : ""}
      />
      {Object.keys(dishesData).length > 0 || Object.keys(subscriptionsData).length > 0 ? (
        <CheckoutContainer>
          <CheckoutDiv>
            <UserDetails
              dishes={dishesData}
              subscriptions={subscriptionsData}
              costDetails={costDetails}
            />
            <OrderSummary
              dishes={dishesData}
              subscriptions={subscriptionsData}
              costDetails={costDetails}
            />
          </CheckoutDiv>
        </CheckoutContainer>
      ) : (
        <EmptyCart>
          <EmptyCartImg />
          <h3>Your cart is empty</h3>
          <p>You can go back back to homepage to view homechefs</p>
          <Button variant="contained" size="large" onClick={() => navigate("/")}>
            Explore Food
          </Button>
        </EmptyCart>
      )}
    </>
  );
};

export default Checkout;
