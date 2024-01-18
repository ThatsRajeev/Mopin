import React from "react";
import { Link } from "react-router-dom";
import "./CartContainer.css";

const CartContainer = ({ totalItems, totalPrice }) => {
  return (
    <>
      {totalItems > 0 && (
        <div className="cart-container">
          <div className="itemsAndPrice">
            <h4>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </h4>
            <span>|</span>
            <h4>₹{totalPrice}</h4>
          </div>
          <button className="toCheckout">
            <Link className="custom-link" to="/checkout">
              <div className="continue-div">CONTINUE</div>
            </Link>
          </button>
        </div>
      )}
    </>
  );
};

export default CartContainer;
