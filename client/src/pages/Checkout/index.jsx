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
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();
  const windowWidth = useWindowResize();

  useEffect(() => {
    let newTotalItems = 0;
    let newTotalPrice = 0;

    for (const [seller, sellerDishes] of Object.entries(dishesData)) {
      for (const [dishName, dish] of Object.entries(sellerDishes)) {
        newTotalItems += dish.qty;
        newTotalPrice += dish.qty * dish.price;
      }
    }

    for (const [seller, subsDetails] of Object.entries(subscriptionsData)) {
      newTotalItems += 1;
      newTotalPrice += subsDetails.subsPrice
    }

    setTotalItems(newTotalItems);
    setTotalPrice(newTotalPrice);
  }, [dishesData, subscriptionsData]);

  return (
    <>
      <Navbar showAddress="none" header="Secure Checkout" showNavbar = {windowWidth < 768 ? "none" : ""}/>
      {Object.keys(dishesData).length > 0 || Object.keys(subscriptionsData).length > 0 ? (
        <div className="checkout-container">
          <div className="checkout-div">
            <UserDetails
              totalPrice={totalPrice}
              totalItems={totalItems}
            />
            <OrderSummary
              dishes={dishesData}
              subscriptions={subscriptionsData}
              totalPrice={totalPrice}
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
