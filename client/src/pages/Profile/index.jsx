import React, { useState } from "react";
import useWindowResize from "../../hooks/useWindowResize";
import Navbar from "../../components/Navbar/Navbar";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import MyOrdersContent from "./MyOrdersContent/MyOrdersContent";
import ManageAddressContent from "./ManageAddressContent/ManageAddressContent";
import PaymentMethodsContent from "./PaymentMethodsContent/PaymentMethodsContent";
import SubscriptionsContent from "./SubscriptionsContent/SubscriptionsContent";
import LogoutContent from "./LogoutContent/LogoutContent";
import Overlay from "../../components/Overlay/Overlay";

const Profile = () => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [active, setActive] = useState("My Orders");
  const windowWidth = useWindowResize();

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const menuItems = [
    { label: "My Orders", icon: "local_dining" },
    { label: "Manage Address", icon: "edit_location" },
    { label: "Payment Methods", icon: "wallet" },
    { label: "Subscriptions", icon: "card_membership" },
    { label: "Logout", icon: "logout" },
  ];

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
      case "Logout":
        return <LogoutContent setActive={setActive} toggleOverlay={toggleOverlay} />;
      default:
        return null;
    }
  };

  return (
    <>
    <Navbar showAddress="none"/>
    <ProfileMenu
      menuItems={menuItems}
      active={active}
      setActive={setActive}
      toggleOverlay={toggleOverlay}
      renderContent={renderContent}
    />
    {windowWidth <= 768 && overlayVisible && (
      <Overlay>
        <div className="profile-head" onClick={toggleOverlay}>
          <span className="material-symbols-outlined">arrow_back</span>
          <p>{active}</p>
        </div>
        {renderContent()}
      </Overlay>
    )}
    </>
  )
}

export default Profile;
