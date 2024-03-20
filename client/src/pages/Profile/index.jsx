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

import CircularProgress from '@mui/material/CircularProgress';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import SupportOutlinedIcon from '@mui/icons-material/SupportOutlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Profile = () => {
  const { user, isLoadingUser } = useUserAuth();
  const [overlayParams, setOverlayParams] = useSearchParams();
  const windowWidth = useWindowResize();
  const navigate = useNavigate();

  const menuItems = [
    { label: "My Orders", icon: <LocalDiningOutlinedIcon/> },
    { label: "Manage Address", icon: <EditLocationOutlinedIcon/> },
    { label: "Help & Support", icon: <SupportOutlinedIcon/> },
    { label: "Subscriptions", icon: <CardMembershipOutlinedIcon/> },
    { label: "Logout", icon: <LogoutOutlinedIcon/> },
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
    <>
      {isLoadingUser ? (
        <div className="circularProgress">
          <CircularProgress />
        </div>
      ) : (
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
          <Overlay>
            <Login setShowProp={() => navigate(-1)}/>
          </Overlay>
        )
      )}
    </>
  )
}

export default (Profile);
