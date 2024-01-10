import React, {useState, useEffect} from "react";
import axios from "axios";
import handleGPS from "../../utils/handleGPS";
import Location from "../Location/Location";
import Check from "../../assets/check.svg";
import "./LocateMePrompt.css";

function LocateMePrompt() {
  const [addressOverlay, setAddessOverlay] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getCurrentLocation = async () => {
    try {
      if (navigator.geolocation) {
        const res = await handleGPS();
        localStorage.setItem("userLocation", res.display_name);
        window.location.reload();
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
          `https://mopin-server.vercel.app/proxy/?q=${inputValue}&format=json&addressdetails=1&countrycodes=in`,
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
  };

  const handleClearInput = () => {
    setInputValue('');
    setSuggestions([]);
  };

  const toggleOverlay = () => {
    setAddessOverlay(!addressOverlay);
  }

  useEffect(() => {
    if(localStorage.getItem('userLocation')) {
      window.location.reload();
    }

  }, [localStorage.getItem('userLocation')]);

  return (
    <div className="locateMe-container">
      <div className="locateMe-div">
        <h2 className="logo-name">mopin</h2>
        <h1 className="logo-tagline">Nourishing Your Soul with Mom-Crafted Meals.</h1>
        <p className="logo-p"> Order homemade food from homechefs near you. </p>
        <div className="address-input-div pc-view">
          <input
            className="address-input"
            placeholder="Enter your delivery location"
            onChange={handleInputChange}
            value={inputValue}
          />
          {inputValue ? (
            <button className="clear-button" onClick={handleClearInput}>
              <span class="material-symbols-outlined">close</span>
            </button>
          )
          : (
            <p className="gps-location" onClick={getCurrentLocation}>
              <span className="material-symbols-outlined my-location-icon">my_location</span>
              Locate Me
            </p>
          )}
          <h3 className="explore-foods">Explore food</h3>
        </div>
        <button onClick={() => {toggleOverlay()}} className="locateMe-btn mob-view">
          Set your Location
        </button>
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
      </div>

      {addressOverlay &&
        <div className="addressOverlay">
          <Location setShowProp={toggleOverlay}/>
        </div>
      }

      <div className="locateMe-img">
        <div className="head-container">
          <h2 className="content-heading">Taste the Tradition</h2>
        </div>
        <div className="content-div">
          <img src={Check} alt="check-logo" />
          Home cooked food
        </div>
        <div className="content-div">
          <img src={Check} alt="check-logo" />
          Affordable Prices
        </div>
        <div className="content-div">
          <img src={Check} alt="check-logo" />
          Diverse Cooks Range
        </div>
        <div className="content-div">
          <img src={Check} alt="check-logo" />
          Quality Certified Kitchens
        </div>
      </div>
    </div>
  );
}

export default LocateMePrompt;
