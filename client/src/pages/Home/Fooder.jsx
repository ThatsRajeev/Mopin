import React from "react";
import regionalFoods from "../../data/regionalFoods";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/grid";

// import required modules
import { Keyboard, Navigation, Grid } from "swiper/modules";

const Fooder = () => {
  const params = {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  };

  return (
    <Swiper
      {...params}
      className="slide-container fooder-slide-container"
      loop={false}
      slidesPerView={3}
      spaceBetween={35}
      fadeEffect={true}
      loopPreventsSliding={0}
      slidesPerGroupSkip={2}
      grabCursor={true}
      keyboard={{
        enabled: true
      }}
      grid={{ rows: 1}}
      breakpoints={{
        0: {
          slidesPerView: 3.6,
          spaceBetween: 20,
          grid: {
            rows: 2,
            slidesPerColumn: 2,
            fill: "row"
          }

        },
        550: {
          slidesPerView: 4,
          spaceBetween: 25
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 30
        },
        1080: {
          slidesPerView: 6,
          spaceBetween: 35
        }
      }}
      scrollbar={false}
      navigation={true}
      modules={[Keyboard, Navigation, Grid]}
    >
      {regionalFoods.map((foodItem, index) => (
        <SwiperSlide className="card-wrapper" key={index}>
          <div className="fooder-div">
            <img
              className="regional-food-img"
              src={foodItem.imgURL}
              alt="food-img"
            />
            <h2 className="regional-food-name">{foodItem.name}</h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Fooder;
