import React, {useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router';
import axios from "axios";
import homecooks from "../homecooks";
import Navbar from "./Navbar";
import woman from "../assets/images/woman.png";
import veg from "../assets/images/veg.png";
import nonVeg from "../assets/images/non-veg.png";
import omni from "../assets/images/omni.png";

function SellerDetails() {
  const { sellerId } = useParams();
  const sellerDetails = homecooks.find(item => item.name === sellerId);

  function parsed(props) {
    const parsed = parseInt(props / 5, 10) * 5;
    return `${parsed}+ orders`;
  }
  const [activeCategory, setActiveCategory] = useState('riceDelights');

  function convertCamelCaseToNormalText(camelCaseText) {
  const normalText = camelCaseText.replace(/([a-z])([A-Z])/g, '$1 $2');
  const formattedText = normalText.charAt(0).toUpperCase() + normalText.slice(1);
  return formattedText;
}
const demo = homecooks[0];
const categoryRef = useRef(null);

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

function handleIntersection(entries, observer) {
  if (isUserClick.current) return;

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveCategory(entry.target.dataset.category);
    }
  });
}

const debouncedHandleIntersection = debounce(handleIntersection, 0);
const [observer, setObserver] = useState(null);
const isUserClick = useRef(false);
const categoryRefs = useRef(new Map());

useEffect(() => {
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
}, [observer]);

useEffect(() => {
  if (categoryRefs.current.size > 0) {
    categoryRefs.current.forEach((ref, category) => {
      if (observer) {
        observer.observe(ref.current);
      }
    });
  }
}, [observer, categoryRefs]);

const [isSticky, setIsSticky] = useState(false);
const catgorRef = useRef(null);
let catgorOffsetTop=9999;

useEffect(() => {
  const updateCatgorOffsetTop = () => {
    if (catgorRef.current && catgorRef.current.offsetTop) {
      catgorOffsetTop = catgorRef.current.offsetTop;
    }
  }
  window.addEventListener("resize", updateCatgorOffsetTop);
  updateCatgorOffsetTop();
}, []);

useEffect(() => {
  const handleScroll = () => {
    if (catgorRef.current) {
      setIsSticky(window.pageYOffset >= catgorOffsetTop);
    }
  };
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

const [isClick, setClick] = useState(false);

useEffect(() => {
  if ((isSticky && categoryRef.current) || isClick) {
    isUserClick.current = true;
    if(isSticky) {
      window.scrollTo({
        top: categoryRef.current.offsetTop-100,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: categoryRef.current.offsetTop-180,
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
      observer.observe(categoryRef.current);
    }
  } else {
    window.scrollTo(0, 0);
  }
}, [activeCategory, observer]);

const [totalItems, setTotalItems] = useState(0);
const [totalPrice, setTotalPrice] = useState(0);
const [dishQty, setdishQty] = useState({});

useEffect(() => {
  const toCart = document.getElementsByClassName('bottom-div')[0];
  if(totalItems == 0) {
    toCart.style.display = 'none';
  } else {
    toCart.style.display = 'flex';
  }
}, [totalItems]);

const handleCart = async (name, price, qty) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        sellerName: sellerDetails.name,
        dishName: name,
        dishPrice: price,
        dishQuantity: qty
      };
      const response = await axios.post("http://localhost:5000/api/cartSummary", data);
      resolve(response.data);
    } catch (error) {
      console.error(error);
    }
  });
}

const fetchCartInfo = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/cartSummary', {
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
  const toCart = document.getElementsByClassName('bottom-div')[0];
  button.classList.add('hidden');
  toCart.style.display = 'flex';
  toCart.classList.add('hidden');
  setTotalItems(totalItems+qty);
  setTotalPrice(totalPrice + qty*parseInt(dish.price.substring(1)));

  handleCart(dish.name, dish.price, qty);

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
  setTotalPrice(totalPrice + parseInt(dish.price.substring(1)));

  handleCart(dish.name, dish.price, counterValue.textContent);
};

