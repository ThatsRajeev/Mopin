import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import Navbar from "../Navbar/Navbar";
import DishCard from "../../pages/SellerPage/DishCard/DishCard";
import { fetchSellerCartInfo } from "../../utils/fetchCartInfo";
import homecooks from "../../data/homecooks";
import "./Search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dishInfo, setdishInfo] = useState({});

  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);
      const results = homecooks.reduce((acc, homecook) => {
        const filteredDishes = homecook.dishes.filter((dish) =>
          dish.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filteredDishes.length > 0) {
          acc.push({
            homecookId: homecook.id,
            homecookName: homecook.name,
            matchingDishes: filteredDishes,
          });
        }

        return acc;
      }, []);

      await new Promise((resolve) => setTimeout(resolve, 500));
      setSearchResults(results);
      setLoading(false);
    };

    if(searchTerm.length >= 3) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleClearInput = () => {
    setSearchTerm("");
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
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            {searchTerm && (
              <button className="clear-button" onClick={handleClearInput}>
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>
          <span className="material-symbols-outlined page-info-icon">page_info</span>
        </div>

        {loading ? (
          <div className="loading-skeleton">
            <Skeleton width={`100vw`} height={200} count={3} />
          </div>
        ) : (
          searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((result) => (
                <div key={result.homecookId} className="result-item">
                  <h3>From {result.homecookName}</h3>
                  <ul>
                    {result.matchingDishes.map((dish, dishIndex) => (
                      <li key={dishIndex}>
                        <DishCard
                          sellerName={result.homecookName}
                          dishItem={dish}
                          dishInfo={dishInfo}
                          setTotalItems={setTotalItems}
                          setTotalPrice={setTotalPrice}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )
        )}
      </section>
    </>
  )
}

export default Search;
