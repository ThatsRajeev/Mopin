import React from "react";
import { Link } from "react-router-dom";
import "./FoodSlider.css"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

import FoodCard from "../FoodCard/FoodCard";
import homecooks from "../../../data/homecooks";

// import required modules
import { Keyboard, Navigation, Pagination, FreeMode } from "swiper/modules";

const FoodSlider = (props) => {
  const params = {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    }
  };

  return (
    <Swiper
      {...params}
      className="slide-container food-slide-container"
      loop={false}
      speed={400}
      slidesPerView={3}
      freeMode={true}
      spaceBetween={40}
      fadeEffect={true}
      loopPreventsSliding={0}
      slidesPerGroupSkip={2}
      grabCursor={true}
      keyboard={{
        enabled: true
      }}
      breakpoints={{
        0: {
          slidesPerView: 1.5,
          spaceBetween: 16,
        },
        568: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        764: {
          slidesPerView: 2.5,
          spaceBetween: 36,
        },
        1000: {
          slidesPerView: 3,
          spaceBetween: 48,
        }
      }}
      scrollbar={false}
      navigation={true}
      pagination={{
        clickable: true,
        dynamicBullets: true
      }}
      modules={[Keyboard, Navigation, Pagination]}
    >
      {homecooks.map((cook, index) => (
          <SwiperSlide style={props.func(cook)} className="card-wrapper" key={index}>
            <Link to ={`/sellers/${cook.name}`} style={{textDecoration: 'none'}}>
              <FoodCard
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
          </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FoodSlider;
