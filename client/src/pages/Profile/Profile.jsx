import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import MapComponent from "../Checkout/MapComponent";
import { useUserAuth } from "../../context/AuthContext";
import fetchData from "../../utils/fetchData";
import fetchAddress from "../../utils/fetchAddress";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("");
  const [overlayVisible, setOverlayVisible] = useState(false);

  const { user, logOut } = useUserAuth();

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

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

  const navigate = useNavigate();

   useEffect(() => {
     (async function() {
       try {
         if (user && Object.keys(user).length !== 0) {
           const res = await fetchData(user);
           setName(res.name);
           setphoneNumber(res.phoneNumber);
           setEmail(res.email);

           const resp = await fetchAddress(user);
           setAddress(resp.apartmentNumber + ", " + resp.apartmentName + ", " +
                      resp.streetDetails + ", " + resp.address);
           setAddressType(resp.addressType);
         }
       } catch (e) {
         console.error(e);
       }
     })();
   }, [user]);

   const deleteAddress = async () => {
     try {
       const response = await axios.get('https://mopin-server.vercel.app/api/deletedata', {
         withCredentials: true
       });
       setShowDelete(false);

     } catch (error) {
       console.error(error);
     }
   };

   const handleLogout = async () => {
     try {
       logOut();
       navigate('/');

     } catch (error) {
       console.error(error);
     }
   };

    const lineStyle = {
    content: '""',
    height: '100%',
    width: '5px',
    background: '#fff',
  };

  const Overlay = ({ children, closeOverlay }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
      onClick={closeOverlay}
    >
      <div onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

  const [active, setActive] = useState("My Orders");
  const [showMap, setShowMap] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showLogout, setShowLogout] = useState(false);


  useEffect(() => {
    if (showMap || showDelete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showMap, showDelete])

const renderContent = () => {
  switch (active) {
    case "My Orders":
      return <MyOrdersContent />;
    case "Manage Address":
      return <ManageAddressContent />;
    case "Payment Methods":
      return <PaymentMethodsContent />;
    case "Subscriptions":
      return <SubscriptionsContent />;
    case "logout":
      return <LogoutContent />;
    default:
      return null;
  }
};

const MyOrdersContent = () => {
  return (
    <div className="component">
      <img className="default-img" src="https://drive.google.com/uc?id=1zp8cJ2Ygjlkm1--o-wTTlQEyb4dPhzUF" />
      <h2 style={{fontWeight: "500"}}>You don't have any orders!</h2>
      <button className="explore-btn">Explore Dishes</button>
    </div>
  )
};

const ManageAddressContent = () => {
  return (
    <div className="component address-comp">
        <div className="new-address-div addresses" onClick={() => {setShowMap(true)}}>
          <span className="material-symbols-outlined address-icon ">add_circle</span>
          <h3 style={{fontWeight: "100"}}> Add New Address </h3>
        </div>
      {showMap &&
        <Overlay closeOverlay={() => setShowMap(false)}>
          <div className="map-container">
            <button className="close-button" onClick={() => setShowMap(false)} style={{right: '-28px'}}>
              <span class="material-symbols-outlined" style={{marginRight: '0'}}>close</span>
            </button>
            <div className="mob-view">
              <div className="profile-head" onClick={() => setShowMap(false)}>
                <span class="material-symbols-outlined" style={{marginRight: '16px'}}>arrow_back</span>
                <p> Edit Address </p>
              </div>
            </div>
            <MapComponent setShowMap={setShowMap} />
          </div>
        </Overlay>
      }
      {address !== "" &&
    <div className="saved-address addresses">
      <div className="address-type-div">
        {addressType === "Home" &&<span className="material-symbols-outlined address-icon">home</span>}
        {addressType === "Office" &&<span className="material-symbols-outlined address-icon">apartment</span>}
        {(addressType !== "Home") && (addressType !== "Office")  &&<span className="material-symbols-outlined address-icon">person_pin_circle</span>}
        <p style={{fontWeight: '600'}}>{addressType}</p>
      </div>
      <p className="addressed">{address}</p>
      <div className="modify-div">
        <button className="modify" onClick={() => {setShowMap(true)}}><span class="material-symbols-outlined type-icon">edit</span></button>
        <button className="modify" onClick={() => {setShowDelete(true)}}><span class="material-symbols-outlined type-icon">delete</span></button>
        {showDelete &&
          <Overlay closeOverlay={() => setShowDelete(false)}>
            <div className="delete-container">
              <h3 className="delete-heading">Are you sure you want to delete the saved Address? </h3>
              <div style={{display: 'flex'}}>
                <button className="delete" onClick={deleteAddress}>Delete</button>
                <button className="cancel" onClick={() => setShowDelete(false)}>Cancel</button>
              </div>
              <button className="close-button" onClick={() => setShowDelete(false)}>
                <span class="material-symbols-outlined" style={{marginRight: '0'}}>close</span>
              </button>
            </div>
          </Overlay>
        }
      </div>
      </div>}
    </div>
  )
};


const PaymentMethodsContent = () => {
  return (
    <div className="component">
      <img className="default-img" src="https://drive.google.com/uc?id=1uYRNFfdPJJ8n_LAuRad1JZXOOPlxMLc3" />
      <h2 style={{fontWeight: "500"}}>We will add Payment methods soon!</h2>
      <button className="explore-btn">Explore Dishes</button>
    </div>
  )
};

const SubscriptionsContent = () => {
  return (
    <div className="component">
      <img className="default-img" src="https://drive.google.com/uc?id=1uYRNFfdPJJ8n_LAuRad1JZXOOPlxMLc3" />
      <h2 style={{fontWeight: "500"}}>We will add Subscriptions soon!</h2>
      <button className="explore-btn">Explore Dishes</button>
    </div>
  );
};

const LogoutContent = () => {
  return(
    <div className="component">
    {showLogout &&
      <Overlay closeOverlay={() => setShowLogout(false)}>
      <div className="delete-container">
        <h3 className="delete-heading">Are you sure you want to logout? </h3>
        <button className="delete" onClick={handleLogout}>Yes</button>
        <button className="cancel" onClick={() => {setShowLogout(false); setActive("My Orders"); setOverlayVisible(false);}}>Cancel</button>
        <button className="close-button" onClick={() => {setShowLogout(false);  setActive("My Orders")}}>
          <span class="material-symbols-outlined" style={{marginRight: '0'}}>close</span>
        </button>
      </div>
    </Overlay>}
    </div>
  )
};

  return (
    <>
    <Navbar showAddress="none"/>
    <div className="profile-container">
      <div className="profile-div">

        <div className="profile-subdiv">
          <div style={{display: "flex", padding: "16px"}}>
            <div className="user-icon">
            <span class="material-symbols-outlined" style={{fontSize: '36px', display: 'flex', justifyContent: 'center'}}>person</span>
            </div>
            <div style={{margin: "8px 12px"}}>
              <h4 style={{lineHeight: "1.5"}}>{name}</h4>
              <h4 style={{fontWeight: "500"}}>{phoneNumber}</h4>
            </div>
          </div>

          <ul>
            <div className="li-div">
            <div className={`li-subdiv ${active === "My Orders" ? "active-nav" : ""}`}
              onClick={() => {setActive("My Orders"); toggleOverlay()}}>
              <div className={`${active === "My Orders" ? "active-div" : ""}`} style={lineStyle}></div>
              <div className={`userInfo-icon ${active === "My Orders" ? "active-icon-div" : ""}`}>
                <span className={`material-symbols-outlined profile-icon ${active === "My Orders" ? "active-icon" : ""}`}>local_dining</span>
              </div>
              <li className = "profile-list">My Orders</li>
              <span class="material-symbols-outlined arrow-right mob-view">chevron_right</span>
            </div>
            </div>

            <div className="li-div">
              <div className={`li-subdiv ${active === "Manage Address" ? "active-nav" : ""}`}
                onClick={() => {setActive("Manage Address"); toggleOverlay()}}>
                <div className={`${active === "Manage Address" ? "active-div" : ""}`} style={lineStyle}></div>
                <div className={`userInfo-icon ${active === "Manage Address" ? "active-icon-div" : ""}`}>
                  <span className={`material-symbols-outlined profile-icon ${active === "Manage Address" ? "active-icon" : ""}`}>edit_location</span>
                </div>
                <li className = "profile-list">Manage Address</li>
                <span class="material-symbols-outlined arrow-right mob-view">chevron_right</span>
              </div>
            </div>

            <div className="li-div">
              <div className={`li-subdiv ${active === "Payment Methods" ? "active-nav" : ""}`}
                onClick={() => {setActive("Payment Methods"); toggleOverlay()}}>
                <div className={`${active === "Payment Methods" ? "active-div" : ""}`} style={lineStyle}></div>
                <div className={`userInfo-icon ${active === "Payment Methods" ? "active-icon-div" : ""}`}>
                  <span className={`material-symbols-outlined profile-icon ${active === "Payment Methods" ? "active-icon" : ""}`}>wallet</span>
                </div>
                <li className = "profile-list">Payment Methods</li>
                <span class="material-symbols-outlined arrow-right mob-view">chevron_right</span>
              </div>
            </div>

            <div className="li-div">
              <div className={`li-subdiv ${active === "Subscriptions" ? "active-nav" : ""}`}
                onClick={() => {setActive("Subscriptions"); toggleOverlay()}}>
                <div className={`${active === "Subscriptions" ? "active-div" : ""}`} style={lineStyle}></div>
                <div className={`userInfo-icon ${active === "Subscriptions" ? "active-icon-div" : ""}`}>
                  <span className={`material-symbols-outlined profile-icon ${active === "Subscriptions" ? "active-icon" : ""}`}>card_membership</span>
                </div>
                <li className = "profile-list">Subscriptions</li>
                <span class="material-symbols-outlined arrow-right mob-view">chevron_right</span>
              </div>
            </div>

            <div className="li-div">
              <div className={`li-subdiv last-nav ${active === "logout" ? "active-nav" : ""}`}
                onClick={() => {setActive("logout"); setShowLogout(true); toggleOverlay()}} >
                <div className={`${active === "logout" ? "active-div" : ""}`} style={lineStyle}></div>
                <div className={`userInfo-icon ${active === "logout" ? "active-icon-div" : ""}`}>
                  <span className={`material-symbols-outlined profile-icon ${active === "logout" ? "active-icon" : ""}`}>logout</span>
                </div>
                <li className = "profile-list">Logout</li>
                <span class="material-symbols-outlined arrow-right mob-view">chevron_right</span>
              </div>
            </div>
          </ul>
        </div>
        {windowWidth > breakpoint ? renderContent() : null}
      </div>
    </div>
    {windowWidth <= breakpoint && overlayVisible && (
      <div className="overlay mob-view">
        <div className="overlay-content">
          <div className="profile-head" onClick={toggleOverlay}>
            <span class="material-symbols-outlined" style={{marginRight: '16px'}}>arrow_back</span>
            <p> {active}</p>
          </div>
          <div className="border-separator"></div>
          {renderContent()}
        </div>
      </div>
    )}
    </>
  )
}

export default Profile;
