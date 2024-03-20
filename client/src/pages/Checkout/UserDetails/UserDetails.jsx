import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import { Toaster } from "react-hot-toast";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../context/AuthContext";
import fetchUserData from "../../../utils/fetchUserData";
import fetchAddress from "../../../utils/fetchAddress";
import handlePayment from "../../../utils/handlePayment";
import Overlay from "../../../components/Overlay/Overlay";
import Login from "../../../components/Login/Login";
import ManageAddressContent from '../../../components/ManageAddressContent/ManageAddressContent';
import LogoutContent from "../../../components/LogoutContent/LogoutContent";
import loader from "../../../assets/loader.svg";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import "./UserDetails.css";

const UserDetails = ({ dishes, subscriptions, costDetails }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const [addressChoosen, setAddressChoosen] = useState(false);
  const [loading, setLoading] = useState(false);
  const totalCost = Object.values(costDetails).reduce((sum, currentValue) => sum + currentValue, 0);

  const { user } = useUserAuth();
  const navigate = useNavigate();
  const [overlayParams, setOverlayParams] = useSearchParams();

  const toggleOverlay = (overlayType) => {
   setOverlayParams((prev) => {
     const isOpen = prev.get(overlayType) === "true";
     if (isOpen) {
       navigate(-1);
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
    if(addressChoosen && window.innerWidth < 768) {
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
      <Toaster
        position="bottom-center"
      />
      <div className="user-details-container pc-view">
        <div className="user-details-div">
          <div className="details-head">
            <div className="checkout-logo-div">
              <PersonOutlineOutlinedIcon />
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
              <LocationOnOutlinedIcon/>
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
              <AccountBalanceWalletOutlinedIcon/>
            </div>
            <div className="login-insist">Choose Payment Method</div>
          </div>
          <div className="contact-details">
            <Button sx={{width: '100%', textTransform: 'none'}} variant="contained" size="large" disabled={!addressChoosen || loading}
              onClick={() => {handlePayment(name, user.phoneNumber, address, dishes, subscriptions, totalCost, setLoading)}}>
              {loading ? 'Processing Payment...' : 'Proceed to Pay'}
              {loading && <img className="loader-img" src={loader} alt="load-img" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="user-details-container-mob mob-view">
        {!user || !addressChoosen ? (
          <div className="login-address-overlay">
            {overlayParams.get("login") && (
              <Overlay>
                <Login setShowProp={() => toggleOverlay('login')}/>
              </Overlay>
            )}
            {overlayParams.get("address") && (
              <div className="checkbox-container">
                <ManageAddressContent setAddressChoosen={setAddressChoosen} />
              </div>
            )}
             <Button sx={{width: '100%', textTransform: 'none'}} variant="contained" size="large" onClick={() => {!user ? toggleOverlay('login') : toggleOverlay('address')}}>
              {!user ? "Login / SignUp" : "Choose Address"}
            </Button>
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
            <Button sx={{width: '100%', textTransform: 'none'}} variant="contained" size="large" disabled={loading}
              onClick={() => {handlePayment(name, user.phoneNumber, address, dishes, subscriptions, totalCost, setLoading)}}>
              {loading ? 'Processing Payment...' : 'Proceed to Pay (₹' + totalCost + ')'}
              {loading && <img className="loader-img" src={loader} alt="load-img" />}
            </Button>
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
