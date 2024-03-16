import React, { useState, useEffect } from "react";
import handleGeolocation from "../../utils/handleGeolocation";
import handlePlaceSearch from "../../utils/handlePlaceSearch";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';
import loader from "../../assets/loader2.svg";
import "./Location.css";

const Location = ({ setShowProp }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getCurrentLocation = async () => {
    try {
      if (navigator.geolocation) {
        setLoading(true);
        const res = await handleGeolocation();
        localStorage.setItem("userLocation", res.display_name);
        setShowProp('address');
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
        const res = await handlePlaceSearch(inputValue);
        setSuggestions(res);
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
    <div className="location-container">
      <div className="search-heading mob-view">
        <ArrowBackOutlinedIcon style={{color: '#222222', marginRight: '12px', fontSize: '20px'}} onClick={() => setShowProp('address')}/>
        <p> Search your delivery location</p>
      </div>
      <div className="address-container">
        <div className="address-div">
          <SearchOutlinedIcon style={{ color: '#222222', fontSize: '20px', marginRight: '4px', opacity: '64%' }} />
          <input
            className="address-input"
            placeholder="Search for locality or street name"
            onChange={handleInputChange}
            value={inputValue}
          />
          {inputValue && (
            <button className="clear-button" onClick={handleClearInput}>
              <CloseIcon style={{ color: '#222222', fontSize: '18px' }} />
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
                <LocationOnOutlinedIcon style={{ color: '#222222', marginRight: '16px'}} />
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
        <MyLocationIcon style={{ color: '#222222', marginRight: '12px', fontSize: '20px'}} />
        Use Current Location Using GPS
        {isLoading && <img className="loader-img" src={loader} alt="load-img" />}
      </p>
      <div className="choose-location">
        <div className="location-icon-container">
          <LocationOnOutlinedIcon style={{ color: '#222222', fontSize: '48px'}} />
        </div>
        <p className="choose-location-p1"> Choose your location! </p>
        <p className="choose-location-p2"> And enjoy delicious homemade cuisines near your location </p>
      </div>
    </div>
  );
};

export default Location;
