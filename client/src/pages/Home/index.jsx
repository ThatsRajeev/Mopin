import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import LocateMePrompt from "../../components/LocateMePrompt/LocateMePrompt";
import Hero from "./Hero/Hero";
import FoodSlider from "./FoodSlider/FoodSlider";
import ChefCard from "./ChefCard/ChefCard";
import Features from "./Features/Features";
import Fooder from "./Fooder/Fooder";
import Makers from "./Makers/Makers";
import Testimonials from "./Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";
import homecooks from "../../data/homecooks";
import "leaflet/dist/leaflet.css";

function Homepage() {
  const [locationPrompt, setLocationPrompt] = useState(false);
  const [active, setActive] = useState('All');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const foodCatgor = ['All', 'Spicy', 'Veg', 'Non-veg', 'Dairy-free'];

  useEffect(() => {
    toast("This app currently only serves test data. We will be live soon!", {
      duration: 4000,
      id: 'soon',
      icon: '👨‍💻'
    });

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        const location = localStorage.getItem("userLocation");
        if (location === null) {
          setLocationPrompt(true);
        }
      } catch (error) {
        console.error('Error checking location:', error);
      }
    };
    checkLocationPermission();
  }, []);

  const newly = (props) => {
    const jd = new Date(props.dateOfJoining).getTime();
    const td = new Date().getTime();
    return td - jd <= 7.884e9;
  };

  const rated = (props) => {
    return props.rating >= 4.4;
  };

  const healthy = (props) => {
    return props.healthyPick;
  };

  const filterDish = (props) => {
    const categoryMap = {
      All: true,
      Spicy: props.spicy,
      Veg: props.veg,
      "Non-veg": !props.veg,
      "Dairy-free": props.dairyFree,
    };

    return categoryMap[active];
  };

  return (
    <>
      {locationPrompt ? (
        <LocateMePrompt />
      ) : (
        <>
          <Navbar />
          <Toaster
            position="bottom-center"
          />
          <Hero />
          {windowWidth < 768 ? (
            <>
              <div className="foodCatgor">
                {foodCatgor.map((catgor, index) => (
                  <div key={index} className={`${active === catgor ? "active-catgor" : ""}`}
                    onClick={() => setActive(catgor)}>{catgor}</div>
                ))}
              </div>
              <FoodSlider func={filterDish} />
              <hr />

              <div className="header-container">
                <h1 className="cardHeader">All Homechefs Nearby</h1>
              </div>
              {homecooks.map((cook, index) => (
                <Link to ={`/sellers/${cook.name}`} style={{textDecoration: 'none'}}>
                  <ChefCard
                    key={index}
                    id={index}
                    name={cook.name}
                    img={cook.imgURL}
                    foodType={cook.foodType}
                    rating={cook.rating}
                    noOfOrders={cook.noOfOrders}
                    minPrice={cook.minPrice}
                    className = "card"
                  />
                  </Link>
              ))}

              <img className="hero-smallScreen skeleton" src="https://mopin-assets.s3.ap-south-1.amazonaws.com/base+images/Group-182.avif" alt="footer_img" />
            </>
          ) : (
            <>
              <div className="header-container">
                <h1 className="cardHeader">Added Afresh</h1>
                <button className="see-all-btn">
                  See All Recently Added
                  <span className="material-symbols-outlined">
                    navigate_next
                  </span>
                </button>
              </div>

              <FoodSlider func={newly} />
              <hr />

              <div className="header-container">
                <h1 className="cardHeader">Popular Regionals</h1>
              </div>
              <Fooder />

              <div className="feature-bcg pc-view">
                <div className="header-container">
                  <h1 className="cardHeader">
                    Grab your <span style={{ color: "#f16122" }}>ORDER NOW!</span>
                  </h1>
                </div>
                <Features />
              </div>

              <div className="header-container">
                <h1 className="cardHeader">Most Loved near you</h1>
                <button className="see-all-btn">
                  See All Loved Collections
                  <span className="material-symbols-outlined">
                    navigate_next
                  </span>
                </button>
              </div>

              <FoodSlider func={rated} />
              <hr />

              <div className="header-container">
                <h1 className="cardHeader">Healthy Picks</h1>
                <button className="see-all-btn">
                  See All Healthy Picks
                  <span className="material-symbols-outlined">
                    navigate_next
                  </span>
                </button>
              </div>

              <FoodSlider func={healthy} />
              <hr />

              <div className="header-container">
                <h1 className="cardHeader">Meet the Makers</h1>
              </div>
              <Makers />

              <div className="header-container pc-view">
                <h1 className="cardHeader">What do our Customers have to say</h1>
              </div>
              <Testimonials />

              <Footer />
            </>
          )}
        </>
      )}
    </>
  );
}

export default Homepage;
