import React from "react";
import Button from '@mui/material/Button';
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
          <Button onClick={scroll} variant="contained" sx={{fontSize: '1.6rem', borderRadius: '8px'}}>GET FOOD</Button>
          <Button variant="outlined" sx={{fontSize: '1.6rem', marginLeft: '1.6rem', borderRadius: '8px'}}>SELL FOOD</Button>
        </div>
      </div>
      <div className="hero-smallScreen-div" onClick={scroll}>
        <img fetchpriority="high" className="hero-smallScreen mob-view" src="https://mopin-assets.s3.ap-south-1.amazonaws.com/base+images/Group+181+(1).webp" alt="food_img" />
      </div>
    </>
  );
}

export default Hero;
