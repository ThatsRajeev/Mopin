import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import homecooks from "../../../data/homecooks";
import "./MealSubscription.css";

const MealSubscription = ({ sellerDetails, showCheckboxes, setShowCheckboxes }) => {
  const [selectedMeals, setSelectedMeals] = useState(["Breakfast", "Lunch", "Dinner"]);
  const [subsDays, setSubsDays] = useState("");
  const [subsPrice, setSubsPrice] = useState(0);
  const daysOptions = [28, 21, 14, 7];

  const handleCheckboxChange = (meal) => {
    const updatedMeals = selectedMeals.includes(meal)
      ? selectedMeals.filter((selectedMeal) => selectedMeal !== meal)
      : [...selectedMeals, meal];

    setSelectedMeals(updatedMeals);
  };

  useEffect(() => {
    let totalCost = 0;
    const calculateTotalCost = () => {

      homecooks[0].dishes.forEach((dish) => {
        if (selectedMeals.includes(dish.availability[0].meal)) {
          totalCost += parseInt(dish.price);
        }
      });

      totalCost *= parseInt(subsDays/7);
      setSubsPrice(totalCost);
    };

    calculateTotalCost();

    const subsDetails = {
      selectedMeals: selectedMeals,
      subsDays: subsDays,
      subsPrice: totalCost
    };

    let existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingSellerIndex = existingCart.findIndex(item => item.sellerName === sellerDetails.name);

    if (existingSellerIndex !== -1) {
      existingCart[existingSellerIndex].subs = [subsDetails];

    } else {
      existingCart.push({
        sellerName: sellerDetails.name,
        subs: [subsDetails]
      });
    }

    if(subsDetails.subsPrice) {
      localStorage.setItem('cart', JSON.stringify(existingCart));
    }
  }, [selectedMeals, subsDays]);

  return (
    <>
      {showCheckboxes && (
        <div className="checkbox-container">
          <div className="checkbox-div">
            {["Breakfast", "Lunch", "Dinner"].map((meal) => (
              <label key={meal}>
                <input
                  type="checkbox"
                  value={meal}
                  checked={selectedMeals.includes(meal)}
                  onChange={() => handleCheckboxChange(meal)}
                />
                {meal}
              </label>
            ))}
          </div>
          <div className="pay-div">
            <div className="form-group">
              <select className="form-control" value={subsDays} onChange={(e) => setSubsDays(e.target.value)} required>
                <option value="" disabled>
                  Days
                </option>
                {daysOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button to="/checkout" disabled={!subsDays || selectedMeals.length===0}>
              <Link className="custom-link" to="/checkout">
                <div className="subsPay">
                  To Pay (₹{subsPrice})
                </div>
              </Link>
            </button>
          </div>
        </div>
      )}
      {showCheckboxes &&
        <div className="backgroundOverlay" onClick={() => setShowCheckboxes(!showCheckboxes)}></div>
      }
    </>
  )
}

export default MealSubscription;
