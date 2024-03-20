import React, { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import SkeletonCard from "./skeleton.jsx"
import LocateMePrompt from "../../components/LocateMePrompt/LocateMePrompt";
import Navbar from "../../components/Navbar/Navbar";
import homecooks from "../../data/homecooks";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";

const Hero = lazy(() => import("./Hero/Hero"));
const FoodSlider = lazy(() => import("./FoodSlider/FoodSlider"));
const FoodItemCard = lazy(() => import("./FoodItemCard/FoodItemCard"));
const MealtimeFilter = lazy(() => import("./MealtimeFilter/MealtimeFilter"));
const Features = lazy(() => import("./Features/Features"));
const Fooder = lazy(() => import("./Fooder/Fooder"));
const Makers = lazy(() => import("./Makers/Makers"));
const Testimonials = lazy(() => import("./Testimonials/Testimonials"));
const Footer = lazy(() => import("../../components/Footer/Footer"));

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 4.2vw 16px 0;
  max-width: 1200px;
  justify-content: space-between;

  @media (width > 768px) {
    margin: 3.2vw 14px 2.4vw;
  }

  @media (width > 1240px) {
    width: 100%;
    margin: 3.2vw auto 2.4vw;
  }
`;

const CardHeader = styled.h1`
  color: #222222;
  font-size: 1.2rem;
  ${({ customStyles }) => customStyles && customStyles};

  @media (width > 768px) {
    font-size: 1.6rem;
    line-height: 1.8rem;
    letter-spacing: 1px;
  }
`;

const SeeAllButton = styled.button`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  font-weight: 600;
  color: #fff;
  background-color: #349E46;
  border: none;
  border-radius: 6px;
  height: 100%;
  cursor: pointer;

  .material-symbols-outlined {
    margin: 0 -8px 0 4px;
  }
`;


const FoodCategoryContainer = styled.div`
  display: flex;
  gap: 12px;
  margin: 0 16px;
  overflow: auto;

  div {
    font-size: 16px;
    font-weight: 600;
    padding: 8px 14px;
    background-color: #fff;
    border: 2px solid #FF5B22;
    border-radius: 20px;
    white-space: nowrap;
    opacity: 0.64;
  }

  div.active-catgor {
    background-color: #FF5B22 !important;
    color: #fff;
    opacity: 1 !important;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

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
              <FoodCategoryContainer>
                {foodCatgor.map((catgor, index) => (
                  <div key={index} className={`${active === catgor ? "active-catgor" : ""}`}
                    onClick={() => setActive(catgor)}>{catgor}</div>
                ))}
              </FoodCategoryContainer>
              <FoodSlider func={filterDish} />
              <hr />

              <MealtimeFilter />

              <HeaderContainer>
                <CardHeader>All Homechefs Nearby</CardHeader>
              </HeaderContainer>
              {homecooks.map((cook, index) => (
                <Link to ={`/sellers/${cook.name}`}>
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
              <HeaderContainer>
                <CardHeader>Added Afresh</CardHeader>
                <SeeAllButton>
                  See All Recently Added
                  <span className="material-symbols-outlined">
                    navigate_next
                  </span>
                </SeeAllButton>
              </HeaderContainer>

              <FoodSlider func={newly} />
              <hr />

              <HeaderContainer>
                <CardHeader>Added Afresh</CardHeader>
              </HeaderContainer>
              <Fooder />

              <div className="feature-bcg">
                <HeaderContainer>
                  <CardHeader customStyles={{margin: '0 auto'}}>
                    Grab your <span style={{ color: "#FF5B22" }}>ORDER NOW!</span>
                  </CardHeader>
                </HeaderContainer>
                <Features />
              </div>

                <HeaderContainer>
                  <CardHeader>
                    Most Loved near you
                  </CardHeader>
                  <span className="material-symbols-outlined">
                    navigate_next
                  </span>
                </HeaderContainer>

              <FoodSlider func={rated} />
              <hr />

                <HeaderContainer>
                  <CardHeader>
                    Healthy Picks
                  </CardHeader>
                  <span className="material-symbols-outlined">
                    navigate_next
                  </span>
                </HeaderContainer>

              <FoodSlider func={healthy} />
              <hr />

              <HeaderContainer>
                <CardHeader>
                  Meet the Makers
                </CardHeader>
              </HeaderContainer>
              <Makers />

              <HeaderContainer>
                <CardHeader>
                  What do our Customers have to say
                </CardHeader>
              </HeaderContainer>
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
