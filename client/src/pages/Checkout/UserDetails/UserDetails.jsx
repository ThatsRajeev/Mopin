import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useUserAuth } from "../../../context/AuthContext";
import fetchUserData from "../../../utils/fetchUserData";
import fetchAddress from "../../../utils/fetchAddress";
import handlePayment from "../../../utils/handlePayment";
import Overlay from "../../../components/Overlay/Overlay";
import Login from "../../../components/Login/Login";
import ManageAddressContent from '../../../components/ManageAddressContent/ManageAddressContent';
import LogoutContent from "../../../components/LogoutContent/LogoutContent";
import "./UserDetails.css";

const UserDetails = ({ totalPrice, setdishInfo }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const [addressChoosen, setAddressChoosen] = useState(false);

  const { user } = useUserAuth();
  const [overlayParams, setOverlayParams] = useSearchParams();

  const toggleOverlay = (overlayType) => {
   setOverlayParams((prev) => {
     const isOpen = prev.get(overlayType) === "true";
     if (isOpen) {
       prev.delete(overlayType);
     } else {
       prev.set(overlayType, "true");
     }
     return prev;
   });
 };

  useEffect(() => {
    (async function() {
      try {
        if (user && Object.keys(user).length !== 0) {
          const res = await fetchUserData(user);
          setName(res.name);

          const addressData = await fetchAddress(user);
          setAddress(`${addressData.houseNo}, ${addressData.houseName}, ${addressData.landmark}, ${addressData.address}`);
          setAddressType(addressData.addressType);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user]);

  useEffect(() => {
    if(addressChoosen) {
      toggleOverlay('address')
    }
    const userDetailsContainerHeight = document.querySelector('.user-details-container-mob').clientHeight;
    document.querySelector('.order-summary').style.marginBottom = `${Math.max(userDetailsContainerHeight+16, 84)}px`;

  }, [addressChoosen]);

  useEffect(() => {
    if(overlayParams.get('address')) {
      setAddressChoosen(false);
    }
  }, [overlayParams])

  return (
    <>
      <div className="user-details-container pc-view">
        <div className="user-details-div">
          <div className="details-head">
            <div className="checkout-logo-div">
              <span className="material-symbols-outlined">person</span>
            </div>
            {name ? "Logged In" : <div className="login-insist">Login / Sign Up</div>}
          </div>
          {name ? (
            <>
              <div className="contact-details">
                <div>
                  <span>{name}</span>
                  <span>|</span>
                  {user.phoneNumber}
                </div>
                <a onClick={() => setShowLogout(true)} className="change-details"> Change User </a>
              </div>
              {showLogout && <LogoutContent active="Logout" toggleOverlay={() => setShowLogout(!showLogout)} />}
            </>
          ) : (
            <>
              <p className="login-insist-p">To place your order now, log in to your account </p>
              <Login />
            </>
          )}
        </div>

        <div className="vertical-line"></div>

        <div className="user-details-div">
          <div className="details-head">
            <div className="checkout-logo-div">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            {addressChoosen ? "Delivery Address" : <div className="login-insist">Choose Delivery Address</div>}
          </div>
          {addressChoosen ? (
            <div className="contact-details">
              <div>
                <span>{addressType}</span>
                <span>|</span>
                {address.substring(0, 48) + "..."}
              </div>
              <a onClick={() => setAddressChoosen(false)} className="change-details"> Change </a>
            </div>
          ) : (
            <div className="checkout-address-content">
              {name && <ManageAddressContent setAddressChoosen={setAddressChoosen}/> }
            </div>
          )}
        </div>

        <div className="vertical-line"></div>

        <div className="user-details-div">
          <div className="details-head">
            <div className="checkout-logo-div">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
            <div className="login-insist">Choose Payment Method</div>
          </div>
          <div className="contact-details">
            <button className="proceed-btn" onClick={() => handlePayment(totalPrice, setdishInfo)} disabled={!addressChoosen}>
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>

      <div className="user-details-container-mob mob-view">
        {!user || !addressChoosen ? (
          <div className="login-address-overlay">
            {overlayParams.get("login") && (
              <Overlay closeOverlay={() => toggleOverlay('login')}>
                <Login setShowProp={() => toggleOverlay('login')}/>
              </Overlay>
            )}
            {overlayParams.get("address") && (
              <div className="checkbox-container">
                <ManageAddressContent setAddressChoosen={setAddressChoosen} />
              </div>
            )}
             <button className="proceed-btn" onClick={() => {!user ? toggleOverlay('login') : toggleOverlay('address')}}>
              {!user ? "Login / SignUp" : "Choose Address"}
             </button>
          </div>
          ) : (
          <div className="contact-details mobile-details">
            <div className="contact-details" style={{flexDirection: "column"}}>
              <div className="checkout-dishinfo">
                <h3>Deliver to</h3>
                <a onClick={() => setAddressChoosen(false)} className="change-details"> Change </a>
              </div>
              <div className="bottom-container-address">
                {address}
              </div>
            </div>
            <button className="proceed-btn" onClick={() => {handlePayment(totalPrice, setdishInfo, name, user.phoneNumber, address)}}><h4>Proceed to Pay (₹{totalPrice+7+4})</h4></button>
        </div>
      )}
      </div>
      {overlayParams.get("address") && (
        <div className="backgroundOverlay" onClick={() => toggleOverlay('address')}></div>
      )}
    </>
  );
}

export default UserDetails;
