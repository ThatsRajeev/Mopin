import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "./Hero";
import FoodSlider from "./FoodSlider";
import Features from "./Features";
import Fooder from "./Fooder";
import Makers from "./Makers";
import Testimonials from "./Testimonials";
import Footer from "../../components/Footer/Footer";
import "leaflet/dist/leaflet.css";

function Homepage() {
  const [delayPassed, setDelayPassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayPassed(true);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  function newly(props) {
    const jd = new Date(props.dateOfJoining).getTime();
    const td = new Date().getTime();

    return { display: td - jd <= 7.884e9 ? "block" : "none" };
  }
  function rated(props) {
    return { display: props.rating >= 4.4 ? "block" : "none" };
  }
  function healthy(props) {
    return { display: props.healthyPick ? "block" : "none" };
  }

  return (
    <>
    {!delayPassed ? (
      <div style={{ height: "80px" }}></div>
    ) : (
      <Navbar />
    )}

      <Hero />

      <div>
        <div className="header-container">
          <h1 className="cardHeader">Added Afresh</h1>
          <button className="see-all-btn">See All <div>&nbsp;Recently Added</div>
            <span className="material-symbols-outlined" style={{marginRight: '-8px'}}>navigate_next</span>
          </button>
        </div>
        <FoodSlider func={newly} />
      </div>

      <div className="border-separator"></div>

      <div>
        <div className="header-container">
          <h1 className="cardHeader">Popular Regionals</h1>
        </div>
        <Fooder />
      </div>

      <div className="feature-bcg">
        <div className="header-container feature-mob">
          <h1 className="cardHeader">
            Grab your <span style={{ color: "#f16122" }}>ORDER NOW!</span>
          </h1>
        </div>
        <Features />
      </div>

      <div>
        <div className="header-container">
          <h1 className="cardHeader">Most Loved near you</h1>
          <button className="see-all-btn">See All <div>&nbsp;Loved Collections</div>
            <span className="material-symbols-outlined" style={{marginRight: '-8px'}}>navigate_next</span>
          </button>
        </div>
        <FoodSlider func={rated} />
      </div>

      <div className="border-separator"></div>

      <div>
        <div className="header-container">
          <h1 className="cardHeader">Healthy Picks</h1>
          <button className="see-all-btn">See All <div>&nbsp;Healthy Picks</div>
            <span className="material-symbols-outlined" style={{marginRight: '-8px'}}>navigate_next</span>
          </button>
        </div>
        <FoodSlider func={healthy} />
      </div>

      <div className="border-separator"></div>

      <div>
        <div className="header-container">
          <h1 className="cardHeader">Meet the Makers</h1>
        </div>
        <Makers />
      </div>

      <div className="border-separator"></div>

      <div>
        <div className="header-container pc-view">
          <h1 className="cardHeader">What do our Customers has to say</h1>
        </div>
        <Testimonials />
      </div>

      <Footer />
    </>
  );
}

export default Homepage;
