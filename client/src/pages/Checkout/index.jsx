import react, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useWindowResize from "../../hooks/useWindowResize";
import Navbar from "../../components/Navbar/Navbar";
import UserDetails from "./UserDetails/UserDetails";
import OrderSummary from "./OrderSummary/OrderSummary";

const Checkout = () => {
  const dishes = useSelector((state) => state.dishes);
  const dishesData = useMemo(() => dishes.bySeller || {},
                                  [dishes.bySeller])
  const subscriptions = useSelector((state) => state.subscriptions);
  const subscriptionsData = useMemo(() => subscriptions.bySeller || {},
                                         [subscriptions.bySeller])
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
      newTotalPrice += subsDetails.subsPrice
    }

    setCostDetails((prev) => ({
      totalPrice: newTotalPrice,
      packagingAndDelivery: Object.keys(dishesData).length > 0 ? 14 : 0,
      govtTaxes: Math.round(0.05* newTotalPrice),
      platformFees: Object.keys(dishesData).length > 0 ? 3 : 0
    }));
  }, [dishesData, subscriptionsData]);

  return (
    <>
      <Navbar showAddress="none" header="Secure Checkout" showNavbar = {windowWidth < 768 ? "none" : ""}/>
      {Object.keys(dishesData).length > 0 || Object.keys(subscriptionsData).length > 0 ? (
        <div className="checkout-container">
          <div className="checkout-div">
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
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <div className="empty-cart-img"></div>
          <h3>Your cart is empty</h3>
          <p>You can go back back to homepage to view homechefs</p>
          <button className="explore-btn" onClick={() => navigate("/")}>Explore Food</button>
        </div>
      )}
    </>
  )
}

export default Checkout;
