import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import Location from "../Location/Location";
import Login from "../Login/Login";
import Help from "../Help/Help";
import { useUserAuth } from "../../context/AuthContext";
import fetchData from "../../utils/fetchData";
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
  width: 64vw;
  margin: 0;
  background-color: #f2f2f2;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (width > 768px){
    margin: unset;
    width: 18vw;
    background-color: unset;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  height: 100vh;
  width: 100vw;
  transform: translateX(-50%);
  background: #fff;
  z-index: 1000;

  @media (width > 768px){
    top: 148px;
    height: unset;
    width: ${(props) => (props.type==='help' ? "464px" : "unset")};
    z-index: 10;
  }
`;

const AddressOverlay = styled.div`
  position: absolute;
  top: 0;
  left: -16px;
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  z-index: 10;

  @media (width > 768px){
    top: 80px;
    left: 0;
    height: 464px;
    width: 444px;
    padding: 0 2%;
  }
`;
const BackgroundOverlay = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 24px;
  padding: 8px;
  width: 100%;
  height: 48px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.12);
  margin-right: 16px;

  @media (width > 768px){
    display: none;
  }
`;

const Menu = styled.ul`
  display: none;
  width: ${(props) => (props.open ? "18%" : "42%")};
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
  font-size: 0.68rem;

  .material-symbols-outlined {
    margin: 0 !important;
  }
`;

const NavLink = styled(Link)`
  display: ${(props) => (props.open ? "none" : "flex")};
  align-items: center;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 1.6px;
  color: ${(props) => (props.sc=="true" ? "#9C9C9C" : "#222222")};

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
  z-index: 200;
  background: #f2f2f2;
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
  width: ${(props) => (props.adr=="true" ? "unset" : "100%")};
  justify-content: space-between;

  input {
    border: none;
    flex: 1;
    padding: 4px;
  }
`;

function Navbar({showNavbar, showAddress, header}) {
  const [navItem, setNavItem] = useState('Home');
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isAddressActive, setIsAddressActive] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isHelpActive, setIsHelpActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [name, setName] = useState("");

  const { user } = useUserAuth();
  const location = useLocation();

  useEffect(() => {
    (async function() {
      try {
        if (user && Object.keys(user).length !== 0) {
          const res = await fetchData(user);
          setName(res.name);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user]);

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === '/profile') {
      setNavItem('Profile');
    } else if (pathname === '/checkout') {
      setNavItem('Checkout');
    } else {
      setNavItem('Home');
    }
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [isAddressActive, isLoginActive, isHelpActive, isSearchActive]);

  const toggleOverlay = (overlayType) => {
    switch(overlayType) {
      case 'address':
        setIsAddressActive(!isAddressActive);
        break;
      case 'login':
        setIsLoginActive(!isLoginActive);
        break;
      case 'search':
        setIsSearchActive(!isSearchActive);
        break;
      case 'help':
        setIsHelpActive(!isHelpActive);
        break;
      default:
        break;
    }
    setIsOverlayActive(!isOverlayActive);
  }

  const handleBackButton = () => {
    if (isAddressActive || isLoginActive || isHelpActive || isSearchActive) {
      toggleOverlay('address');
      toggleOverlay('login');
      toggleOverlay('help');
      toggleOverlay('search');
    } else {
      window.history.back();
    }
  };

  const renderOverlay = (overlayType, contentComponent) => {
    const isActive =
      overlayType === 'login' ? isLoginActive :
      overlayType === 'help' ? isHelpActive : isAddressActive;

    return isActive && (
      overlayType === 'address' ? (
        <AddressOverlay>{contentComponent}</AddressOverlay>
      ) : (
        <Overlay type={overlayType}>
          <button className="close-button" onClick={() => toggleOverlay(overlayType)}>
            <span className="material-symbols-outlined">close</span>
          </button>
          {contentComponent}
        </Overlay>
      )
    );
  };

  if (isAddressActive || isLoginActive || isHelpActive) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <NavCase open={showNavbar}>
      <GlobalNav>
        <FlexContainer adr={"true"}>
          <Logo to="/"> mopin </Logo>
          <NavLink onClick={() => {toggleOverlay('address')}} open={showAddress}>
            <span className="material-symbols-outlined pin-icon">pin_drop</span>
            <Address>{localStorage.getItem("userLocation")}</Address>
            <span className="material-symbols-outlined">expand_more</span>
          </NavLink>
        </FlexContainer>

        {header &&
        <Heading>{header}</Heading>}

        <Menu open={header === "Secure Checkout"}>
          <Item open={header === "Secure Checkout"}>
            <NavLink>
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
            <NavLink to={user ? "/profile" : ""} onClick={() => {if(!user) {toggleOverlay('login')}}}>
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
        <NavLink className="mob-view" onClick={() => {if(!user) {toggleOverlay('login')}}} to={user ? "/profile" : ""}>
          <span className="material-symbols-outlined person-icon">person</span>
        </NavLink>

        {isOverlayActive &&
          <BackgroundOverlay onClick={() => {toggleOverlay(isLoginActive ? 'login' :
            isHelpActive ? 'help' : 'address')}}
        />}
        {renderOverlay('address', (<Location setShowProp={toggleOverlay}/>))}
        {renderOverlay('login', (<Login setShowProp={toggleOverlay}/>))}
        {renderOverlay('help', (<Help setShowProp={toggleOverlay}/>))}
      </GlobalNav>

      <FlexContainer className="mob-view">
        <SearchBarContainer>
          <span className="material-symbols-outlined search-icon">search</span>
          <input type="text" placeholder="Search your favourite food..." />
        </SearchBarContainer>
        <span className="material-symbols-outlined page-info-icon">page_info</span>
      </FlexContainer>

      <MobNav>
        <NavLink sc={navItem!=='Home' ? "true" : "false"} to="/">
          <NavItem>
            <span className="material-symbols-outlined">home</span>
            Home
          </NavItem>
        </NavLink>
        <NavLink sc={navItem!=='Profile' ? "true" : "false"} to={user ? "/profile" : ""} onClick={() => {if(!user) {toggleOverlay('login')}}}>
          <NavItem>
            <span className="material-symbols-outlined">person</span>
            Profile
          </NavItem>
        </NavLink>
        <NavLink sc={navItem!=='Help' ? "true" : "false"} onClick={() => {toggleOverlay('help')}}>
          <NavItem>
            <span className="material-symbols-outlined">support</span>
            Help
          </NavItem>
        </NavLink>
        <NavLink sc={navItem!=='Checkout' ? "true" : "false"} to="/checkout">
          <NavItem>
            <span className="material-symbols-outlined">shopping_cart</span>
            Checkout
          </NavItem>
        </NavLink>
      </MobNav>
    </NavCase>
  );
}

export default Navbar;
