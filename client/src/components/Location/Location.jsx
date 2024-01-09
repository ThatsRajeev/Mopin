import React, { useState, useEffect } from "react";
import axios from "axios";
import handleGPS from "../../utils/handleGPS";
import "./Location.css";

const Location = ({ setShowProp }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getCurrentLocation = async () => {
    try {
      if (navigator.geolocation) {
        setShowProp('address');
        const res = await handleGPS();
        localStorage.setItem("userLocation", res.display_name);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleInputChange = async (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    if (inputValue.length > 2) {
      try {
        const response = await axios.get(
          `https://mopin-server.vercel.app/proxy/search?q=${inputValue}&format=json&addressdetails=1&countrycodes=in`,
          { withCredentials: false }
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    localStorage.setItem("userLocation", suggestion.display_name);
    setSuggestions([]);
    setShowProp('address');
  };

  const handleClearInput = () => {
    setInputValue('');
    setSuggestions([]);
  };

  return (
    <>
      <div className="search-heading mob-view">
        <span className="material-symbols-outlined" onClick={() => setShowProp('address')}>arrow_back</span>
        <p> Search your delivery location</p>
      </div>
      <div className="address-container">
        <div className="address-div">
          <span className="material-symbols-outlined">search</span>
          <input
            className="address-input"
            placeholder="Search for locality or street name"
            onChange={handleInputChange}
            value={inputValue}
          />
          {inputValue && (
            <button className="clear-button" onClick={handleClearInput}>
              <span class="material-symbols-outlined">close</span>
            </button>
          )}
        </div>
      </div>
      <ul className="suggUL">
        {suggestions.length !== 0 && (
          <div className="list-div">
            {suggestions.map((suggestion) => (
              <li
                className="suggLI"
                key={suggestion.place_id}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span class="material-symbols-outlined location-icon">location_on</span>
                <div className="SuggDiv">
                  <p>
                    {
                      suggestion.display_name
                        .split(",")
                        .map((part) => part.trim())[0]
                    }
                  </p>
                  <p className="suggDetails">{suggestion.display_name}</p>
                </div>
              </li>
            ))}
          </div>
        )}
      </ul>
      <p className="gps-location" onClick={getCurrentLocation}>
        <span className="material-symbols-outlined my-location-icon">my_location</span>
        Use Current Location Using GPS
      </p>
      <div className="choose-location">
        <div className="location-icon-container">
          <span className="material-symbols-outlined location-on-icon">location_on</span>
        </div>
        <p className="choose-location-p1"> Choose your location! </p>
        <p className="choose-location-p2"> And enjoy delicious homemade cuisines near your location </p>
      </div>
    </>
  );
};

export default Location;
