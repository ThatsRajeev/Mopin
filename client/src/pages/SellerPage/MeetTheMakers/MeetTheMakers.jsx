import React, { useState, useEffect } from "react";
import makers from "../../../data/makers";
import Overlay from "../../../components/Overlay/Overlay";
import "./MeetTheMakers.css";

const MeetTheMakers = ({ sellerDetails }) => {
  const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * 7));
  const [makerOverlay, setMakerOverlay] = useState(false);

  useEffect(() => {
    if (makerOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [makerOverlay]);


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
              <button onClick={() => setMakerOverlay(!makerOverlay)} className="read-btn">
                <span>Read her story</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {makerOverlay &&
        <Overlay closeOverlay={() => setMakerOverlay(!makerOverlay)}>
          <div className="search-heading mob-view">
            <span className="material-symbols-outlined" onClick={() => setMakerOverlay(!makerOverlay)}>arrow_back</span>
            <p>Meet the Maker</p>
          </div>
          <img className="makerOverlay-img" src={makers[randomIndex].imgURL} alt="makers-img" />
          <div className="makerOverlay-div">
            <h3>{sellerDetails.name}</h3>
            <p>{makers[randomIndex].story}</p>
          </div>
      </Overlay>
      }
    </>
  )
}

export default MeetTheMakers;
