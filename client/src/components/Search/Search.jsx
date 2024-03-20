import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Skeleton from '@mui/material/Skeleton';
import Navbar from "../Navbar/Navbar";
import DishCard from "../../pages/SellerPage/DishCard/DishCard";
import CartContainer from "../../pages/SellerPage/CartContainer/CartContainer";
import { getDayOfTheWeek } from "../../utils/getFilteredDishes";
import homecooks from "../../data/homecooks";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import "./Search.css";

export const SearchResult = ({ result, loading }) => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const dishes = useSelector((state) => state.dishes);
  const dishesData = useMemo(() => dishes.bySeller || {},
                                  [dishes.bySeller])
  useEffect(() => {
    let newTotalItems = 0;
    let newTotalPrice = 0;

    for (const [seller, sellerDishes] of Object.entries(dishesData)) {
      for (const [dishName, dish] of Object.entries(sellerDishes)) {
        newTotalItems += dish.qty;
        newTotalPrice += dish.qty * dish.price;
      }
    }

    setTotalItems(newTotalItems);
    setTotalPrice(newTotalPrice);
  }, [dishesData]);

  return (
    <>
      {loading ? (
        <div className="skeleton">
          {Array(6).fill().map((item, index) => (
            <div key={index} className="skeleton-item">
              <Skeleton variant="text" width={`52%`} height={24} />
              <Skeleton variant="text" width={`68%`} height={24} />
              <Skeleton variant="rectangular" width={`86%`} height={100} />
            </div>
            ))}
        </div>
      ) : (
        Object.keys(result).length > 0 && (
          <div className="search-results">
            {Object.entries(result).map(([dayLabel, dishesForDay]) => (
              <React.Fragment key={dayLabel}>
                <div className="day-label-div"><h1>{dayLabel}</h1></div>
                {dishesForDay.map((dish, dishIndex) => (
                  <div key={dishIndex} className="result-item">
                    <div className="homecook-info">
                      <div>
                        <h3>From {dish.homecookName}</h3>
                        <div className="sub-info-mobile">
                          <div className="rating-svg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="#349E46" style={{width: '0.96rem'}}>
                              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                            </svg>
                            <span>{dish.homecookRating}</span>
                          </div>
                          <span className="span">•</span>
                          <p>{parseInt(dish.homecookOrders/ 5, 10) * 5} + orders</p>
                        </div>
                      </div>
                      <Link to={`/sellers/${dish.homecookName}`}>
                        <ArrowForwardOutlinedIcon sx={{color: '#222222'}}/>
                      </Link>
                    </div>
                    <hr />
                    <div className="dish-time">
                      <h2>{dish.availability[0].meal}</h2>
                      <h2>{dayLabel}</h2>
                    </div>
                      <DishCard
                        sellerName={dish.homecookName}
                        dishItem={dish}
                      />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        )
      )}
      <CartContainer
        totalItems={totalItems}
        totalPrice={totalPrice}
      />
    </>
  );
};

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [sortType, setSortType] = useState('price');
  const [sortDirection, setSortDirection] = useState('asc');
  const [loading, setLoading] = useState(false);
  const today = new Date();
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

  const sortResults = (results, type, direction) => {
      return results.slice().sort((a, b) => {
          if (type === 'price') {
              return (direction === 'asc')
                  ? a.matchingDishes[0].price - b.matchingDishes[0].price
                  : b.matchingDishes[0].price - a.matchingDishes[0].price;
          } else if (type === 'rating') {
              return (direction === 'asc')
                  ? a.homecookRating - b.homecookRating
                  : b.homecookRating - a.homecookRating;
          } else {
              return 0;
          }
      });
  };

  const handleSearchInput = (e) => {
    const q = e.target.value;
    setSearchParams({ q }, {replace: true});
  }

  const handleClearInput = () => {
    setSearchParams({});
    setSearchResults([]);
  };

  useEffect(() => {
    const query = searchParams.get("q");

    const handleSearch = async () => {
      if (!query || query.length < 3) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      const resultsByDay = {};

       homecooks.forEach((homecook) => {
        const filteredDishes = homecook.dishes.filter((dish) =>
          dish.name.toLowerCase().includes(query.toLowerCase())
        );
         filteredDishes.forEach((dish) => {
           const dayLabel = getDayLabel(dish);
           if (!resultsByDay[dayLabel]) {
             resultsByDay[dayLabel] = [];
           }
           resultsByDay[dayLabel].push({
            ...dish,
            homecookName: homecook.name,
            homecookRating: homecook.rating,
            homecookOrders: homecook.noOfOrders});
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
      setSearchResults(sortedResults);
      setLoading(false);
    };

    handleSearch();
  }, [searchParams])

  return (
    <>
      <Navbar/>
      <section className="search-section">
        <div className="search-container">
          <div className="search-link">
            <SearchOutlinedIcon className="search-icon"/>
            <input type="text" placeholder="Search your favourite food..." autoFocus
            value={searchParams.get("q") || ""} onChange={handleSearchInput}/>
            {searchParams.get("q") && (
              <button className="clear-button" onClick={handleClearInput}>
                <CloseOutlinedIcon sx={{fontSize: '16px'}}/>
              </button>
            )}
            <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="-8 -968 976 976" width="36" style={{backgroundColor: '#F16122', padding: '6px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><path d="M710-150q-63 0-106.5-43.5T560-300q0-63 43.5-106.5T710-450q63 0 106.5 43.5T860-300q0 63-43.5 106.5T710-150Zm0-80q29 0 49.5-20.5T780-300q0-29-20.5-49.5T710-370q-29 0-49.5 20.5T640-300q0 29 20.5 49.5T710-230Zm-550-30v-80h320v80H160Zm90-250q-63 0-106.5-43.5T100-660q0-63 43.5-106.5T250-810q63 0 106.5 43.5T400-660q0 63-43.5 106.5T250-510Zm0-80q29 0 49.5-20.5T320-660q0-29-20.5-49.5T250-730q-29 0-49.5 20.5T180-660q0 29 20.5 49.5T250-590Zm230-30v-80h320v80H480Zm230 320ZM250-660Z" fill="#fff"/></svg>
          </div>
        </div>

        <SearchResult
          result={searchResults}
          loading={loading}
        />
      </section>
    </>
  )
}

export default Search;
