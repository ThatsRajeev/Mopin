import React, {useState, useEffect, useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router';
import axios from "axios";
import homecooks from "../data/homecooks";
import Navbar from "./Navbar";
import Footer from "./Footer";
import woman from "../assets/images/woman.png";

function SellerPage() {
  const { sellerId } = useParams();
  const sellerDetails = homecooks.find(item => item.name === sellerId);
  const [activeSwitch, setActiveSwitch] = useState("All");
  const debouncedHandleIntersection = debounce(handleIntersection, 0);
  const [observer, setObserver] = useState(null);
  const isUserClick = useRef(false);
  const [isSticky, setIsSticky] = useState(false);
  const spyRef = useRef(null);
  const spyDivRef = useRef(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dishQty, setdishQty] = useState({});
  let categoryOffsetTop=9999;

  const navigate = useNavigate();
  const breakpoint = 35 * parseFloat(getComputedStyle(document.documentElement).fontSize);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  function handleIntersection(entries, observer) {
     console.log('Intersection observed:', entries);
    if (isUserClick.current) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveCategory(entry.target.dataset.category);
      }
    });
  }

  const getDayOfTheWeek = (offset) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    today.setDate((today.getDate() + offset) % 7);
    return days[today.getDay()];
  }

  const [activeCategory, setActiveCategory] = useState(getDayOfTheWeek(0));

  function getSortOrder(dish) {
    for(let i=0; i<7; i++) {
      if(dish.availability.some(avail => avail.day === getDayOfTheWeek(i))) {
        return i;
      }
    }
  }

  const sortedDishes = Object.keys(homecooks[0].dishes)
    .map((dishCategory) => homecooks[0].dishes[dishCategory])
    .flat()
    .sort((dishA, dishB) => getSortOrder(dishA) - getSortOrder(dishB));

  const daysInOrder = [0, 1, 2, 3, 4, 5, 6].map(offset => getDayOfTheWeek(offset));

  const sortedAndGroupedDishes = daysInOrder.map(day => {
    const dayDishes = sortedDishes.filter(dish => dish.availability.some(avail => avail.day === day));

    return {
      day,
      dishes: dayDishes,
    };
  });

  const filteredDishes = sortedAndGroupedDishes
  .map(({ day, dishes }) => {
    const filteredDishes = dishes.filter((dish) => {
      if (activeSwitch === "All") {
        return true;
      } else if (activeSwitch === "Veg") {
        return dish.isVeg;
      } else if (activeSwitch === "Non Veg") {
        return !dish.isVeg;
      }
      return true;
    });

    return {
      day,
      dishes: filteredDishes,
    };
  });

  const handleCart = async (name, price, desc, isVeg, qty) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = {
          sellerName: sellerDetails.name,
          dishName: name,
          dishPrice: price,
          dishDesc: desc,
          dishIsVeg: isVeg,
          dishQuantity: qty
        };
        const response = await axios.post("https://mopin-server.vercel.app/api/cartSummary", data);
        resolve(response.data);
      } catch (error) {
        console.error(error);
      }
    });
  }

  const fetchCartInfo = async () => {
    try {
      const response = await axios.get('https://mopin-server.vercel.app/api/cartSummary', {
        withCredentials: true
      });
      const cart = response.data;

      const newdishQty = {};
      let totalItemCount = 0;
      let totalPriceCount = 0;

      cart.forEach(item => {
        newdishQty[item.dishName] = item.dishQuantity;
        totalItemCount = totalItemCount+item.dishQuantity;
        totalPriceCount = totalPriceCount+item.dishQuantity*parseInt(item.dishPrice.substring(1));
      });
      setdishQty(newdishQty);
      setTotalItems(totalItemCount);
      setTotalPrice(totalPriceCount);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartInfo();
  }, []);

  const handleButtonClick = (event, dish, qty) => {
    const button = event.target;
    const counter = button.nextElementSibling;
    const toCart = document.getElementsByClassName('bottom-container')[0];
    button.classList.add('hidden');
    toCart.style.display = 'flex';
    toCart.classList.add('hidden');
    setTotalItems(totalItems+qty);
    setTotalPrice(totalPrice + qty*parseInt(dish.price));

    handleCart(dish.name, dish.price, dish.description, dish.isVeg, qty);

    setTimeout(() => {
      toCart.classList.remove('hidden');
    }, 24);
    setTimeout(() => {
      button.style.display = 'none';
      counter.style.display = 'flex';
      counter.classList.remove('hidden');
    }, 300);
  };

  const handleIncrement = (event, dish) => {
    const counterValue = event.target.previousElementSibling;
    counterValue.textContent = parseInt(counterValue.textContent) + 1;
    setTotalItems(totalItems+1);
    setTotalPrice(totalPrice + parseInt(dish.price));

    handleCart(dish.name, dish.price, dish.description, dish.isVeg, counterValue.textContent);
  };

  const handleDecrement = (event, dish) => {
    const counterValue = event.target.nextElementSibling;
    const newValue = parseInt(counterValue.textContent) - 1;
    if (newValue >= 0) {
      setTotalItems(totalItems-1);
      setTotalPrice(totalPrice - parseInt(dish.price));

      handleCart(dish.name, dish.price, dish.description, dish.isVeg, newValue);
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

  const [isClick, setClick] = useState(false);

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

  const [backFavSticky, setBackFavSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setBackFavSticky(window.pageYOffset > 178);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <>
      <Navbar showNavbar = {windowWidth < breakpoint ? "none" : ""}/>
      <div className="seller-container">
        <div className="seller-div-pc pc-view">
          <span className="top-bar"></span>
          <img className="seller-food-img" src={sellerDetails.imgURL} alt="food-img" />
          <div className="seller-details-div">
            <div className="sellerName-div">
              <img className="avatar-img" src={woman} alt="avatar-img" />
              <h1 className="sellerName"> {sellerDetails.name} </h1>
            </div>
            <div>
              <div className="quote-div">“</div>
              <span className="tag-line"></span>
              <p className="tag">{sellerDetails.quote}</p>
              <span className="tag-line"></span>
            </div>
            <div className="sub-info seller-sub-info">
              <p>serves 1</p>
              <span className="span">•</span>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="#349E46" style={{width: '1.2rem'}}>
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                </svg>
                <span style={{color: '#349E46'}}>{sellerDetails.rating}</span>
              </div>
              <span className="span">•</span>
              <p>{parseInt(sellerDetails.noOfOrders/ 5, 10) * 5} + orders</p>
            </div>
          </div>
          <img className="seller-food-img blurred-img" src={sellerDetails.imgURL} alt="food-img" />
          <span className="bottom-bar"></span>
        </div>
        <div className="seller-div-mobile mob-view">
          <div className="backFavBtn-wrapper">
            <div className={`backFavBtn-div ${backFavSticky ? "backFavBtn-sticky" : ""}`}>
              <span class="material-symbols-outlined backFavBtn-icon" onClick={() => navigate(-1)}>arrow_back_ios</span>
              <div>
                <div>{sellerDetails.name}</div>
                <div>{sellerDetails.foodType}</div>
              </div>
              <span class="material-symbols-outlined backFavBtn-icon">favorite</span>
            </div>
          </div>
          <div className="seller-details-wrapper">
            <img src={sellerDetails.imgURL} alt="food-img" />
            <div>
              <h1> {sellerDetails.name} </h1>
              <p>{sellerDetails.foodType}</p>
            </div>
            <div className="sub-info-mobile">
              <p>serves 1</p>
              <span className="span">•</span>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="#349E46" style={{width: '0.96rem'}}>
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                </svg>
                <span style={{color: '#349E46'}}>{sellerDetails.rating}</span>
              </div>
              <span className="span">•</span>
              <p>{parseInt(sellerDetails.noOfOrders/ 5, 10) * 5} + orders</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dish-wrapper">
        <div className={`spy-container ${isSticky ? "sticky" : ""}`} ref={spyDivRef}>
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
          {filteredDishes.map(({day, dishes}) => (
            <div key={day}>
            {dishes.length > 0 && (
              <>
                <h2 id={day} data-category={day} ref ={activeCategory === day ? spyRef: null} className="weekday">
                  {day === getDayOfTheWeek(0) ? 'Today' : day === getDayOfTheWeek(1) ? 'Tommorrow' : day}
                </h2>
                <div className="food-cards-container">
                  {dishes.map((dish, dishIndex) => (
                  <div>
                    <h3 className="meal-time">{dish.availability[0].meal}</h3>
                    <div className="seller-food-container" key={dishIndex}>
                      <div className="food-details">
                        <div>
                          <div style={{display: 'inline', marginRight: '6px'}}>
                            <svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {dish.isVeg ?
                              <>
                                <path d="M2 0.5H8C8.82843 0.5 9.5 1.17157 9.5 2V8C9.5 8.82843 8.82843 9.5 8 9.5H2C1.17157 9.5 0.5 8.82843 0.5 8V2C0.5 1.17157 1.17157 0.5 2 0.5Z" fill="white" stroke="#43B500"></path>
                                <circle cx="5" cy="5" r="2" fill="#43B500"></circle>
                              </> :
                              <>
                                <path d="M2 0.5H8C8.82843 0.5 9.5 1.17157 9.5 2V8C9.5 8.82843 8.82843 9.5 8 9.5H2C1.17157 9.5 0.5 8.82843 0.5 8V2C0.5 1.17157 1.17157 0.5 2 0.5Z" fill="white" stroke="#a5292a"></path>
                                <path d="M4.74019 2.825C4.85566 2.625 5.14434 2.625 5.25981 2.825L7.33827 6.425C7.45374 6.625 7.3094 6.875 7.07846 6.875H2.92154C2.6906 6.875 2.54626 6.625 2.66173 6.425L4.74019 2.825Z" fill="#a5292a"></path>
                              </>}
                            </svg>
                          </div>
                          {dish.name}
                        </div>
                        <p>{dish.description}</p>
                        <h3>₹{dish.price}</h3>
                      </div>
                      <img className="food-card-img" src={dish.imgURL} alt="food-img" />
                    </div>
                    <div className="button-container">
                    <button className={`add-btn ${dishQty[dish.name]>0 ? 'hidden' : ""}`} onClick={(e) => handleButtonClick(e, dish, 1)}> Add</button>
                      <div className="counter" style={{display: dishQty[dish.name]>0 ? "flex" :"none"}}>
                        <button className="counter-button" onClick={(e) => handleDecrement(e, dish)}>-</button>
                        <span className="counter-value">{dishQty[dish.name]>0 ? dishQty[dish.name] : 1}</span>
                        <button className="counter-button" onClick={(e) => handleIncrement(e, dish)} > +</button>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </>
            )}
            </div>
          ))}
          </div>
        </div>
        <div className="bottom-container" style={{opacity: totalItems ? '1' : '0'}}>
          <div className="itemsAndPrice">
            <h4>{totalItems} {totalItems===1 ? 'item' : 'items'}</h4>
            <span>|</span>
            <h4>₹{totalPrice}</h4>
          </div>
          <button className="toCheckout">
            <Link className="custom-link" to="/checkout">
              <div className="continue-div">
                CONTINUE
              </div>
            </Link>
          </button>
        </div>
      <Footer />
    </>
  );
}

export default SellerPage;