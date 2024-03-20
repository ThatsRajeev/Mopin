import React from "react";
import { Button } from '@mui/material';
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
          <Button variant="contained">
            <Link className="custom-link" to="/checkout">
              CONTINUE
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default CartContainer;
