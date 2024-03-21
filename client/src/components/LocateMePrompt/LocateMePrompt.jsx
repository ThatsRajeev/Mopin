import React, {useState, useEffect} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import handlePlaceSearch from "../../utils/handlePlaceSearch";
import handleGeolocation from "../../utils/handleGeolocation";
import Overlay from "../Overlay/Overlay"
import Location from "../Location/Location";
import Button from '@mui/material/Button';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Check from "../../assets/check.svg";
import "./LocateMePrompt.css";

function LocateMePrompt() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [overlayParams, setOverlayParams] = useSearchParams();

  const getCurrentLocation = async () => {
    try {
      if (navigator.geolocation) {
        const res = await handleGeolocation();
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
  };

  const handleClearInput = () => {
    setInputValue('');
    setSuggestions([]);
  };

  const toggleOverlay = () => {
   setOverlayParams((prev) => {
     const isOpen = prev.get("address") === "set";
     if (isOpen) {
       navigate(-1);
     } else {
       prev.set("address", "set");
     }
     return prev;
   });
 };

  useEffect(() => {
    if(localStorage.getItem('userLocation')) {
      window.location.reload();
    }
  }, [localStorage.getItem('userLocation')]);

  return (
    <div className="locateMe-container">
      <div className="locateMe-div">
        <h2 className="logo-name pc-view">mopin</h2>
        <h1 className="logo-tagline">Nourishing Your Soul with Mom-Crafted Meals.</h1>
        <p className="logo-p pc-view"> Order homemade food from homechefs near you. </p>
        <div className="address-input-div pc-view">
          <input
            className="address-input"
            placeholder="Enter your delivery location"
            onChange={handleInputChange}
            value={inputValue}
          />
          {inputValue ? (
            <button className="clear-button" onClick={handleClearInput}>
              <CloseIcon color="secondary" />
            </button>
          ) : (
            <p className="gps-location" onClick={getCurrentLocation}>
              <MyLocationIcon color="secondary" sx={{marginRight: '12px'}}/>
              Locate Me
            </p>
          )}
          <Button variant="contained" sx={{borderRadius: '0', textTransform: 'none', fontSize: '18px', minWidth: '160px'}}>Explore Food</Button>
        </div>
        <Button onClick={() => {toggleOverlay()}} variant="contained" fullWidth size="large" sx={{textTransform: 'none', display: {tablet: "none"}}}>
          Set your Location
        </Button>
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
      </div>
      {overlayParams.get("address") && (
        <Overlay>
          <Location setShowProp={() => navigate(-1)}/>
        </Overlay>
      )}

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
