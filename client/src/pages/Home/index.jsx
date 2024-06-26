import React, { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import SkeletonCard from "./skeleton.jsx"
import LocateMePrompt from "../../components/LocateMePrompt/LocateMePrompt";
import { SearchBar } from "../../components/Search/Search";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/productsSlice";
import { styled } from "@mui/system";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
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

const HeaderContainer = styled('div')({
  display: "flex",
  alignItems: "center",
  margin: "4.2vw 16px 0",
  maxWidth: 1200,
  justifyContent: "space-between",

  "@media (width > 768px)": {
    margin: "3.2vw 14px 2.4vw",
  },

  "@media (width > 1240px)": {
    width: "100%",
    margin: "3.2vw auto 2.4vw",
  }
});

const CardHeader = styled('h1')({
  color: "#222222",
  fontSize: "1.2rem",

  "@media (width > 768px)": {
    fontSize: "1.6rem",
    lineHeight: "1.8rem",
    letterSpacing: "1px",
  }
});

const SeeAllButton = styled('button')({
  display: "flex",
  alignItems: "center",
  padding: "12px 24px",
  fontWeight: 600,
  color: "#fff",
  backgroundColor: "#349E46",
  border: "none",
  borderRadius: "6px",
  height: "100%",
  cursor: "pointer",
});

const FoodCategoryContainer = styled('div')({
  display: "flex",
  gap: "12px",
  margin: "0 16px",
  overflow: "auto",

  "div": {
    fontSize: "16px",
    fontWeight: 600,
    padding: "8px 14px",
    backgroundColor: "#fff",
    border: "2px solid #F16122",
    borderRadius: "20px",
    whiteSpace: "nowrap",
    opacity: 0.64,
  },

  "div.active-catgor": {
    backgroundColor: "#F16122",
    color: "#fff",
    opacity: 1,
  },

  "&::-webkit-scrollbar": {
    width: 0,
    height: 0,
  }
});

function Homepage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const productsData = useMemo(() => products.items || {},
                                  [products.items])
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

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {localStorage.getItem("userLocation") === null ? (
        <LocateMePrompt />
      ) : (
        <>
          <Navbar />
          <Suspense fallback={<SkeletonCard />}>
            {!productsData.length ? (
              <SkeletonCard />
            ) : (
              <>
                <SearchBar />
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
                  {productsData.map((cook, index) => (
                    <Link to ={`/sellers/${cook.name}`} key={index}>
                      <FoodItemCard
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
                      <NavigateNextOutlinedIcon sx={{margin: '0 -8px 0 4px'}}/>
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
                      <CardHeader style={{margin: '0 auto'}}>
                        Grab your <span style={{ color: "#F16122" }}>ORDER NOW!</span>
                      </CardHeader>
                    </HeaderContainer>
                    <Features />
                  </div>

                    <HeaderContainer>
                      <CardHeader>Most Loved near you</CardHeader>
                      <SeeAllButton>
                        See All Mostly Loved
                        <NavigateNextOutlinedIcon sx={{margin: '0 -8px 0 4px'}}/>
                      </SeeAllButton>
                    </HeaderContainer>

                  <FoodSlider func={rated} />
                  <hr />

                    <HeaderContainer>
                      <CardHeader>Healthy Picks</CardHeader>
                      <SeeAllButton>
                        See All Healthy Picks
                        <NavigateNextOutlinedIcon sx={{margin: '0 -8px 0 4px'}}/>
                      </SeeAllButton>
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
              </>
            )}
          </Suspense>
        </>
      )}
    </>
  );
}

export default Homepage;
