import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Navbar from "../Navbar/Navbar";
import DishCard from "../../pages/SellerPage/DishCard/DishCard";
import { getDayOfTheWeek } from "../../utils/getFilteredDishes";
import { fetchSellerCartInfo } from "../../utils/fetchCartInfo";
import homecooks from "../../data/homecooks";
import "./Search.css";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [sortType, setSortType] = useState('price');
  const [sortDirection, setSortDirection] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dishInfo, setdishInfo] = useState({});

  useEffect(() => {
    const query = searchParams.get("q");

    const handleSearch = async () => {
      if (!query || query.length < 3) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      const results = homecooks.reduce((acc, homecook) => {
        const filteredDishes = homecook.dishes.filter((dish) =>
          dish.name.toLowerCase().includes(query.toLowerCase())
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
      setSearchResults(results);
      setLoading(false);
    };

    handleSearch();
  }, [searchParams])

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

  const handleSearchInput = (e) => {
    const q = e.target.value;
    setSearchParams({ q }, {replace: true});
  }

  const handleClearInput = () => {
    setSearchParams({});
    setSearchResults([]);
  };

  return (
    <>
      <Navbar/>
      <section className="search-section">
        <div className="search-container">
          <div className="search-link">
            <span className="material-symbols-outlined search-icon">search</span>
            <input type="text" placeholder="Search your favourite food..." autoFocus
            value={searchParams.get("q") || ""} onChange={handleSearchInput}/>
            {searchParams.get("q") && (
              <button className="clear-button" onClick={handleClearInput}>
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>
          <span className="material-symbols-outlined page-info-icon">page_info</span>
        </div>

        {loading ? (
          <div className="loading-skeleton">
            {Array(4)
              .fill()
              .map((item, index) => (
                <div key={index}>
                  <Skeleton height={24} width={`48vw`} />
                  <Skeleton height={24} width={`64vw`} />
                  <Skeleton width={`80vw`} height={100} />
                </div>
              ))}
          </div>
        ) : (
          searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((result) => (
                <>
                  {result.matchingDishes.map((dish, dishIndex) => (
                    <div key={dishIndex} className="result-item">
                      <div className="homecook-info">
                        <div>
                          <h3>From {result.homecookName}</h3>
                          <div className="sub-info-mobile">
                            <div className="rating-svg">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="#349E46" style={{width: '0.96rem'}}>
                                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                              </svg>
                              <span>{result.homecookRating}</span>
                            </div>
                            <span className="span">•</span>
                            <p>{parseInt(result.homecookOrders/ 5, 10) * 5} + orders</p>
                          </div>
                        </div>
                        <Link to={`/sellers/${result.homecookName}`} style={{ textDecoration: 'none' }}>
                          <span className="material-symbols-outlined to-homechef">arrow_forward</span>
                        </Link>
                      </div>
                      <hr />
                      <div className="dish-time">
                        <h2>{dish.availability[0].meal}</h2>
                        <h2>{getDayLabel(dish)}</h2>
                      </div>
                        <DishCard
                          sellerName={result.homecookName}
                          dishItem={dish}
                          dishInfo={dishInfo}
                          setTotalItems={setTotalItems}
                          setTotalPrice={setTotalPrice}
                        />
                    </div>
                  ))}
                </>
              ))}
            </div>
          )
        )}
      </section>
    </>
  )
}

export default Search;
