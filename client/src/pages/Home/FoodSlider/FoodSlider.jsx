import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../store/productsSlice";
import { Link } from "react-router-dom";
import "./FoodSlider.css"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

import FoodItemCard from "../FoodItemCard/FoodItemCard";
import homecooks from "../../../data/homecooks";

// import required modules
import { Keyboard, Navigation, Pagination, FreeMode } from "swiper/modules";

const FoodSlider = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productsStatus = useSelector((state) => state.products.status);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
      speed={320}
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
      {homecooks
        .filter(cook => props.func(cook))
        .map((cook, index) => (
          <SwiperSlide className="card-wrapper" key={index}>
            <Link to={`/sellers/${cook.name}`} style={{ textDecoration: 'none' }}>
              <FoodItemCard
                key={index}
                cardType={"food"}
                name={cook.name}
                img={cook.imgURL}
                foodType={cook.foodType}
                rating={cook.rating}
                feeds={cook.feeds}
                noOfOrders={cook.noOfOrders}
                minPrice={cook.minPrice}
              />
            </Link>
          </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FoodSlider;
