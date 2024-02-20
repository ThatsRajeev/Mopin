import React, { useEffect } from "react";
import { useUserAuth } from '../../context/AuthContext';
import { useSearchParams, useNavigate } from "react-router-dom";
import useWindowResize from "../../hooks/useWindowResize";
import Login from "../../components/Login/Login";
import Overlay from "../../components/Overlay/Overlay";
import Navbar from "../../components/Navbar/Navbar";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import MyOrdersContent from "./MyOrdersContent/MyOrdersContent";
import ManageAddressContent from "../../components/ManageAddressContent/ManageAddressContent";
import HelpAndSupport from "./HelpAndSupport/HelpAndSupport";
import SubscriptionsContent from "./SubscriptionsContent/SubscriptionsContent";
import LogoutContent from "../../components/LogoutContent/LogoutContent";

const Profile = () => {
  const { user } = useUserAuth();
  const [overlayParams, setOverlayParams] = useSearchParams();
  const windowWidth = useWindowResize();
  const navigate = useNavigate();

  const menuItems = [
    { label: "My Orders", icon: "local_dining" },
    { label: "Manage Address", icon: "edit_location" },
    { label: "Help & Support", icon: "support" },
    { label: "Subscriptions", icon: "card_membership" },
    { label: "Logout", icon: "logout" },
  ];

  const renderContent = () => {
    switch (overlayParams.get("p")) {
      case "My Orders":
        return <MyOrdersContent />;
      case "Manage Address":
        return <ManageAddressContent />;
      case "Help & Support":
        return <HelpAndSupport />;
      case "Subscriptions":
        return <SubscriptionsContent />;
      case "Logout":
        return <LogoutContent active={overlayParams.get("p")} setActive={setOverlayParams} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if(windowWidth > 768)
      {setOverlayParams({p: "My Orders"}, {replace: true})};
  }, []);

  return (
    user && Object.keys(user).length !== 0 ? (
      <>
        <Navbar showAddress="none"/>
        <ProfileMenu
          menuItems={menuItems}
          active={overlayParams.get("p")}
          setActive={setOverlayParams}
          renderContent={renderContent}
        />
      </>
    ) : (
      <Overlay closeOverlay={() => navigate(-1)}>
        <Login setShowProp={() => navigate(-1)}/>
      </Overlay>
    )
  )
}

export default (Profile);
