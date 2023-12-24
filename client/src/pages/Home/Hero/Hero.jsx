import React from "react";
import "./Hero.css"

function Hero() {
  const scroll = () => {
    window.scrollTo({
      top: 750,
      behavior: 'smooth'
    })
  }
  return (
    <>
      <div className="hero-bigScreen-div">
        <div className="hero-bigScreen">
          <p className="hero-tag">
            Experience the Taste of Home with Authentic{" "}
            <span>
              Homemade Food
            </span>
          </p>
          <p className="hero-desc">
            Support local women entrepreneurs by bringing their homemade Indian
            food to your table!
          </p>
          <button className="hero-btn" onClick={scroll}>GET FOOD</button>
          <button className="hero-btn ghost-btn">SELL FOOD</button>
        </div>
      </div>
      <div className="hero-smallScreen-div">
        <img className="hero-smallScreen" src="https://drive.google.com/uc?id=1UzMJDGvW37Y5kimKYE2npNtJtGy0Dx0p" alt="food_img" />
      </div>
    </>
  );
}

export default Hero;
