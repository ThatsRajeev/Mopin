import React from "react";
import DishCard from "../DishCard/DishCard"
import "./DayDishes.css";

function DayDishes ({ day, dishes, dishQty, handleButtonClick, handleIncrement, handleDecrement, activeCategory, spyRef, getDayOfTheWeek }) {
  return (
    <div key={day}>
      {dishes.length > 0 && (
        <>
          <h2 id={day} data-category={day} ref ={activeCategory === day ? spyRef: null} className="weekday">
            {day === getDayOfTheWeek(0) ? 'Today' : day === getDayOfTheWeek(1) ? 'Tommorrow' : day}
          </h2>
          <div className="food-cards-container">
            {dishes.map((dishItem, dishIndex) => (
              <DishCard
                key={dishIndex}
                dishItem={dishItem}
                dishQty={dishQty}
                handleButtonClick={handleButtonClick}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default DayDishes;
