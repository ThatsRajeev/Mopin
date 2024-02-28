import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDish, updateDish } from "../../../store/dishesSlice";
import { addSubscription, removeSubscription } from "../../../store/subscriptionsSlice";
import homecooks from "../../../data/homecooks";
import { useNavigate } from "react-router-dom";
import { getDayOfTheWeek } from "../../../utils/getFilteredDishes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./OrderSummary.css"

const OrderSummary = ({ dishes, subscriptions, costDetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleIncrement = (event, dish, seller) => {
    const counterValue = event.target.previousElementSibling;
    counterValue.textContent = parseInt(counterValue.textContent) + 1;
    dispatch(updateDish({ sellerName: seller, dishName: dish.name, qtyChange: 1 }));
  };

  const handleDecrement = (event, dish, seller) => {
    const counterValue = event.target.nextElementSibling;
    const newValue = parseInt(counterValue.textContent) - 1;
    counterValue.textContent = newValue;
    dispatch(updateDish({ sellerName: seller, dishName: dish.name, qtyChange: -1 }));
  };

  const handleSubscription = (event, subsDetails, seller) => {
    const originalDetails = subscriptions[seller];
    const sellerDetails = homecooks.find(item => item.name === seller);

    let newDetails;
    if (event.target && event.target.type === 'checkbox') {
      newDetails = {
        ...originalDetails,
        selectedMeals: event.target.checked ?
                       [...originalDetails.selectedMeals, event.target.value] :
                       originalDetails.selectedMeals.filter(m => m !== event.target.value)
      };
    } else if (event.target && event.target.type === 'select-one') {
      const selectedIndex = event.target.selectedIndex;
      newDetails = { ...originalDetails, subsDays: event.target.value }
    } else {
      newDetails = { ...originalDetails, startDate: event.getTime() }
    }

    let totalCost = 0;
    const calculateTotalCost = () => {
      if (newDetails.selectedMeals.includes('Breakfast')) {
        totalCost += parseInt(sellerDetails.subscriptionCost)*0.25;
      } if(newDetails.selectedMeals.includes('Lunch')) {
        totalCost += parseInt(sellerDetails.subscriptionCost)*0.4
      } if(newDetails.selectedMeals.includes('Dinner')) {
        totalCost += parseInt(sellerDetails.subscriptionCost)*0.35
      }
      totalCost *= newDetails.subsDays/28;
      newDetails.subsPrice = parseInt(totalCost);
    };
    calculateTotalCost();
    if(newDetails.selectedMeals.length > 0) {
      dispatch(addSubscription({ sellerName: seller, subscriptionDetails: newDetails }));
    }
  };

  return (
    <div className="order-summary">
      <div className="cart-div">
        <span className="material-symbols-outlined" onClick={() => navigate(-1)}>arrow_back_ios</span>
        Cart
      </div>

      {Object.entries(subscriptions).map(([seller, subsDetails], index) => (
        <div key={index} className={`seller-section subs-section ${index === 0 ? 'first-seller' : ''}`}>
          <h1>{seller}</h1>
          <button className="remove-subs" onClick={() => {dispatch(removeSubscription({ sellerName: seller }))}}>
            <span className="material-symbols-outlined">delete</span>
          </button>

          <h4 className="subs-head subs-head-first-child">Meals:</h4>
          <div className="subs-details">
            {["Breakfast", "Lunch", "Dinner"].map((meal, mealIndex) => (
              <div key={mealIndex} className="mealbox-container">
              <div className="checkbox-wrapper-12">
                <div className="cbx">
                  <input
                    id="cbx-12"
                    type="checkbox"
                    value={meal}
                    checked={subsDetails.selectedMeals.includes(meal)}
                    onChange={(e) => handleSubscription(e, subsDetails, seller)}
                  />
                  <label htmlFor="cbx-12"></label>
                  <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                    <path d="M2 8.36364L6.23077 12L13 2"></path>
                  </svg>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <defs>
                    <filter id="goo-12">
                      <fegaussianblur in="SourceGraphic" stdDeviation="4" result="blur"></fegaussianblur>
                      <fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></fecolormatrix>
                      <feblend in="SourceGraphic" in2="goo-12"></feblend>
                    </filter>
                  </defs>
                </svg>
              </div>
              <h2 key={mealIndex}>{meal}</h2>
            </div>
            ))}
          </div>

          <h4 className="subs-head">Delivery Slots:</h4>
          <div className="subs-details">
            <h2>9-10 AM</h2>
            <h2>1-2 PM</h2>
            <h2>8-9 PM</h2>
          </div>
          <div className="subs-details">
            <div>
              <h4 className="subs-head">Start Date:</h4>
              <div className="subs-details date-div">
                <DatePicker
                  showIcon selected={new Date(subsDetails.startDate)}
                  onChange={(date) => handleSubscription(date, subsDetails, seller)}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
                  popperPlacement="bottom-end"
                  className="datepicker"
                />
              </div>
            </div>
            <div>
            <h4 className="subs-head">Duration:</h4>
              <div className="subs-details">
                <div className="date-group">
                  <select className="date-select" value={subsDetails.subsDays} onChange={(e) => handleSubscription(e, subsDetails, seller)} required>
                    <option value="" disabled>
                      Days
                    </option>
                    {[28, 21, 14, 7].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <h4 className="subs-head">Total Cost:</h4>
          <div className="subs-details">
            <h4>₹{subsDetails.subsPrice}<small>&nbsp;(excluding taxes)</small></h4>
          </div>
        </div>
      ))}

      {Object.entries(dishes).map(([seller, sellerDishes], index) => (
        <div key={index} className={`seller-section ${index === 0 && Object.keys(subscriptions).length === 0 ? 'first-seller' : ''}`}>
          <h1>{seller}</h1>

          {Object.entries(sellerDishes).map(([dishName, dish]) => (
            <div key={dishName} className="ready-checkout mealInfo-div">
              <div className="checkout-dishinfo">
                <div className="svg-container checkout-svg">
                  <div className="veg-nonveg-svg">
                    <svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {dish.isVeg ?
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
                  <div className="checkout-dishname">{dish.name}</div>
                </div>
                <h3>₹{dish.price}</h3>
              </div>
              <div className="checkout-dishinfo mealtime-info">
                <p>
                  {dish.availability[0].meal}&nbsp;
                  ({dish.availability[0].meal === 'Breakfast' ? '9-10 AM' : dish.availability[0].meal === 'Lunch' ? '1-2 PM' : '8-9 PM'})
                </p>
                <p>
                  {dish.availability[0].day === getDayOfTheWeek(0) ? 'Today' : dish.availability[0].day === getDayOfTheWeek(1) ? 'Tommorrow' : dish.availability[0].day}
                </p>
              </div>
              <div className="checkout-dishinfo">
                <p>{dish.description}</p>
                <div className="counter checkout-counter">
                  <button className="counter-button" onClick={(e) => handleDecrement(e, dish, seller)}>-</button>
                  <span className="counter-value">{dish.qty}</span>
                  <button className="counter-button" onClick={(e) => handleIncrement(e, dish, seller)} > +</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="ready-checkout coupon-div">
        <h4>Apply Coupon</h4>
        <div>
          <p>Explore available offers</p>
          <span className="material-symbols-outlined">chevron_right</span>
        </div>
      </div>
      <div className="ready-checkout">
        <h4>Bill Details</h4>
        <div className="price-details">
          <p>Item Total</p>
          <p>₹{costDetails.totalPrice}</p>
        </div>
        <div className="price-details">
          <p>Packaging & Delivery</p>
          <p>₹{costDetails.packagingAndDelivery}</p>
        </div>
        <div className="price-details">
          <p>Govt Taxes (5%)</p>
          <p>₹{costDetails.govtTaxes}</p>
        </div>
        <div className="price-details">
          <p>Platform Fees</p>
          <p>₹{costDetails.platformFees}</p>
        </div>
        <div className="sum-total-line"></div>
        <div className="checkout-dishinfo">
          <h4>To Pay</h4>
          <h4>₹{costDetails.totalPrice + costDetails.packagingAndDelivery + costDetails.govtTaxes + costDetails.platformFees}</h4>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary;
