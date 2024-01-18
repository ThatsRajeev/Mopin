import React, { useState, useEffect, useRef } from "react";
import debounce from "../../../utils/debounce";
import { getFilteredDishes, getDayOfTheWeek } from "../../../utils/getFilteredDishes";
import homecooks from "../../../data/homecooks";
import handleCart from "../../../utils/handleCart";
import DayDishes from "../DayDishes/DayDishes";
import "./MealFilterContainer.css";

const MealFilterContainer = ({ sellerDetails, dishQty, setTotalItems, setTotalPrice }) => {
  const daysInOrder = [0, 1, 2, 3, 4, 5, 6].map(offset => getDayOfTheWeek(offset));
  const [activeCategory, setActiveCategory] = useState(getDayOfTheWeek(0));
  const [activeSwitch, setActiveSwitch] = useState("All");
  const [isClick, setClick] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const debouncedHandleIntersection = debounce(handleIntersection, 0);
  const [observer, setObserver] = useState(null);
  const isUserClick = useRef(false);
  const spyRef = useRef(null);
  const spyDivRef = useRef(null);
  let categoryOffsetTop=9999;

  const handleButtonClick = (event, dish, qty) => {
    const button = event.target;
    const counter = button.nextElementSibling;
    button.classList.add('hidden');

    setTotalItems(prev => prev + qty);
    setTotalPrice(prev => prev + qty*parseInt(dish.price));

    handleCart(sellerDetails.name, dish.name, dish.price, dish.description, dish.isVeg, qty);

    setTimeout(() => {
      button.style.display = 'none';
      counter.style.display = 'flex';
      counter.classList.remove('hidden');
    }, 300);
  };

  const handleIncrement = (event, dish) => {
    const counterValue = event.target.previousElementSibling;
    counterValue.textContent = parseInt(counterValue.textContent) + 1;
    setTotalItems(prev => prev + 1);
    setTotalPrice(prev => prev + parseInt(dish.price));

    handleCart(sellerDetails.name, dish.name, dish.price, dish.description, dish.isVeg, counterValue.textContent);
  };

  const handleDecrement = (event, dish) => {
    const counterValue = event.target.nextElementSibling;
    const newValue = parseInt(counterValue.textContent) - 1;
    if (newValue >= 0) {
      setTotalItems(prev => prev - 1);
      setTotalPrice(prev => prev - parseInt(dish.price));

      handleCart(sellerDetails.name, dish.name, dish.price, dish.description, dish.isVeg, newValue);
    }
    if(newValue === 0) {
      const counter = event.target.parentElement;
      const addButton = counter.previousElementSibling;
      counter.classList.add('hidden');
      setTimeout(() => {
        addButton.style.display = 'flex';
        counter.style.display = 'none';
        addButton.classList.remove('hidden');
      }, 300);
    } else {
      counterValue.textContent = newValue;
    }
  };

  function handleIntersection(entries, observer) {
    if (isUserClick.current) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveCategory(entry.target.dataset.category);
      }
    });
  }

  useEffect(() => {
    // Effect 1: Intersection Observer setup
    if (!observer) {
      const newObserver = new IntersectionObserver(debouncedHandleIntersection, {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
      });
      setObserver(newObserver);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observer, spyRef, debouncedHandleIntersection]);

  useEffect(() => {
    // Effect 2: Handling Sticky Navigation
    const updatecategoryOffsetTop = () => {
      if (spyDivRef.current && spyDivRef.current.offsetTop) {
        categoryOffsetTop = spyDivRef.current.offsetTop;
      }
    }
    window.addEventListener("resize", updatecategoryOffsetTop);
    updatecategoryOffsetTop();

    const handleScroll = () => {
      if (spyDivRef.current) {
        setIsSticky(window.pageYOffset >= categoryOffsetTop);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", updatecategoryOffsetTop);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [spyDivRef, categoryOffsetTop]);

  useEffect(() => {
    // Effect 3: Scrolling on user click
    if (isClick) {
      isUserClick.current = true;
      if(isSticky) {
        window.scrollTo({
          top: spyRef.current.offsetTop-100,
          behavior: 'smooth',
        });
      } else {
        window.scrollTo({
          top: spyRef.current.offsetTop-180,
          behavior: 'smooth',
        });
      }

      if(isClick) {
        setClick(false);
      }

      setTimeout(() => {
        isUserClick.current = false;
      }, 1000);

      if (observer) {
        observer.observe(spyRef.current);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [activeCategory, observer]);

  return (
    <div className="dish-wrapper">
      <div className={`spy-container pc-view ${isSticky ? "sticky" : ""}`} ref={spyDivRef}>
        <ul>
        {daysInOrder.map(day => (
          <li key={day}>
            <h2 className={`${activeCategory===day ? 'active-spy' : ''}`}
                onClick={()=> {setActiveCategory(day); setClick(true)}} ref={day === activeCategory ? spyRef : null}>
                  {day === getDayOfTheWeek(0) ? 'Today' : day === getDayOfTheWeek(1) ? 'Tommorrow' : day}
            </h2>
          </li>
          ))}
        </ul>
      </div>
      <div>
        <div className={`vegNonVegFilter ${isSticky ? "sticky" : ""}`}>
          <div style={{display: 'flex'}}>
            <div className="vegNonVegFilter-title">Select</div>
            <div className="switch">
              <button className={`switch-btn ${activeSwitch==="Veg" ? "active-switch-btn" : ""}`} onClick={() => {setActiveSwitch("Veg")}}>Veg</button>
              <button className={`switch-btn ${activeSwitch==="All" ? "active-switch-btn" : ""}`} onClick={() => {setActiveSwitch("All")}}>All</button>
              <button className={`switch-btn ${activeSwitch==="Non Veg" ? "active-switch-btn" : ""}`} onClick={() => {setActiveSwitch("Non Veg")}}>Non Veg</button>
            </div>
          </div>
        </div>
        {getFilteredDishes(activeSwitch, setActiveCategory, daysInOrder, homecooks).map(({day, dishes}) => (
          <DayDishes
            key={day}
            day={day}
            dishes={dishes}
            dishQty={dishQty}
            handleButtonClick={handleButtonClick}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            activeCategory={activeCategory}
            spyRef={spyRef}
            getDayOfTheWeek={getDayOfTheWeek}
          />
        ))}
        </div>
      </div>
  )
}

export default MealFilterContainer;
