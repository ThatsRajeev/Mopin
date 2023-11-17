import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = ({ setAdrsProp, setShowProp }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await axios.get(
          `https://mopin-server.vercel.app/proxy/geocode/v1/json?q=${latitude}+${longitude}&key=12b6daa5213d46898ef052dfacf9ac5a`,
          { withCredentials: false }
        );
        setAdrsProp(response.data.results[0].formatted);
        setShowProp('address');
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleInputChange = async (event) => {
    setInputValue(event.target.value);

    if (inputValue) {
      try {
        const response = await axios.get(
          `https://mopin-server.vercel.app/proxy/geocode/v1/json?q=${inputValue}&key=12b6daa5213d46898ef052dfacf9ac5a&countrycode=in&limit=5`,
          { withCredentials: false }
        );
        setSuggestions(response.data.results);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setAdrsProp(suggestion.formatted);
    setSuggestions([]);
    setShowProp('address');
  };

  const handleClearInput = () => {
    setInputValue('');
    setSuggestions([]);
  };

  return (
    <>
      <div className="mob-view">
        <div style={{display: 'flex', marginTop: '28px', fontSize: '16px'}}>
          <span class="material-symbols-outlined" style={{marginRight: '16px'}} onClick={() => setShowProp('address')}>arrow_back</span>
          <p> Search your delivery location</p>
        </div>
      </div>
      <div className="address-container">
        <div className="address-div">
          <div><span style={{display: 'flex', marginRight: '4px', opacity: '64%'}} className="material-symbols-outlined">search</span></div>
          <input
            className="address-input"
            placeholder="Search for locality or street name"
            onChange={handleInputChange}
            value={inputValue}
          />
          {inputValue && (
            <button className="clear-button" onClick={handleClearInput}>
            <span class="material-symbols-outlined" style={{fontSize: '16px', margin: '0'}}>close</span>
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
                key={suggestion.annotations.geohash}
                onClick={() => handleSuggestionClick(suggestion)}
              >

              <span class="material-symbols-outlined" style={{marginRight: '16px'}}>location_on</span>
                <div className="SuggDiv">
                  <p>
                    {
                      suggestion.formatted
                        .split(",")
                        .map((part) => part.trim())[0]
                    }
                  </p>
                  <p className="suggDetails">{suggestion.formatted}</p>
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
        <div className="locationIcon-container">
          <span class="material-symbols-outlined location-on-icon">location_on</span>
        </div>
        <p className="choose-location-p1"> Choose your location! </p>
        <p className="choose-location-p2"> And enjoy delicious homemade cuisines near your location </p>
      </div>
    </>
  );
};

export default Location;
