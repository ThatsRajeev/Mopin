import React from "react";
import makers from "../data/makers";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Keyboard, Navigation } from "swiper";

const Makers = () => {
  const params = {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  };

  return (
    <Swiper
      {...params}
      className="slide-container makers-slide-container"
      loop={false}
      slidesPerView={4}
      spaceBetween={14}
      fadeEffect={true}
      loopPreventsSliding={0}
      slidesPerGroupSkip={2}
      grabCursor={true}
      keyboard={{
        enabled: true
      }}
      breakpoints={{
        0: {
          slidesPerView: 1.3
        },
        430: {
          slidesPerView: 2
        },
        668: {
          slidesPerView: 3
        },
        1080: {
          slidesPerView: 4
        }
      }}
      scrollbar={false}
      navigation={true}
      modules={[Keyboard, Navigation]}
    >
      {makers.map((maker, index) => (
        <SwiperSlide key={index} className="card-wrapper" key={index}>
          <div className="makers-container">
            <div className="makers-ellipse">
              <div style={{display: "flex", backgroundColor: "#fff", borderRadius: "50%"}}>
                <img className="makers-img" src={maker.imgURL} alt="makers-img" />
              </div>
            </div>
            <div className="maker-div">
              <h3>{maker.name}</h3>
              <p>{maker.story}</p>
              <div>
                <button href="#" className="read-btn">
                  <span>Read her story</span>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Makers;
