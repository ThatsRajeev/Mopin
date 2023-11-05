import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = ({ setAddressProp, setShowProp }) => {
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
        setAddressProp(
          response.data.results[0].formatted
        );
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
    setAddressProp(suggestion.formatted);
    setSuggestions([]);
    setShowProp();
  };

  const handleClearInput = () => {
    setInputValue('');
    setSuggestions([]);
  };

  return (
    <>
      <div className="mob-view">
        <div style={{display: 'flex', marginTop: '28px', fontSize: '16px'}}>
          <span class="material-symbols-outlined" style={{marginRight: '16px'}} onClick={() => setShowProp()}>arrow_back</span>
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
    </>
  );
};

export default Location;
