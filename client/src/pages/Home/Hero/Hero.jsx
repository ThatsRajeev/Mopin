import React, { useEffect } from "react";
import debounce from "../../../utils/debounce";
import hero from "../../../assets/hero.webp";
import "./Hero.css"

function Hero() {
  const scroll = () => {
    window.scrollTo({
      top: 750,
      behavior: 'smooth'
    })
  }

  const debouncedScroll = debounce(scroll, 300);

  useEffect(() => {
    const handleScroll = () => {
      debouncedScroll();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [debouncedScroll]);

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
      <div className="hero-smallScreen-div" onClick={scroll}>
        <img fetchpriority="high" className="hero-smallScreen skeleton mob-view" src={hero} alt="food_img" />
      </div>
    </>
  );
}

export default Hero;
