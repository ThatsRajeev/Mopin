import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSubscription, removeSubscription } from "../../../store/subscriptionsSlice";
import { Link } from "react-router-dom";
import "./MealSubscription.css";

const MealSubscription = ({ sellerDetails, showCheckboxes, setShowCheckboxes }) => {
  const [selectedMeals, setSelectedMeals] = useState(["Breakfast", "Lunch", "Dinner"]);
  const [subsDays, setSubsDays] = useState("");
  const [subsPrice, setSubsPrice] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
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

      if (selectedMeals.includes('Breakfast')) {
        totalCost += parseInt(sellerDetails.subscriptionCost)*0.25;
      } if(selectedMeals.includes('Lunch')) {
        totalCost += parseInt(sellerDetails.subscriptionCost)*0.4
      } if(selectedMeals.includes('Dinner')) {
        totalCost += parseInt(sellerDetails.subscriptionCost)*0.35
      }

      totalCost *= subsDays/28;
      setSubsPrice(parseInt(totalCost));
    };
    calculateTotalCost();

    const subscriptionDetails = {
      selectedMeals: selectedMeals,
      subsDays: subsDays,
      startDate: startDate.getTime(),
      subsPrice: totalCost,
    };

    if(totalCost>0) {
      dispatch(addSubscription({ sellerName: sellerDetails.name, subscriptionDetails }));
    }
  }, [selectedMeals, subsDays]);

  return (
    <>
      {showCheckboxes && (
        <div className="checkbox-container">
          <div className="checkbox-div">
            {["Breakfast", "Lunch", "Dinner"].map((meal, mealIndex) => (
              <div className="mealbox-container">
              <div className="checkbox-wrapper-12">
                <div className="cbx">
                  <input
                    id={`cbx-${mealIndex}`}
                    type="checkbox"
                    value={meal}
                    checked={selectedMeals.includes(meal)}
                    onChange={() => handleCheckboxChange(meal)}
                  />
                  <label htmlFor={`cbx-${mealIndex}`}></label>
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
          <div className="pay-div">
            <div className="form-group">
              <select className="form-control date-select" value={subsDays} onChange={(e) => setSubsDays(e.target.value)} required>
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
            <button disabled={!subsDays || selectedMeals.length===0}>
              <Link className="custom-link" to="/checkout" disabled={!subsDays || selectedMeals.length===0}>
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
