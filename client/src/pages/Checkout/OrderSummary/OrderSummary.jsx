import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFullCartInfo } from "../../../utils/fetchCartInfo";
import handleCart from "../../../utils/handleCart";
import "./OrderSummary.css"

const OrderSummary = ({ dishInfo, setdishInfo }) => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    fetchFullCartInfo(cart, setdishInfo, setTotalItems, setTotalPrice);
  }, []);

  const updateCartAndTotal = (newValue, dish, seller) => {
    handleCart(
      seller.sellerName,
      dish.dishName,
      dish.dishPrice,
      dish.dishDesc,
      dish.dishIsVeg,
      newValue
    );

    setTotalItems(prev => prev + (newValue > 0 ? 1 : -1));
    setTotalPrice(prev => prev + (newValue > 0 ? parseInt(dish.dishPrice) : -parseInt(dish.dishPrice)));
  };

  const handleIncrement = (event, dish, seller) => {
    const counterValue = event.target.previousElementSibling;
    counterValue.textContent = parseInt(counterValue.textContent) + 1;
    updateCartAndTotal(parseInt(counterValue.textContent), dish, seller);
  };

  const handleDecrement = (event, dish, seller) => {
    const counterValue = event.target.nextElementSibling;
    const newValue = parseInt(counterValue.textContent) - 1;

    if (newValue >= 0) {
      updateCartAndTotal(newValue, dish, seller);

      if (newValue === 0) {
        setdishInfo((prevDishInfo) => {
          const updatedDishInfo = [...prevDishInfo];
          const sellerIndex = updatedDishInfo.findIndex((sell) => sell.sellerName === seller.sellerName);

          if (sellerIndex !== -1) {
            const dishIndex = updatedDishInfo[sellerIndex].dishes.findIndex(
              currentDish => currentDish.dishName === dish.dishName
            );

            if (dishIndex !== -1) {
              updatedDishInfo[sellerIndex].dishes.splice(dishIndex, 1);
            }

            if (updatedDishInfo[sellerIndex].dishes.length === 0 && updatedDishInfo[sellerIndex].subs.length === 0) {
              return updatedDishInfo.filter(sellerInfo => sellerInfo.sellerName !== seller.sellerName);
            }
          }

          return updatedDishInfo;
        });
      } else {
        counterValue.textContent = newValue;
      }
    }
  };

  const removeSubs = (seller) => {
    let existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingSellerIndex = existingCart.findIndex(group => group.sellerName === seller.sellerName);

    if (existingSellerIndex !== -1) {
      if (seller.dishes.length === 0) {
        existingCart.splice(existingSellerIndex, 1);

        localStorage.setItem('cart', JSON.stringify(existingCart));

        setdishInfo((prevDishInfo) => {
          const updatedDishInfo = prevDishInfo.filter(sellerInfo => sellerInfo.sellerName !== seller.sellerName);
          return updatedDishInfo;
        });
      } else {
        existingCart[existingSellerIndex].subs = [];

        localStorage.setItem('cart', JSON.stringify(existingCart));

        setdishInfo((prevDishInfo) => {
          const updatedDishInfo = prevDishInfo.map(sellerInfo => {
            if (sellerInfo.sellerName === seller.sellerName) {
              sellerInfo.subs = [];
            }
            return sellerInfo;
          });
          return updatedDishInfo;
        });
      }
    }
  }

  return (
    <div className="order-summary">
      <div className="cart-div mob-view">
        <span className="material-symbols-outlined" onClick={() => navigate(-1)}>arrow_back_ios</span>
        Cart
      </div>
      {Array.isArray(dishInfo) && dishInfo.map((seller, index) => (
        (seller.dishes.length > 0 || seller.subs.length > 0) && (
          <div key={index} className={`seller-section ${index === 0 ? 'first-seller' : ''}`}>
            <h2>{seller.sellerName}</h2>
            {Array.isArray(seller.subs) && seller.subs.map((subs, subsIndex) => (
              <div className="subs-section" key={subsIndex}>
                <h4>{subs.subsDays} days subscription</h4>
                <div className="subs-details">
                  {subs.selectedMeals.map((meal, mealIndex) => (
                    <h2 key={mealIndex}>{meal}</h2>
                  ))}
                </div>
                <div className="subs-details">
                  <button onClick={() => removeSubs(seller)}>Remove</button>
                  <h4>₹{subs.subsPrice}</h4>
                </div>
              </div>
            ))}
            {Array.isArray(seller.dishes) && seller.dishes.map((dish, dishIndex) => (
              <div key={dishIndex} className="ready-checkout">
                <div className="checkout-dishinfo">
                  <div className="svg-container checkout-svg">
                    <div className="veg-nonveg-svg">
                      <svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {dish.dishIsVeg ?
                        <>
                          <path d="M2 0.5H8C8.82843 0.5 9.5 1.17157 9.5 2V8C9.5 8.82843 8.82843 9.5 8 9.5H2C1.17157 9.5 0.5 8.82843 0.5 8V2C0.5 1.17157 1.17157 0.5 2 0.5Z" fill="white" stroke="#43B500"></path>
                          <circle cx="5" cy="5" r="2" fill="#43B500"></circle>
                        </> :
                        <>
                          <path d="M2 0.5H8C8.82843 0.5 9.5 1.17157 9.5 2V8C9.5 8.82843 8.82843 9.5 8 9.5H2C1.17157 9.5 0.5 8.82843 0.5 8V2C0.5 1.17157 1.17157 0.5 2 0.5Z" fill="white" stroke="#a5292a"></path>
                          <path d="M4.74019 2.825C4.85566 2.625 5.14434 2.625 5.25981 2.825L7.33827 6.425C7.45374 6.625 7.3094 6.875 7.07846 6.875H2.92154C2.6906 6.875 2.54626 6.625 2.66173 6.425L4.74019 2.825Z" fill="#a5292a"></path>
                        </>}
                      </svg>
                    </div>
                    <div className="checkout-dishname">{dish.dishName}</div>
                  </div>
                  <h3>₹{dish.dishPrice}</h3>
                </div>
                <div className="checkout-dishinfo">
                  <p>{dish.dishDesc}</p>
                  <div className="counter checkout-counter">
                    <button className="counter-button" onClick={(e) => handleDecrement(e, dish, seller)}>-</button>
                    <span className="counter-value">{dish.dishQty}</span>
                    <button className="counter-button" onClick={(e) => handleIncrement(e, dish, seller)} > +</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ))}

      <div className="ready-checkout coupon-div">
        <h4>APPLY COUPON</h4>
        <div>
          <p>Explore available offers</p>
          <span className="material-symbols-outlined">chevron_right</span>
        </div>
      </div>
      <div className="ready-checkout">
        <h4>Bill Details</h4>
        <div className="price-details">
          <p>Item Total</p>
          <p>₹{totalPrice}</p>
        </div>
        <div className="price-details">
          <p>Packaging & Delivery</p>
          <p>₹7</p>
        </div>
        <div className="price-details">
          <p>Govt Taxes</p>
          <p>₹4</p>
        </div>
        <div className="sum-total-line"></div>
        <div className="checkout-dishinfo">
          <h4>To Pay</h4>
          <h4>₹{totalPrice+7+4}</h4>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary;
