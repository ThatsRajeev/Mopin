import React, {useState, useEffect} from "react";
import useWindowResize from "../../hooks/useWindowResize";
import Navbar from "../../components/Navbar/Navbar";
import { useUserAuth } from "../../context/AuthContext";
import fetchData from "../../utils/fetchData";
import fetchAndStore from "../../utils/fetchAndStore";
import MyOrdersContent from "./MyOrdersContent/MyOrdersContent";
import ManageAddressContent from "./ManageAddressContent/ManageAddressContent";
import PaymentMethodsContent from "./PaymentMethodsContent/PaymentMethodsContent";
import SubscriptionsContent from "./SubscriptionsContent/SubscriptionsContent";
import LogoutContent from "./LogoutContent/LogoutContent";
import Overlay from "../../components/Overlay/Overlay";

const Profile = () => {
  const [name, setName] = useState("");
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [active, setActive] = useState("My Orders");
  const [showLogout, setShowLogout] = useState(false);

  const { user, logOut } = useUserAuth();
  const windowWidth = useWindowResize();

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      fetchAndStore(user, "userName", fetchData, setName);
    }
  }, [user]);

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
      return <LogoutContent
                showLogout={showLogout}
                setShowLogout={setShowLogout}
                setActive={setActive}
                setOverlayVisible={setOverlayVisible}
              />;
    default:
      return null;
  }
};

  return (
    <>
    <Navbar showAddress="none"/>
    <div className="profile-container">
      <div className="profile-div">

        <div className="profile-subdiv">
          <div style={{display: "flex", padding: "16px"}}>
            <div className="user-icon">
            <span className="material-symbols-outlined" style={{fontSize: '36px', display: 'flex', justifyContent: 'center'}}>person</span>
            </div>
            <div style={{margin: "8px 12px"}}>
              <h4 style={{lineHeight: "1.5"}}>{name.name}</h4>
              <h4 style={{fontWeight: "500"}}>{user.phoneNumber}</h4>
            </div>
          </div>

          <ul>
            <div className="li-div">
            <div className={`li-subdiv ${active === "My Orders" ? "active-nav" : ""}`}
              onClick={() => {setActive("My Orders"); toggleOverlay()}}>
              <div className={`line-style ${active === "My Orders" ? "active-div" : ""}`}></div>
              <div className={`userInfo-icon ${active === "My Orders" ? "active-icon-div" : ""}`}>
                <span className={`material-symbols-outlined profile-icon ${active === "My Orders" ? "active-icon" : ""}`}>local_dining</span>
              </div>
              <li className = "profile-list">My Orders</li>
              <span className="material-symbols-outlined arrow-right mob-view">chevron_right</span>
            </div>
            </div>

            <div className="li-div">
              <div className={`li-subdiv ${active === "Manage Address" ? "active-nav" : ""}`}
                onClick={() => {setActive("Manage Address"); toggleOverlay()}}>
                <div className={`line-style ${active === "Manage Address" ? "active-div" : ""}`}></div>
                <div className={`userInfo-icon ${active === "Manage Address" ? "active-icon-div" : ""}`}>
                  <span className={`material-symbols-outlined profile-icon ${active === "Manage Address" ? "active-icon" : ""}`}>edit_location</span>
                </div>
                <li className = "profile-list">Manage Address</li>
                <span className="material-symbols-outlined arrow-right mob-view">chevron_right</span>
              </div>
            </div>

            <div className="li-div">
              <div className={`li-subdiv ${active === "Payment Methods" ? "active-nav" : ""}`}
                onClick={() => {setActive("Payment Methods"); toggleOverlay()}}>
                <div className={`line-style ${active === "Payment Methods" ? "active-div" : ""}`}></div>
                <div className={`userInfo-icon ${active === "Payment Methods" ? "active-icon-div" : ""}`}>
                  <span className={`material-symbols-outlined profile-icon ${active === "Payment Methods" ? "active-icon" : ""}`}>wallet</span>
                </div>
                <li className = "profile-list">Payment Methods</li>
                <span className="material-symbols-outlined arrow-right mob-view">chevron_right</span>
              </div>
            </div>

            <div className="li-div">
              <div className={`li-subdiv ${active === "Subscriptions" ? "active-nav" : ""}`}
                onClick={() => {setActive("Subscriptions"); toggleOverlay()}}>
                <div className={`line-style ${active === "Subscriptions" ? "active-div" : ""}`}></div>
                <div className={`userInfo-icon ${active === "Subscriptions" ? "active-icon-div" : ""}`}>
                  <span className={`material-symbols-outlined profile-icon ${active === "Subscriptions" ? "active-icon" : ""}`}>card_membership</span>
                </div>
                <li className = "profile-list">Subscriptions</li>
                <span className="material-symbols-outlined arrow-right mob-view">chevron_right</span>
              </div>
            </div>

            <div className="li-div">
              <div className={`li-subdiv last-nav ${active === "logout" ? "active-nav" : ""}`}
                onClick={() => {setActive("logout"); setShowLogout(true); toggleOverlay()}} >
                <div className={`line-style ${active === "logout" ? "active-div" : ""}`}></div>
                <div className={`userInfo-icon ${active === "logout" ? "active-icon-div" : ""}`}>
                  <span className={`material-symbols-outlined profile-icon ${active === "logout" ? "active-icon" : ""}`}>logout</span>
                </div>
                <li className = "profile-list">Logout</li>
                <span className="material-symbols-outlined arrow-right mob-view">chevron_right</span>
              </div>
            </div>
          </ul>
        </div>
        {windowWidth > 768 ? renderContent() : null}
      </div>
    </div>
    {windowWidth <= 768 && overlayVisible && (
      <Overlay>
        <div className="profile-head" onClick={toggleOverlay}>
          <span className="material-symbols-outlined" style={{marginRight: '16px'}}>arrow_back</span>
          <p> {active}</p>
        </div>
        <div className="border-separator"></div>
        {renderContent()}
      </Overlay>
    )}
    </>
  )
}

export default Profile;
