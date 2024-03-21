import React, { useState, useMemo, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDish, updateDish } from "../../../store/dishesSlice";
import "./DishCard.css";

const DishCard = ({ sellerName, dishItem }) => {
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.dishes);
  const dishData = useMemo(() => dishes.bySeller[sellerName]?.[dishItem.name] || {}, [dishes.bySeller[sellerName]]);
  const [isCounterVisible, setIsCounterVisible] = useState(dishData?.qty > 0);
  const counterRef = useRef(null);
  const addRef = useRef(null);

  useEffect(() => {
    setIsCounterVisible(dishData?.qty > 0);
  }, [dishes.bySeller[sellerName]]);

  useEffect(() => {
    if (isCounterVisible) {
      addRef.current.classList.add('hidden');
      counterRef.current.classList.add('active');
    } else {
      addRef.current.classList.remove('hidden');
      counterRef.current.classList.remove('active');
    }
  }, [isCounterVisible]);

  const handleButtonClick = (event, dish) => {
    console.log(dish);
    dispatch(addDish({ sellerName, dish }));
  };

  const handleIncrement = (event, dish) => {
    dispatch(updateDish({ sellerName, dishName: dish.name, qtyChange: 1 }));
  };

  const handleDecrement = (event, dish) => {
    dispatch(updateDish({ sellerName, dishName: dish.name, qtyChange: -1 }));
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
        <button className={`add-btn ${isCounterVisible ? 'hidden' : 'active'}`} ref={addRef} onClick={(e) => handleButtonClick(e, dishItem)}>Add</button>
        <div className={`counter ${isCounterVisible ? 'active' : 'hidden'}`} ref={counterRef}>
          <button className="counter-button" onClick={(e) => handleDecrement(e, dishItem)}>-</button>
          <span className="counter-value">{isCounterVisible ? dishData.qty : 1}</span>
          <button className="counter-button" onClick={(e) => handleIncrement(e, dishItem)}>+</button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