const handleDecrement = (event, dish) => {
  const counterValue = event.target.nextElementSibling;
  const newValue = parseInt(counterValue.textContent) - 1;
  if (newValue >= 0) {
    setTotalItems(totalItems-1);
    setTotalPrice(totalPrice - parseInt(dish.price.substring(1)));

    handleCart(dish.name, dish.price, newValue);
  }
  if(newValue === 0) {
    const counter = event.target.parentElement;
    const addButton = counter.previousElementSibling;
    counter.classList.add('hidden');
    setTimeout(() => {
      addButton.style.display = 'block';
      counter.style.display = 'none';
      addButton.classList.remove('hidden');
    }, 300);
  } else {
    counterValue.textContent = newValue;
  }
};

  return (
    <>
      <Navbar />
      <div className="seller-div">
        <div className="seller-subdiv">
          <div className="top-bar"></div>
          <img className="seller-food-img" src={sellerDetails.imgURL} alt="food-img" />
          <div>
            <div className="sellerName-div">
              <img
                className="avatar-img"
                src={woman}
                alt="avatar-img"
              />
              <h1 className="sellerName"> {sellerDetails.name} </h1>
            </div>
            <div>
              <div className="quote-div">“</div>
              <div className="tag-line"></div>
              <p className="tag">{sellerDetails.quote}</p>
              <div className="tag-line"></div>
            </div>
            <div className="sub-info seller-sub-info">
              <p>serves 1</p>
              <span className="span">•</span>
              <div className="star-div" style={{width: '1.2rem', marginRight: '-10%'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="#349E46">
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                </svg>
              </div>
              <span style={{color: '#349E46'}}>{sellerDetails.rating}</span>
              <span className="span">•</span>
              <p>{parsed(sellerDetails.noOfOrders)}</p>
            </div>
          </div>
          <img className="seller-food-img blurred-img" src={sellerDetails.imgURL} alt="food-img" />
          <div className="bottom-bar"></div>
        </div>
      </div>
      <div className="par">
      <div className={`catgor ${isSticky ? "sticky" : ""}`} ref={catgorRef}>
      <div>
        <h2 className={`ca ${activeCategory==='riceDelights'?'activa': ''}`}
            onClick={()=> {setActiveCategory('riceDelights'); setClick(true)}} ref={categoryRef}>Rice Delights</h2></div>
      <div>
        <h2 className={`ca ${activeCategory==='curryMagic'?'activa': ''}`}
            onClick={()=> {setActiveCategory('curryMagic'); setClick(true)}}  ref={categoryRef}>Curry Magic</h2></div>
      <div>
        <h2 className={`ca ${activeCategory==='breadBonaza'?'activa': ''}`}
            onClick={()=> {setActiveCategory('breadBonaza'); setClick(true)}}  ref={categoryRef}>Bread Bonaza</h2></div>
      <div>
        <h2 className={`ca ${activeCategory==='snackAttack'?'activa': ''}`}
            onClick={()=> {setActiveCategory('snackAttack'); setClick(true)}}  ref={categoryRef}>Snack Attack</h2></div>
      <div>
        <h2 className={`ca ${activeCategory==='refreshingBeverages'?'activa': ''}`}
            onClick={()=> {setActiveCategory('refreshingBeverages'); setClick(true)}}  ref={categoryRef}>Refreshing Beverages</h2></div>
      </div>
      <div className="food-main-contain">
        <div className={`filterSort ${isSticky ? "sticky" : ""}`}>
          <div style={{display: 'flex'}}>
            <div className="select">Select</div>
            <div className="filterImg">
              <div className="choiceDiv"><img className="choice acti" src={omni}/></div>
              <div className="choiceDiv"><img className="choice" src={veg}/></div>
              <div className="choiceDiv"><img className="choice" src={nonVeg}/></div>
            </div>
          </div>
          <div className="yeah">
            <div className="sortText">Sort/Filter</div>
            <i class="fa-solid fa-sort faso"></i>
          </div>
        </div>
      {Object.keys(demo.dishes).map((dishCategory) => (
            <div key={dishCategory} className="bap" style={{marginTop: '50px'}}>
              <h2 id={dishCategory} data-category={dishCategory} ref ={activeCategory === dishCategory ? categoryRef: null} style={{ margin: '18px 84px' }}>{convertCamelCaseToNormalText(dishCategory)}</h2>
              <div className="food-row">
              {demo.dishes[dishCategory].map((dish, dishIndex) => (
                <div className="food-wrapper" style={{marginLeft: "3.6%"}}>
                <div className="food-contain" key={dishIndex}>
                  <div className="food-text">
                    <h2 style={{fontSize: '22px'}}>{dish.name}</h2>
                    <p className="foodParag">{dish.desc.substring(0, 42) + "..."}</p>
                    <h3 className="dishPrice">{dish.price}</h3>
                  </div>
                  <img className="foody" src={dish.imgURL} alt="food-img" />
                </div>
                <div className="button-container">
                <button className={`theButton ${dishQty[dish.name]>0 ? 'hidden' : ""}`} onClick={(e) => handleButtonClick(e, dish, 1)}> Add</button>
                  <div className="counter" style={{display: dishQty[dish.name]>0 ? "flex" :"none"}}>
                    <button className="counter-button" onClick={(e) => handleDecrement(e, dish)}>-</button>
                    <span className="counter-value">{dishQty[dish.name]>0 ? dishQty[dish.name] : 1}</span>
                    <button className="counter-button" onClick={(e) => handleIncrement(e, dish)} > +</button>
                  </div>
                </div>
                </div>
              ))}
              </div>
            </div>
          ))}
          </div>
      </div>
      <div className="bottom-div">
        <div className="itemsprice">
          <h4 className="totalItems">{totalItems} {totalItems===1 ? 'item' : 'items'}</h4>
          <span className="span oh">|</span>
          <h4 className="totalPrice">₹{totalPrice}</h4>
        </div>
        <button className="toCheckout">
          <Link className="custom-link" to="/checkout">
            <div className="continue-div">
              CONTINUE
            </div>
          </Link>
        </button>
      </div>
    </>
  );
}

export default SellerDetails;
