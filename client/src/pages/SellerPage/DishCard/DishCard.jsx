import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDish, updateDish } from "../../../store/dishesSlice";
import "./DishCard.css";

const DishCard = ({ sellerName, dishItem }) => {
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.dishes);
  const dishData = useMemo(() => dishes.bySeller[sellerName]?.[dishItem.name] || {},
                                 [dishes.bySeller[sellerName]])
  const quantityGreaterThanZero = dishData?.qty > 0;

  const handleButtonClick = (event, dish, qty) => {
    const button = event.target;
    const counter = button.nextElementSibling;
    button.classList.add('hidden');

    dispatch(addDish({ sellerName, dish }));

    setTimeout(() => {
      button.style.display = 'none';
      counter.style.display = 'flex';
      counter.classList.remove('hidden');
    }, 300);
  };

  const handleIncrement = (event, dish) => {
    const counterValue = event.target.previousElementSibling;
    counterValue.textContent = parseInt(counterValue.textContent) + 1;

    dispatch(updateDish({ sellerName, dishName: dish.name, qtyChange: 1 }));
  };

  const handleDecrement = (event, dish) => {
    const counterValue = event.target.nextElementSibling;
    const newValue = parseInt(counterValue.textContent) - 1;

    dispatch(updateDish({ sellerName, dishName: dish.name, qtyChange: -1 }));

    if(newValue === 0) {
      const counter = event.target.parentElement;
      const addButton = counter.previousElementSibling;
      counter.classList.add('hidden');
      setTimeout(() => {
        addButton.style.display = 'flex';
        counter.style.display = 'none';
        addButton.classList.remove('hidden');
      }, 300);
    } else {
      counterValue.textContent = newValue;
    }
  };

  return (
    <div>
      <h3 className="meal-time">{dishItem.availability[0].meal}</h3>
      <div className="seller-food-container">
        <div className="food-details">
          <div className="svg-container">
            <div className="veg-nonveg-svg">
              <svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                {dishItem.isVeg ? (
                  <>
                    <path d="M2 0.5H8C8.82843 0.5 9.5 1.17157 9.5 2V8C9.5 8.82843 8.82843 9.5 8 9.5H2C1.17157 9.5 0.5 8.82843 0.5 8V2C0.5 1.17157 1.17157 0.5 2 0.5Z" fill="white" stroke="#43B500"></path>
                    <circle cx="5" cy="5" r="2" fill="#43B500"></circle>
                  </>
                ) : (
                  <>
                    <path d="M2 0.5H8C8.82843 0.5 9.5 1.17157 9.5 2V8C9.5 8.82843 8.82843 9.5 8 9.5H2C1.17157 9.5 0.5 8.82843 0.5 8V2C0.5 1.17157 1.17157 0.5 2 0.5Z" fill="white" stroke="#a5292a"></path>
                    <path d="M4.74019 2.825C4.85566 2.625 5.14434 2.625 5.25981 2.825L7.33827 6.425C7.45374 6.625 7.3094 6.875 7.07846 6.875H2.92154C2.6906 6.875 2.54626 6.625 2.66173 6.425L4.74019 2.825Z" fill="#a5292a"></path>
                  </>
                )}
              </svg>
            </div>
            {dishItem.name}
          </div>
          <p>{dishItem.description}</p>
          <h3>₹{dishItem.price}</h3>
        </div>
        <img className="food-card-img" src={dishItem.imgURL} alt="food-img" />
      </div>
      <div className="button-container">
        <button className={`add-btn ${quantityGreaterThanZero ? 'hidden' : ""}`} onClick={(e) => handleButtonClick(e, dishItem, 1)}> Add</button>
        <div className={`counter ${quantityGreaterThanZero ? "" : 'hidden'}`}>
          <button className="counter-button" onClick={(e) => handleDecrement(e, dishItem)}>-</button>
          <span className="counter-value">{quantityGreaterThanZero ? dishData.qty : 1}</span>
          <button className="counter-button" onClick={(e) => handleIncrement(e, dishItem)}> +</button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
