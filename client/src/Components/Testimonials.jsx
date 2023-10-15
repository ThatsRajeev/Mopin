import React, { useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import testimonials from "../Testimonials";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper";

const Testimonials = () => {
  const [animate, setAnimate] = useState(false);
  const [changeIndex, setChangeIndex] = useState('previousIndex');
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [invisibleIndex, setInvisibleIndex] = useState(2);
  const [previousIndex, setpreviousIndex] = useState(testimonials.length-1);

  const handleSlideChange = (swiper) => {
    var e;
    if(changeIndex === 'previousIndex') {
      setpreviousIndex((invisibleIndex+1)% testimonials.length);
      e = document.getElementsByClassName("active");
      e[0].classList.remove("zoom-in");
      e = document.getElementsByClassName("next");
      e[0].classList.add("zoom-in");

      e = document.getElementsByClassName("invisible");
      e[0].classList.remove("lost");
      e = document.getElementsByClassName("previous");
      e[0].classList.add("lost");
      setChangeIndex('activeIndex');

    } else if(changeIndex === 'activeIndex') {
      setActiveIndex((previousIndex+1)% testimonials.length);
      e = document.getElementsByClassName("next");
      e[0].classList.remove("zoom-in");
      e = document.getElementsByClassName("invisible");
      e[0].classList.add("zoom-in");

      e = document.getElementsByClassName("previous");
      e[0].classList.remove("lost");
      e = document.getElementsByClassName("active");
      e[0].classList.add("lost");
      setChangeIndex('nextIndex');

    } else if(changeIndex === 'nextIndex') {
      setNextIndex((activeIndex+1)% testimonials.length);
      e = document.getElementsByClassName("invisible");
      e[0].classList.remove("zoom-in");
      e = document.getElementsByClassName("previous");
      e[0].classList.add("zoom-in");

      e = document.getElementsByClassName("active");
      e[0].classList.remove("lost");
      e = document.getElementsByClassName("next");
      e[0].classList.add("lost");
      setChangeIndex('invisibleIndex');
    } else {
      setInvisibleIndex((nextIndex + 1)% testimonials.length);
      e = document.getElementsByClassName("previous");
      e[0].classList.remove("zoom-in");
      e = document.getElementsByClassName("active");
      e[0].classList.add("zoom-in");

      e = document.getElementsByClassName("next");
      e[0].classList.remove("lost");
      e = document.getElementsByClassName("invisible");
      e[0].classList.add("lost");
      setChangeIndex('previousIndex');
    }

    setAnimate(true);
    setTimeout(() => {
    setAnimate(false);
  }, 899);
  };

  return (
    <div className="testimonials-container">
      <Swiper
        className="slide-container testimonials-slide-container"
        slidesPerView={1}
        spaceBetween={50}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false
        }}
        fadeEffect={true}
        loopPreventsSliding={true}
        slidesPerGroupSkip={2}
        grabCursor={true}
        keyboard={{
          enabled: true
        }}
        scrollbar={false}
        navigation={false}
        simulateTouch={false}
        onSlideChange={handleSlideChange}
        rebuildonupdate={"true"}
        allowSlidePrev={false}
        modules={[Autoplay]}
      >
        {testimonials.map((test, index) => (
          <SwiperSlide className="card-wrapper" key={index}>
            <div id="testimonials-content">
              <div className="quote-container">
                <h1 className="testimonial-quote">“</h1>
              </div>
              <div className="testimonial-div">
                <blockquote>{test.testimonial}</blockquote>
              </div>
              <div className="author-container">
                <h2 className="author-h2">
                  <span>{test.author}</span>
                  <span className="dash">&mdash;</span>
                  <span className="location">{test.location}</span>
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <span class="material-symbols-outlined" style={{margin: 'auto'}}>arrow_left</span>

      <div className={`testimonial-image-container container-animation ${animate ? 'play' : ''}`}>
        <div className={`animation-div div-animation ${animate ? 'play' : ''}`} style={{top:'0'}}>
          <img
            src={testimonials[previousIndex].imgURL}
            alt={testimonials[previousIndex].author}
            className="testimonial-image previous"
          />
        </div>
        <div className={`animation-div div-animation ${animate ? 'play' : ''}`}  style={{left:'0'}}>
          <img
            src={testimonials[activeIndex].imgURL}
            alt={testimonials[activeIndex].author}
            className="testimonial-image active zoom-in"
          />
        </div>
        <div className={`animation-div div-animation ${animate ? 'play' : ''}`} style={{bottom:'0'}}>
          <img
            src={testimonials[nextIndex].imgURL}
            alt={testimonials[nextIndex].author}
            className="testimonial-image next"
          />
        </div>
        <div className={`animation-div div-animation ${animate ? 'play' : ''}`}  style={{right:'0'}}>
          <img
            src={testimonials[invisibleIndex].imgURL}
            alt={testimonials[invisibleIndex].author}
            className="testimonial-image invisible lost"
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
