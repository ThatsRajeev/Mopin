import React, { useState, useEffect } from "react";
import homecooks from "../../../data/homecooks";
import "./MealtimeFilter.css";

import breakfast from "../../../assets/breakfast.svg";
import lunch from "../../../assets/lunch.svg";
import dinner from "../../../assets/dinner.svg";

const MealtimeFilter = () => {
  const [filter, setFilter] = useState("");
  const [filterResults, setFilterResults] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleFilter = async () => {
      setLoading(true);
      const results = homecooks.reduce((acc, homecook) => {
        const filteredDishes = homecook.dishes.filter((dish) =>
          dish.availability[0].meal === filter
        );

        if (filteredDishes.length > 0) {
          acc.push({
            homecookName: homecook.name,
            homecookRating: homecook.rating,
            homecookOrders: homecook.noOfOrders,
            matchingDishes: filteredDishes,
          });
        }

        return acc;
      }, []);

      await new Promise((resolve) => setTimeout(resolve, 500));
      setFilterResults(results);
      console.log(results);
      setLoading(false);
    };

    if(filter) {
      handleFilter();
    }
  }, [filter]);

  return (
    <div>
      <div className="header-container">
        <h1 className="cardHeader">Quick Search</h1>
      </div>
      <div className="meal-by-time">
        <img src={breakfast} onClick={() => {setFilter("Breakfast")}} alt="breakfast-img" />
        <img src={lunch} onClick={() => {setFilter("Lunch")}} alt="lunch-img" />
        <img src={dinner} onClick={() => {setFilter("Dinner")}} alt="dinner-img" />
      </div>
    </div>

  )
}

export default MealtimeFilter;
