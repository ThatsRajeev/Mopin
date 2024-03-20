import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Overlay from "../../../components/Overlay/Overlay";
import fetchUserData from "../../../utils/fetchUserData";
import { useUserAuth } from "../../../context/AuthContext";
import useWindowResize from "../../../hooks/useWindowResize";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import "./ProfileMenu.css"

const ProfileMenu = ({ menuItems, active, setActive, renderContent }) => {
  const [name, setName] = useState("");
  const windowWidth = useWindowResize();
  const { user } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async function() {
      try {
        if (user && Object.keys(user).length !== 0) {
          const res = await fetchUserData(user);
          setName(res.name);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user]);

  const closeOverlay = () => {
   navigate(-1);
 };

  const RenderMenuItem = ({ menuItem }) => (
    <div className={`li-div`} onClick={() => {if(active !== menuItem.label) { setActive({p: menuItem.label} )}}}>
      <div className={`li-subdiv ${active === menuItem.label ? "active-nav" : ""}`}>
        <div className={`line-style ${active === menuItem.label ? "active-div" : ""}`}></div>
        <div className={`userInfo-icon ${active === menuItem.label ? "active-icon-div" : ""}`}>
          <span className={`profile-icon ${active === menuItem.label ? "active-icon" : ""}`}>
            {menuItem.icon}
          </span>
        </div>
        <li className="profile-list">{menuItem.label}</li>
        <span className="arrow-right mob-view"><ChevronRightOutlinedIcon/></span>
      </div>
    </div>
  );

  return (
    <div className="profile-container">
      <div className="profile-div">
        <div className="profile-subdiv">
          <div className="user-info">
            <div className="user-icon"> <PersonOutlineOutlinedIcon sx={{fontSize: '36px'}}/></div>
            <div>
              <h4>{name}</h4>
              <h4>{user && user.phoneNumber}</h4>
            </div>
          </div>
          <ul>
            {menuItems.map((menuItem) => (
              <RenderMenuItem
                key={menuItem.label}
                menuItem={menuItem}
              />
            ))}
          </ul>
        </div>
        {windowWidth <= 768 ? (
          active && (
            <Overlay>
              <div className="profile-head" onClick={closeOverlay}>
                <ArrowBackIosNewOutlinedIcon/>
                <p>{active}</p>
              </div>
              {renderContent()}
            </Overlay>
          )
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
