import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import makers from "../../../data/makers";
import Overlay from "../../../components/Overlay/Overlay";
import "./MeetTheMakers.css";

const MeetTheMakers = ({ sellerDetails }) => {
  const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * 7));
  const [overlayParams, setOverlayParams] = useSearchParams();
  const navigate = useNavigate();

  const toggleOverlay = () => {
   setOverlayParams((prev) => {
     const isOpen = prev.get("maker") === "true";
     if (isOpen) {
       navigate(-1);
     } else {
       prev.set("maker", "true");
     }
     return prev;
   });
 };

  return (
    <>
      <div className="meet-maker-div">
        <h2>Meet the Maker</h2>
        <div className="makers-container">
          <div className="makers-ellipse">
            <div>
              <img className="makers-img" src={makers[randomIndex].imgURL} alt="makers-img" />
            </div>
          </div>
          <div className="maker-div">
            <h3>{sellerDetails.name}</h3>
            <p>{makers[randomIndex].story}</p>
            <div>
              <button onClick={toggleOverlay} className="read-btn">
                <span>Read her story</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {overlayParams.get("maker") && (
        <Overlay>
          <div className="makerOverlay-container">
            <div className="search-heading mob-view">
              <span className="material-symbols-outlined" onClick={toggleOverlay}>arrow_back</span>
              <p>Meet the Maker</p>
            </div>
            <img className="makerOverlay-img" src={makers[randomIndex].imgURL} alt="makers-img" />
            <div className="makerOverlay-div">
              <h3>{sellerDetails.name}</h3>
              <p>{makers[randomIndex].story}</p>
            </div>
          </div>
        </Overlay>
      )}
    </>
  )
}

export default MeetTheMakers;
