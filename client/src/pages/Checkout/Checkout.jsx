import react, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useWindowResize from "../../hooks/useWindowResize";
import { fetchFullCartInfo } from "../../utils/fetchCartInfo";
import handleCart from "../../utils/handleCart";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Login from "../../components/Login/Login";
import ManageAddressContent from '../../components/ManageAddressContent/ManageAddressContent';
import LogoutContent from "../../components/LogoutContent/LogoutContent";
import { useUserAuth } from "../../context/AuthContext";
import fetchData from "../../utils/fetchData";
import fetchAddress from "../../utils/fetchAddress";
import Overlay from "../../components/Overlay/Overlay";

const Checkout = () => {
  const [name, setName] = useState("");
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [showAddressOverlay, setShowAddressOverlay] = useState(false);
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const [addressChoosen, setAddressChoosen] = useState(false);
  const [dishInfo, setdishInfo] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();
  const windowWidth = useWindowResize();

  useEffect(() => {
    (async function() {
      try {
        if (user && Object.keys(user).length !== 0) {
          const re = await fetchData(user);
          setName(re.name);

          const res = await fetchAddress(user);
          setAddress(
            `${res.houseNo}, ${res.houseName}, ${res.landmark}, ${res.address}`
          );
          setAddressType(res.addressType);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    fetchFullCartInfo(cart, setdishInfo, setTotalItems, setTotalPrice);
  }, []);

  const toggleOverlay = (overlayType) => {
    switch(overlayType) {
      case 'address':
        setShowAddressOverlay(!showAddressOverlay);
        break;
      case 'login':
        setShowLoginOverlay(!showLoginOverlay);
        break;
      default:
        break;
    }
  }

  const handleIncrement = (event, dish, seller) => {
    const counterValue = event.target.previousElementSibling;
    counterValue.textContent = parseInt(counterValue.textContent) + 1;
    setTotalItems(totalItems+1);
    setTotalPrice(totalPrice + parseInt(dish.dishPrice));

    handleCart(seller.sellerName, dish.dishName, dish.dishPrice, dish.dishDesc, dish.dishIsVeg, counterValue.textContent);
  };

  const handleDecrement = (event, dish, seller) => {
    const counterValue = event.target.nextElementSibling;
    const sellerIndex = dishInfo.findIndex((sell) => sell.sellerName === seller.sellerName);
    const newValue = parseInt(counterValue.textContent) - 1;

    handleCart(seller.sellerName, dish.dishName, dish.dishPrice, dish.dishDesc, dish.dishIsVeg, newValue);

    if (newValue >= 0) {
      setTotalItems(totalItems - 1);
      setTotalPrice(totalPrice - parseInt(dish.dishPrice));

      if (newValue === 0) {
        setdishInfo((prevDishInfo) => {
          const updatedDishInfo = [...prevDishInfo];

          if (sellerIndex !== -1) {
            const dishIndex = updatedDishInfo[sellerIndex].dishes.findIndex(
              currentDish => currentDish.dishName === dish.dishName
            );

            if (dishIndex !== -1) {
              updatedDishInfo[sellerIndex].dishes.splice(dishIndex, 1);
            }

            if (updatedDishInfo[sellerIndex].dishes.length === 0 && updatedDishInfo[sellerIndex].subs.length === 0) {
              return updatedDishInfo.filter(sellerInfo => sellerInfo.sellerName !== seller.sellerName);
            }
          }

          return updatedDishInfo;
        });
      } else {
        counterValue.textContent = newValue;
      }
    }
  };

  const removeSubs = (seller) => {
    let existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingSellerIndex = existingCart.findIndex(group => group.sellerName === seller.sellerName);

    if (existingSellerIndex !== -1) {
      if (seller.dishes.length === 0) {
        existingCart.splice(existingSellerIndex, 1);

        localStorage.setItem('cart', JSON.stringify(existingCart));

        setdishInfo((prevDishInfo) => {
          const updatedDishInfo = prevDishInfo.filter(sellerInfo => sellerInfo.sellerName !== seller.sellerName);
          return updatedDishInfo;
        });
      } else {
        existingCart[existingSellerIndex].subs = [];

        localStorage.setItem('cart', JSON.stringify(existingCart));

        setdishInfo((prevDishInfo) => {
          const updatedDishInfo = prevDishInfo.map(sellerInfo => {
            if (sellerInfo.sellerName === seller.sellerName) {
              sellerInfo.subs = [];
            }
            return sellerInfo;
          });
          return updatedDishInfo;
        });
      }
    }
  }

  const initPayment = (data)=> {
    const options = {
      key: "rzp_test_vEfERvWyBIr2EW",
      amount: data.amount,
      currency: data.currency,
      name: "Mopin",
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const {data} = await axios.post('https://mopin-server.vercel.app/api/payment/verify', {
          }, {
            withCredentials: true
          });
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#f16122",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  const handlePayment = async () => {
    try {
      const {data} = await axios.post('https://mopin-server.vercel.app/api/payment/orders', {
        amount: totalPrice+7+4
      }, {
        withCredentials: true
      });
      initPayment(data.data);

      setdishInfo({});
      setTotalItems(0);
      setTotalPrice(0);
      localStorage.removeItem('cart');

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar showAddress="none" header="Secure Checkout" showNavbar = {windowWidth < 768 ? "none" : ""}/>
      {dishInfo.length ? (
      <div className="checkout-container">
        <div className="checkout-div">
          <div className="delivery-details pc-view">
            <div className="user-details">
              <div className="details-head">
                <div className="checkout-logo-div">
                  <span className="material-symbols-outlined" style={{fontSize: '24px', margin: '0'}}>person</span>
                </div>
                {name ? "Logged In" : <div className="login-insist">Login / Sign Up</div>}
              </div>
              {name ?
              <div className="contact-details">
                <div>
                  <span style={{fontWeight: "600"}}>{name}</span>
                  <span style={{margin: '0 6px'}}>|</span>
                  {user.phoneNumber}
                </div>
                <a onClick={() => setShowLogout(true)} className="change-details"> Change User </a>
              </div> :
              <>
              <p className="login-insist-p">To place your order now, log in to your account </p>
              <Login fromCheckout='true'/></>
              }
            </div>
            {showLogout &&
            <LogoutContent active={showLogout} toggleOverlay={() => setShowLogout(!showLogout)} />
            }
            <div className="vertical-line"></div>

            <div className="user-details">
              <div className="details-head">
                <div className="checkout-logo-div">
                <span className="material-symbols-outlined" style={{fontSize: '24px', margin: '0'}}>location_on</span>
                </div>
                {addressChoosen ? "Delivery Address" : <div className="login-insist">Choose Delivery Address</div>}
              </div>
              {addressChoosen ?
              <div className="contact-details">
                <div>
                  <span style={{fontWeight: "600"}}>{addressType}</span>
                  <span style={{margin: '0 6px'}}>|</span>
                  {address.substring(0, 44) + "..."}
                </div>
                <a onClick={() => setAddressChoosen(false)} className="change-details"> Change </a>
              </div> :
              <div className="checkout-address-content">
                {name && <ManageAddressContent setAddressChoosen={setAddressChoosen}/> }
            </div>
              }
            </div>

            <div className="vertical-line"></div>

            <div className="user-details">
              <div className="details-head">
                <div className="checkout-logo-div">
                <span className="material-symbols-outlined" style={{fontSize: '24px', margin: '0'}}>account_balance_wallet</span>
                </div>
                <div className="login-insist">Choose Payment Method</div>
              </div>
              <div className="contact-details">
                <button className="proceed-btn" onClick={handlePayment} disabled={!addressChoosen}>Proceed to Pay</button>
              </div>
            </div>
          </div>

          <div className="order-summary">
            <div className="cart-div">
              <div className="mob-view">
                <div style={{display: 'flex', fontSize: '16px'}}>
                  <span className="material-symbols-outlined" style={{marginRight: '8px'}} onClick={() => navigate(-1)}>arrow_back_ios</span>
                </div>
              </div>
              Cart
            </div>
            {Array.isArray(dishInfo) && dishInfo.map((seller, index) => (
              (seller.dishes.length > 0 || seller.subs.length > 0) && (
                <div key={index} className="seller-section">
                  <h2>{seller.sellerName}</h2>
                  {Array.isArray(seller.subs) && seller.subs.map((subs, subsIndex) => (
                    <div className="subs-section" key={subsIndex}>
                      <h3>{subs.subsDays} days subscription</h3>
                      <div>
                        {subs.selectedMeals.map((meal, mealIndex) => (
                          <h2 key={mealIndex}>{meal}</h2>
                        ))}
                      </div>
                      <div style={{marginTop: '8px'}}>
                        <button onClick={() => removeSubs(seller)}>Remove</button>
                        <h3>₹{subs.subsPrice}</h3>
                      </div>
                    </div>
                  ))}
                  {Array.isArray(seller.dishes) && seller.dishes.map((dish, dishIndex) => (
                    <div key={dishIndex} className="ready-checkout">
                      <div className="checkout-dishinfo">
                        <div style={{display: 'flex'}}>
                          <div style={{display: 'inline', marginRight: '6px', fontSize: '20px'}}>
                            <svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {dish.dishIsVeg ?
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
                          <div className="dishname">{dish.dishName}</div>
                        </div>
                        <h3>₹{dish.dishPrice}</h3>
                      </div>
                      <div className="checkout-dishinfo">
                        <p>{dish.dishDesc}</p>
                        <div className="counter" style={{width: '72px', padding: '0.8%', transform: 'unset'}}>
                          <button className="counter-button" onClick={(e) => handleDecrement(e, dish, seller)}>-</button>
                          <span className="counter-value" style={{fontSize: '14px'}}>{dish.dishQty}</span>
                          <button className="counter-button" onClick={(e) => handleIncrement(e, dish, seller)} > +</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ))}

            <div className="ready-checkout">
              <h4 style={{marginBottom: '4px'}}>APPLY COUPON</h4>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <p>Explore available offers</p>
                <span className="material-symbols-outlined" style={{margin: '0'}}>chevron_right</span>
              </div>
            </div>
            <div className="ready-checkout" style={{marginBottom: '6rem'}}>
              <h4>Bill Details</h4>
              <div className="price-details">
                <p>Item Total</p>
                <p>₹{totalPrice}</p>
              </div>
              <div className="price-details">
                <p>Packaging & Delivery</p>
                <p>₹7</p>
              </div>
              <div className="price-details">
                <p>Govt Taxes</p>
                <p>₹4</p>
              </div>
              <div style={{border: '1px solid rgb(0,0,0,0.12)', margin: '8px 0'}}></div>
              <div className="checkout-dishinfo">
                <h4 style={{marginTop: '4px'}}>To Pay</h4>
                <h4>₹{totalPrice+7+4}</h4>
              </div>
            </div>
          </div>
        </div>
      </div> ) : (
      <div className="empty-cart">
        <div className="empty-cart-img"></div>
        <h3>Your cart is empty</h3>
        <p>You can go back back to homepage to view homechefs</p>
        <button className="explore-btn" onClick={() => navigate("/")}>Explore Food</button>
      </div>
      )}

      {dishInfo.length>0 && (
        <div className="cart-container mob-view" style={{display: 'block'}}>
          {!user || !addressChoosen ? (
            <div className="contact-details" style={{margin: '0', flexDirection: 'column'}}>
              {showLoginOverlay && (
                <Overlay isOpen={showLoginOverlay} closeOverlay={() => setShowLoginOverlay(false)}>
                  <Login setShowProp={toggleOverlay}/>
                </Overlay>
              )}
              {showAddressOverlay && (
                <Overlay isOpen={showAddressOverlay} closeOverlay={() => setShowAddressOverlay(false)} unsetDims="true">
                  <ManageAddressContent setAddressChoosen={setAddressChoosen} />
                </Overlay>
              )}
               <button className="proceed-btn" onClick={() => {!user ? setShowLoginOverlay(true) : setShowAddressOverlay(true)}}>
                {!user ? "Login / SignUp" : "Choose Address"}
               </button>
            </div>
            ) : (
            <div className="contact-details" style={{margin: '8px 0', flexDirection: 'column'}}>
              <div className="contact-details" style={{flexDirection: 'column', margin: '0 0 14px'}}>
                <div className="checkout-dishinfo">
                  <h3>Deliver to</h3>
                  <a onClick={() => setAddressChoosen(false)} className="change-details" style={{color: "#f16122"}}> Change </a>
                </div>
                <div className="bottom-container-address">
                  {address}
                </div>
              </div>
              <button className="proceed-btn" onClick={handlePayment}><h4>Proceed to Pay (₹{totalPrice+7+4})</h4></button>
          </div>
        )}
        </div>
      )}
    </>
  )
}

export default Checkout;
