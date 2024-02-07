import React from "react";
import "./Features.css"

function Features() {
  return (
    <div className="feature-container">
      <div className="feature-div">
        <img
          className="feature-img"
          src="https://mopin-assets.s3.ap-south-1.amazonaws.com/base+images/homemade_5044740.avif"
          alt=""
        />
        <h2 className="feature-text">Authentic Homemade Food</h2>
        <p className="feature-desc"> All meals are prepared by local talented homechefs providing a unique homemade taste which you would relish all the way</p>
      </div>
      <div className="feature-div" style={{margin: '4.8% 2.4% 0'}}>
        <img
          className="feature-img"
          src="https://mopin-assets.s3.ap-south-1.amazonaws.com/base+images/food-tray_1922417.avif"
          alt=""
        />
        <h2 className="feature-text">Variey of Cuisines</h2>
        <p className="feature-desc"> Enjoy a wide variey of home cooked meals from various traditions cooked by our diverse homechefs at prices never heard before</p>
      </div>
      <div className="feature-div">
        <img
          className="feature-img"
          src="https://mopin-assets.s3.ap-south-1.amazonaws.com/base+images/teppanyaki_1659420.avif"
          alt=""
        />
        <h2 className="feature-text">Quality Certified Kitchens</h2>
        <p className="feature-desc"> Each kitchen that cooks your food is thoroughly adhering to standard operating protocols ensuring hygenic food gets delivered to you</p>
      </div>
    </div>
  );
}

export default Features;
