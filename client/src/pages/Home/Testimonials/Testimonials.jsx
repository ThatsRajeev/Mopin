import React, { useState, useEffect } from "react";
import "./Testimonials.css"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import testimonials from "../../../data/testimonials";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper/modules";

const Testimonials = () => {
  const [animate, setAnimate] = useState(false);
  const [changeIndex, setChangeIndex] = useState('previousIndex');
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [invisibleIndex, setInvisibleIndex] = useState(2);
  const [previousIndex, setpreviousIndex] = useState(testimonials.length - 1);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setKey((prevKey) => prevKey + 1);
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setAnimate(false);
    setChangeIndex('previousIndex');
    setActiveIndex(0);
    setNextIndex(1);
    setInvisibleIndex(2);
    setpreviousIndex(testimonials.length - 1);
  }, [key]);

  const handleSlideChange = (swiper) => {
    let hasUpdatedSlideClasses = false;

    swiper.on('transitionEnd', () => {
      if (!hasUpdatedSlideClasses) {
        updateSlideClasses();

        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
          hasUpdatedSlideClasses = false;
        }, 900);
      }
    });
  };

  const updateSlideClasses = () => {
    const elements = {
      previous: document.getElementsByClassName('previous')[0],
      active: document.getElementsByClassName('active')[0],
      next: document.getElementsByClassName('next')[0],
      invisible: document.getElementsByClassName('invisible')[0],
    };

    if (changeIndex === 'previousIndex') {
      setpreviousIndex((invisibleIndex + 1) % testimonials.length);
      elements.active.classList.remove('zoom-in');
      elements.invisible.classList.remove('lost');
      elements.next.classList.add('zoom-in');
      elements.previous.classList.add('lost');
      setChangeIndex('activeIndex');
    } else if (changeIndex === 'activeIndex') {
      setActiveIndex((previousIndex + 1) % testimonials.length);
      elements.next.classList.remove('zoom-in');
      elements.previous.classList.remove('lost');
      elements.invisible.classList.add('zoom-in');
      elements.active.classList.add('lost');
      setChangeIndex('nextIndex');
    } else if (changeIndex === 'nextIndex') {
      setNextIndex((activeIndex + 1) % testimonials.length);
      elements.invisible.classList.remove('zoom-in');
      elements.active.classList.remove('lost');
      elements.previous.classList.add('zoom-in');
      elements.next.classList.add('lost');
      setChangeIndex('invisibleIndex');
    } else {
      setInvisibleIndex((nextIndex + 1) % testimonials.length);
      elements.previous.classList.remove('zoom-in');
      elements.next.classList.remove('lost');
      elements.active.classList.add('zoom-in');
      elements.invisible.classList.add('lost');
      setChangeIndex('previousIndex');
    }
  };

  return (
    <div key={key} className="testimonials-container pc-view">
      <Swiper
        className="slide-container testimonials-slide-container"
        slidesPerView={1}
        spaceBetween={50}
        loop={true}
        autoplay={{
          delay: 9000,
          disableOnInteraction: false
        }}
        fadeEffect={true}
        loopPreventsSliding={true}
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

      <span class="material-symbols-outlined">arrow_left</span>

      <div className={`testimonial-image-container container-animation ${animate ? 'play' : ''}`}>
        <div className={`animation-div top ${animate ? 'play' : ''}`}>
          <img
            src={testimonials[previousIndex].imgURL}
            alt={testimonials[previousIndex].author}
            className="testimonial-image previous"
          />
        </div>
        <div className={`animation-div left ${animate ? 'play' : ''}`}>
          <img
            src={testimonials[activeIndex].imgURL}
            alt={testimonials[activeIndex].author}
            className="testimonial-image active zoom-in"
          />
        </div>
        <div className={`animation-div bottom ${animate ? 'play' : ''}`}>
          <img
            src={testimonials[nextIndex].imgURL}
            alt={testimonials[nextIndex].author}
            className="testimonial-image next"
          />
        </div>
        <div className={`animation-div right ${animate ? 'play' : ''}`}>
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
