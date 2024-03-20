import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Overlay from "../../../components/Overlay/Overlay";
import { SearchResult } from "../../../components/Search/Search";
import { getDayOfTheWeek } from "../../../utils/getFilteredDishes";
import homecooks from "../../../data/homecooks";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import "./MealtimeFilter.css";

import breakfast from "../../../assets/breakfast.svg";
import lunch from "../../../assets/lunch.svg";
import dinner from "../../../assets/dinner.svg";

const MealtimeFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState({ breakfast: [], lunch: [], dinner: [] });
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dishInfo, setdishInfo] = useState({});
  const today = new Date();
  const navigate = useNavigate();
  const todaysDay = today.getDay();

  const getDayLabel = (dish) => {
    const todayIndex = getDayOfTheWeek(0);
    const tomorrowIndex = getDayOfTheWeek(1);

    if (dish.availability[0].day === todayIndex) {
      return 'Today';
    } else if (dish.availability[0].day === tomorrowIndex) {
      return 'Tomorrow';
    } else {
      return dish.availability[0].day;
    }
  }

  const getDayOffset = (day) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = daysOfWeek.indexOf(day);
    const offset = dayIndex - todaysDay;
    return offset >= 0 ? offset : offset + 7;
  };

  const sortDays = (resultsByDay) => {
     const sortedDays = Object.entries(resultsByDay).sort(([, dishesA], [, dishesB]) =>
          dishesA[0].availability[0].dayOffset - dishesB[0].availability[0].dayOffset
      );
     return Object.fromEntries(sortedDays);
  }

  const handleFilter = async (filter) => {
    setLoading(true);
    const resultsByDay = {};

     homecooks.forEach((homecook) => {
       homecook.dishes.forEach((dish) => {
         const dayLabel = getDayLabel(dish);
         if (!resultsByDay[dayLabel]) {
           resultsByDay[dayLabel] = [];
         }
        if (dish.availability[0].meal.toLowerCase() === filter) {
          resultsByDay[dayLabel].push({
           ...dish,
           homecookName: homecook.name,
           homecookRating: homecook.rating,
           homecookOrders: homecook.noOfOrders});
        }
       });
     });

   for (const day in resultsByDay) {
     resultsByDay[day] = resultsByDay[day].map(dish => {
       return {
         ...dish,
         availability: [
           { ...dish.availability[0], dayOffset: getDayOffset(dish.availability[0].day) }
         ]
       };
     });
   }

   const sortedResults = sortDays(resultsByDay);

    await new Promise((resolve) => setTimeout(resolve, 500));
    setResults((prev) => ({ ...prev, [filter]: sortedResults }));
    setLoading(false);
  };

  const toggleOverlay = async (overlayType) => {
     setSearchParams((prev) => {
       const isOpen = prev.get(overlayType) === "true";
       if (isOpen) {
         navigate(-1);
       } else {
         handleFilter(overlayType);
         prev.set(overlayType, "true");
       }
       return prev;
     });
   };

  useEffect(() => {
    searchParams.get('breakfast') && handleFilter('breakfast');
    searchParams.get('lunch') && handleFilter('lunch');
    searchParams.get('dinner') && handleFilter('dinner');
  }, []);

  return (
    <div className="mealtimeFilter-container">
      <div className="header-container">
        <h1 className="cardHeader">Quick Search</h1>
      </div>
      <div className="meal-by-time">
        <img src={breakfast} onClick={() => {toggleOverlay("breakfast")}} alt="breakfast-img" />
        <img src={lunch} onClick={() => {toggleOverlay("lunch")}} alt="lunch-img" />
        <img src={dinner} onClick={() => {toggleOverlay("dinner")}} alt="dinner-img" />
      </div>

      {searchParams.get('breakfast') && (
        <Overlay>
          <div className="profile-head" onClick={() => toggleOverlay('breakfast')}>
            <ArrowBackIosNewOutlinedIcon sx={{marginRight: '8px', fontSize: '18px'}}/>
            <p>Breakfast</p>
          </div>
          <SearchResult
            result={results.breakfast}
            loading={loading}
            dishInfo={dishInfo}
            setTotalItems={setTotalItems}
            setTotalPrice={setTotalPrice}
          />
        </Overlay>
      )}
      {searchParams.get('lunch') && (
        <Overlay>
          <div className="profile-head" onClick={() => toggleOverlay('lunch')}>
            <ArrowBackIosNewOutlinedIcon sx={{marginRight: '8px', fontSize: '18px'}}/>
            <p>Lunch</p>
          </div>
          <SearchResult
            result={results.lunch}
            loading={loading}
            dishInfo={dishInfo}
            setTotalItems={setTotalItems}
            setTotalPrice={setTotalPrice}
          />
        </Overlay>
      )}
      {searchParams.get('dinner') && (
        <Overlay>
          <div className="profile-head" onClick={() => toggleOverlay('dinner')}>
            <ArrowBackIosNewOutlinedIcon sx={{marginRight: '8px', fontSize: '18px'}}/>
            <p>Dinner</p>
          </div>
          <SearchResult
            result={results.dinner}
            loading={loading}
            dishInfo={dishInfo}
            setTotalItems={setTotalItems}
            setTotalPrice={setTotalPrice}
          />
        </Overlay>
      )}
    </div>
  )
}

export default MealtimeFilter;
