import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Location from "../Location/Location";
import Login from "../Login/Login";
import HelpAndSupport from "../../pages/Profile/HelpAndSupport/HelpAndSupport";
import Overlay from "../Overlay/Overlay";
import { useUserAuth } from "../../context/AuthContext";
import fetchUserData from "../../utils/fetchUserData";
import HomeOutlinedIcon from '@mui/icons-material/Home';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import "./Navbar.css";

const NavCase = styled.header`
  display: ${(props) => (props.open ? "none" : "block")};
  background-color: #f2f2f2;
  padding: 0 16px;

  @media (width > 768px){
    background-color: #fff;
    padding: 0 14px;
  }
`;

const GlobalNav = styled.nav`
  display: flex;
  position: relative;
  align-items: center;
  height: 80px;
  margin: 0 auto;
  justify-content: space-between;
  max-width: 1200px;
`;

const Logo = styled(Link)`
  display: none;
  color: #f16122;
  font-size: 26px;
  letter-spacing: 2px;
  text-decoration: none;
  font-weight: 800;
  margin-right: 20px;

  @media (width > 768px){
    display: flex;
  }
`;

const Heading = styled.h3`
  position: absolute;
  font-size: 18px;
  transform: translateX(100%);
`;

const Address = styled.div`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  white-space: nowrap;
  max-width: 64vw;
  margin: 0;
  background-color: #f2f2f2;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (width > 768px){
    margin: unset;
    max-width: 28vw;
    background-color: unset;
  }

  @media (width > 1442px){
    max-width: 18vw;
  }
`;

const SearchBarContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  background-color: #fff;
  border-radius: 16px;
  border: 1px solid rgb(239, 239, 239);
  padding: 6px;
  width: 100%;
  height: 52px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.12);

  @media (width > 768px){
    display: none;
  }
`;

const Menu = styled.ul`
  display: none;
  width: ${(props) => (props.open ? "18%" : "46%")};
  justify-content: space-between;


  @media (width > 768px){
    display: flex;
  }
`;

const Item = styled.li`
  list-style: none;
  cursor: pointer;
  display: ${(props) => (props.open ? "none" : "block")};

  &.last-item {
    width: 0;
  }
`;

const NavItem = styled.div`
  padding: 0.72rem 0px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  font-size: 0.68rem;
`;

const NavLink = styled(Link)`
  display: ${(props) => (props.open ? "none" : "flex")};
  align-items: center;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 1.6px;
  color: ${(props) => (props.sc==="true" ? "#9C9C9C" : "#222222")};

  .material-symbols-outlined {
    margin-right: 8px;
  }
`;

const MobNav = styled.nav`
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-left: -16px;
  z-index: 100;
  background: #f2f2f2;
  border-radius: 28px 28px 0 0;
  box-shadow: 0px -2px 14px 0px rgba(0, 0, 0, 0.12);
  transition: transform .3s ease-in;
  will-change: transform;
  backface-visibility: hidden;

  @media (width > 768px){
    display: none;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => (props.adr==="true" ? "unset" : "100%")};
  justify-content: space-between;

  input {
    border: none;
    flex: 1;
    padding: 4px;
  }
`;

function Navbar({showNavbar, showAddress, header}) {
  const [navItem, setNavItem] = useState('Home');
  const [name, setName] = useState("");

  const { user } = useUserAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [overlayParams, setOverlayParams] = useSearchParams();

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

  useEffect(() => {
    const pathname = location.pathname;
    const updatedNavItem =
      pathname === "/profile"
        ? "Profile"
        : pathname === "/search"
        ? "Search"
        : pathname === "/checkout"
        ? "Checkout"
        : "Home";
    setNavItem(updatedNavItem);
  }, [location.pathname]);

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

const handleProfileClick = () => {
  if (!user) {
    toggleOverlay('login');
  } else {
    navigate("/profile");
  }
};

  return (
    <NavCase open={showNavbar}>
      <GlobalNav>
        <FlexContainer adr={"true"}>
          <Logo to="/"> mopin </Logo>
          <NavLink onClick={() => {toggleOverlay('address')}} open={showAddress}>
            <PinDropOutlinedIcon style={{ color: '#f16122', marginRight: '8px', fontSize: '22px'}} />
            <Address>{localStorage.getItem("userLocation")}</Address>
            <ExpandMoreOutlinedIcon style={{ color: '#222222', marginRight: '6px', fontSize: '20px'}}/>
          </NavLink>
        </FlexContainer>

        {header &&
        <Heading>{header}</Heading>}

        <Menu open={header === "Secure Checkout"}>
          <Item open={header === "Secure Checkout"}>
            <NavLink to="/search">
              <span className="material-symbols-outlined">search</span>
              Search
            </NavLink>
          </Item>
          <Item>
            <NavLink onClick={() => {toggleOverlay('help')}}>
              <span className="material-symbols-outlined">support</span>
              Help
            </NavLink>
          </Item>
          <Item>
            <NavLink onClick={handleProfileClick}>
              <span className="material-symbols-outlined">person</span>
              {name ? name : "Sign in"}
            </NavLink>
          </Item>
          <Item open={header === "Secure Checkout"}>
            <NavLink to="/checkout">
              <span className="material-symbols-outlined">shopping_cart</span>
              Cart
            </NavLink>
          </Item>
        </Menu>

        <NavLink className="mob-view" onClick={handleProfileClick}>
          <PersonOutlineOutlinedIcon className="person-icon"/>
        </NavLink>

        {overlayParams.get("login") && (
          <Overlay closeOverlay={() => toggleOverlay('login')}>
            <Login setShowProp={toggleOverlay}/>
          </Overlay>
        )}
        {overlayParams.get("address") && (
          <Overlay closeOverlay={() => toggleOverlay('address')}>
            <Location setShowProp={toggleOverlay}/>
          </Overlay>
        )}
        {overlayParams.get("help") && (
          <Overlay closeOverlay={() => toggleOverlay('help')}>
            <HelpAndSupport setShowProp={toggleOverlay}/>
          </Overlay>
        )}
      </GlobalNav>

      <FlexContainer className="mob-view">
        <SearchBarContainer to="/search">
          <SearchOutlinedIcon className="search-icon"/>
          <input type="text" placeholder="Search your favourite food..." />
          <span className="material-symbols-outlined page-info-icon">page_info</span>
        </SearchBarContainer>
      </FlexContainer>

      <MobNav>
        <NavLink sc={navItem!=='Home' ? "true" : "false"} to="/">
          <NavItem>
            <HomeOutlinedIcon />
            Home
          </NavItem>
        </NavLink>
        <NavLink sc={navItem!=='Profile' ? "true" : "false"} onClick={handleProfileClick}>
          <NavItem>
            <PersonOutlineOutlinedIcon />
            Profile
          </NavItem>
        </NavLink>
        <NavLink sc={navItem!=='Search' ? "true" : "false"} to="/search">
          <NavItem>
            <SearchOutlinedIcon />
            Search
          </NavItem>
        </NavLink>
        <NavLink sc={navItem!=='Checkout' ? "true" : "false"} to="/checkout">
          <NavItem>
            <ShoppingCartOutlinedIcon />
            Checkout
          </NavItem>
        </NavLink>
      </MobNav>
    </NavCase>
  );
}

export default Navbar;
