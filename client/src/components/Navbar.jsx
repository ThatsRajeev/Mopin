import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import Location from "./Location";
import Login from "./Login/Login";
import Help from "./Help";
import { useUserAuth } from "../context/AuthContext";
import fetchData from "../utils/fetchData";
import handleGPS from "../utils/handleGPS";

const NavCase = styled.header`
  display: ${(props) => (props.open ? "none" : "block")};
  background-color: #fff;
  padding: 0 14px;

  @media (max-width: 35em) {
    background-color: #f2f2f2;
    padding: 0 16px;
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
  color: #f16122;
  font-size: 26px;
  letter-spacing: 2px;
  text-decoration: none;
  font-weight: 800;
  margin-right: 20px;

  @media (max-width: 35em) {
    display: none;
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
  width: 18vw;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 750px) {
    margin: 0;
  }

  @media (max-width: 35em) {
    width: 64vw;
    background-color: #f2f2f2;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 148px;
  left: 50%;
  transform: translateX(-50%);
  width: ${(props) => (props.type==='help' ? "464px" : "unset")};
  background: #fff;
  z-index: 10;

  @media screen and (max-width: 35em) {
    top: 0;
    height: 100vh;
    width: 100vw;
    z-index: 1000;
  }
`;

const AddressOverlay = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  width: 444px;
  height: 464px;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 2%;
  z-index: 10;

  @media screen and (max-width: 35em) {
    top: 0;
    left: -16px;
    height: 100vh;
    width: 100vw;
    padding: 0 16px;
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

const Icon = styled.div`
  display: flex;
  background-color: ${(props) => (props.bcg ? "#f16122" : "#d9d9d9")};
  border-radius: ${(props) => (props.bcg ? "8px" : "50%")};
  padding: 2px;
  align-items: center;
  margin-left: 6px;

  @media (min-width: 35em) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #f2f2f2;
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

  @media (min-width: 35em) {
    display: none;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 4px;
`;

const SearchButton = styled.button`
  color: #222222;
  background-color: #fff;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
`;

const Menu = styled.ul`
  display: flex;
  width: ${(props) => (props.open ? "18%" : "42%")};
  justify-content: space-between;


  @media (max-width: 35em) {
    display: none;
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

const NavLink = styled(Link)`
  display: ${(props) => (props.open ? "none" : "flex")};
  align-items: center;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 1.6px;
  color: ${(props) => (props.sc ? "#9C9C9C" : "#222222")};

  .material-symbols-outlined {
    margin-right: 8px;
  }
`;

const MobNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-left: -16px;
  z-index: 200;
  background: #f2f2f2
  box-shadow: 0px -2px 14px 0px rgba(0, 0, 0, 0.12);
  transition: transform .3s ease-in;
  will-change: transform;
  backface-visibility: hidden;

  @media (min-width: 35em) {
    display: none;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => (props.adr ? "unset" : "100%")};
  justify-content: space-between;
`;

const MenuItem = styled.div`
  padding: 0.6rem 0px;
  flex: 0 0 25%;
  -webkit-box-flex: 0;
  text-align: center;
  font-size: 0.8rem;
`;

function Navbar(props) {

  const [menuItem, setMenuItem] = useState('Home');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isAddressActive, setIsAddressActive] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isHelpActive, setIsHelpActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [name, setName] = useState("");

  const { user } = useUserAuth();
  const location = useLocation();

  useEffect(() => {
    (async function() {
      try {
        if (navigator.geolocation) {
          const res = await handleGPS();
          setSelectedAddress(res.results[0].formatted);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async function() {
      try {
        if (user) {
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
      setMenuItem('Profile');
    } else if (pathname === '/checkout') {
      setMenuItem('Checkout');
    } else {
      setMenuItem('Home');
    }
  }, [location.pathname]);

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
    <NavCase open={props.showNavbar}>
      <GlobalNav>
        <FlexContainer adr={true}>
          <Logo to="/"> mopin </Logo>
          <NavLink onClick={() => {toggleOverlay('address')}} open={props.showAddress}>
            <span className="material-symbols-outlined pin-icon">pin_drop</span>
            <Address>{selectedAddress}</Address>
            <span className="material-symbols-outlined">expand_more</span>
          </NavLink>
        </FlexContainer>

        {props.header &&
        <Heading>{props.header}</Heading>}

        <Menu open={props.header === "Secure Checkout"}>
          <Item  open={props.header === "Secure Checkout"}>
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
            <NavLink onClick={() => {if(!name) {toggleOverlay('login')}}} to={name ? "/profile" : ""}>
              <span className="material-symbols-outlined">person</span>
              {name ? name : "Sign in"}
            </NavLink>
          </Item>
          <Item open={props.header === "Secure Checkout"}>
            <NavLink className="link" to="/checkout">
              <span className="material-symbols-outlined">shopping_cart</span>
              Cart
            </NavLink>
          </Item>
        </Menu>

        {isOverlayActive &&
          <BackgroundOverlay onClick={() => {toggleOverlay(isLoginActive ? 'login' :
            isHelpActive ? 'help' : 'address')}}
        />}
        {renderOverlay('address', (<Location setShowProp={toggleOverlay} setAdrsProp={setSelectedAddress}/>))}
        {renderOverlay('login', (<Login setShowProp={toggleOverlay}/>))}
        {renderOverlay('help', (<Help setShowProp={toggleOverlay}/>))}

        <Icon style={{padding: '0'}}>
          <NavLink onClick={() => {if(!name) {toggleOverlay('login')}}} to={name ? "/profile" : ""}>
            <span style={{margin: '6px', fontSize: '24px'}} className="material-symbols-outlined">person</span>
          </NavLink>
        </Icon>
      </GlobalNav>

      <SearchContainer>
        <SearchBarContainer>
          <SearchButton><span style={{fontSize: '24px', display: 'flex', marginRight: '-8px'}} className="material-symbols-outlined">search</span></SearchButton>
          <SearchInput className="redi" type="text" placeholder="Search your favourite food..." />
        </SearchBarContainer>
        <Icon bcg='true'><span style={{margin: '4px', color: '#fff'}} className="material-symbols-outlined">page_info</span></Icon>
      </SearchContainer>

      <MobNav>
        <FlexContainer>
          <MenuItem>
            <NavLink to="/" sc={menuItem!=='Home'}>
              <span className="material-symbols-outlined">home</span>
              Home
            </NavLink>
          </MenuItem>
          <MenuItem active={menuItem==='Profile'}>
            <NavLink to={name ? "/profile" : ""} sc={menuItem!=='Profile'} onClick={() => {if(!name) {toggleOverlay('login')}}}>
              <span className="material-symbols-outlined">person</span>
              Profile
            </NavLink>
          </MenuItem>
          <MenuItem active={menuItem==='Help'}>
            <NavLink sc={menuItem!=='Help'} onClick={() => {toggleOverlay('help')}}>
              <span className="material-symbols-outlined">support</span>
              Help
            </NavLink>
          </MenuItem>
          <MenuItem active={menuItem==='Checkout'}>
            <NavLink to={name ? "/checkout" : ""} sc={menuItem!=='Checkout'}>
              <span className="material-symbols-outlined">shopping_cart</span>
              Checkout
            </NavLink>
          </MenuItem>
        </FlexContainer>
      </MobNav>
    </NavCase>
  );
}

export default Navbar;
