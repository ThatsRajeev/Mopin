import React, { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import SkeletonCard from "./skeleton.jsx"
import LocateMePrompt from "../../components/LocateMePrompt/LocateMePrompt";
import Navbar from "../../components/Navbar/Navbar";
import homecooks from "../../data/homecooks";
import "leaflet/dist/leaflet.css";

const Hero = lazy(() => import("./Hero/Hero"));
const FoodSlider = lazy(() => import("./FoodSlider/FoodSlider"));
const FoodItemCard = lazy(() => import("./FoodItemCard/FoodItemCard"));
const MealtimeFilter = lazy(() => import("./MealtimeFilter/MealtimeFilter"));
const Features = lazy(() => import("./Features/Features"));
const Fooder = lazy(() => import("./Fooder/Fooder"));
const Makers = lazy(() => import("./Makers/Makers"));
const Testimonials = lazy(() => import("./Testimonials/Testimonials"));
const Footer = lazy(() => import("../../components/Footer/Footer"))

function Homepage() {
  const [active, setActive] = useState('All');
  const foodCatgor = ['All', 'Spicy', 'Veg', 'Non-veg', 'Dairy-free'];

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
      {localStorage.getItem("userLocation") === null ? (
        <LocateMePrompt />
      ) : (
        <>
          <Navbar />
          <Suspense fallback={<SkeletonCard />}>
            <Hero />

            <div className="mob-view">
              <div className="foodCatgor">
                {foodCatgor.map((catgor, index) => (
                  <div key={index} className={`${active === catgor ? "active-catgor" : ""}`}
                    onClick={() => setActive(catgor)}>{catgor}</div>
                ))}
              </div>
              <FoodSlider func={filterDish} />
              <hr />

              <MealtimeFilter />

              <div className="header-container">
                <h1 className="cardHeader">All Homechefs Nearby</h1>
              </div>
              {homecooks.map((cook, index) => (
                <Link to ={`/sellers/${cook.name}`} style={{textDecoration: 'none'}}>
                  <FoodItemCard
                    key={index}
                    cardType={"chef"}
                    name={cook.name}
                    img={cook.imgURL}
                    foodType={cook.foodType}
                    rating={cook.rating}
                    feeds={cook.feeds}
                    noOfOrders={cook.noOfOrders}
                    minPrice={cook.minPrice}
                  />
                  </Link>
              ))}

              <img className="hero-smallScreen" loading="lazy" src="https://mopin-assets.s3.ap-south-1.amazonaws.com/base+images/Group-182.avif" alt="footer_img" />
            </div>

            <div className="pc-view" style={{flexDirection: 'column'}}>
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

              <div className="feature-bcg">
                <div className="header-container">
                  <h1 className="cardHeader" style={{margin: '0 auto'}}>
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

              <div className="header-container">
                <h1 className="cardHeader">What do our Customers have to say</h1>
              </div>
              <Testimonials />

              <Footer />
            </div>
          </Suspense>
        </>
      )}
    </>
  );
}

export default Homepage;
