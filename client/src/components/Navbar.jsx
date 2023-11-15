import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Location from "./Location";
import Login from "./Login/Login";
import Help from "./Help";
import { useUserAuth } from "../context/AuthContext";
import fetchData from "../utils/fetchData";
import handleGPS from "../utils/handleGPS";

const Nawbar = styled.div`
  background-color: #fff;
  padding: 0 14px;

  @media (max-width: 35em) {
    padding: 0;
    margin: 0 16px;
  }
`;

const Nav = styled.nav`
  display: flex;
  position: relative;
  font-family: "Montserrat", sans-serif;
  align-items: center;
  height: 80px;
  margin: 0 auto;
  justify-content: space-between;

  @media screen and (min-width: 1200px) {
    max-width: 1200px;
  }

  @media (max-width: 35em) {
    min-width: unset;
    width: 100%;
    justify-content: space-between;
    background-color: #f2f2f2;
  }
`;

const MobNav = styled.div`
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

  @media (min-width: 35em) {
    display: none;
  }
`;

const MobContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  .material-symbols-outlined {
    margin-right: 0;
  }
`;

const MenuItem = styled.div`
  padding: 0.6rem 0px;
  flex: 0 0 25%;
  -webkit-box-flex: 0;
  text-align: center;
  font-size: 0.8rem;
`;

const Logo = styled.h1`
  color: #f16122;
  font-size: 25px;
  letter-spacing: 5px;

  @media (max-width: 35em) {
    display: none;
  }
`;

const Head = styled.h3`
  position: absolute;
  font-size: 18px;
  transform: translateX(100%);
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AddressContainer = styled.button`
  display: flex;
  border: none;
  background-color: #fff;
  width: 78%;
  align-items: center;
  border: none;
  margin: 0 24px;
  cursor: pointer;

  @media (max-width: 750px) {
    margin: 0;
  }

  @media (max-width: 35em) {
    width: 100%;
    background-color: #f2f2f2;
    margin: 0;
  }
`;

const Address = styled.div`
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  width: 22vw;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 35em) {
    width: 64vw;
  }
`;

const LoginOverlay = styled.div`
  position: absolute;
  top: 148px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  z-index: 10;

  @media screen and (max-width: 35em) {
    top: 0;
    height: 100vh;
    width: 100vw;
    z-index: 1000;
  }
`;

const HelpOverlay = styled.div`
  position: absolute;
  top: 148px;
  left: 50%;
  transform: translateX(-50%);
  height: 432px;
  width: 416px;
  background: #fff;
  z-index: 10;

  @media screen and (max-width: 35em) {
    top: 0;
    height: 100vh;
    width: 100vw;
    z-index: 1000;
  }
`;

const SearchOverlay = styled.div`
  width: 677px;
  height: 450px;
  position: absolute;
  top: 150px;
  left: 28%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const AddressOverlay = styled.div`
  width: 444px;
  height: 464px;
  position: absolute;
  top: 80px;
  left: 0;
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

const Linke = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 1.6px;
  color: ${(props) => (props.sc ? "#9C9C9C" : "#222222")};

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

function Navbar(props) {

  const [menuItem, setMenuItem] = useState('Home');
  const [isShow, setShow] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isLoginOverlayActive, setIsLoginOverlayActive] = useState(false);
  const [isHelpOverlayActive, setIsHelpOverlayActive] = useState(false);
  const [isSearchOverlayActive, setIsSearchOverlayActive] = useState(false);
  const [name, setName] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDishes, setFilteredDishes] = useState([]);
  const navRef = useRef(null);

  const { user, logOut } = useUserAuth();

  useEffect(() => {
    (async function() {
      try {
        if (navigator.geolocation) {
          const res = await handleGPS();
          setSelectedAddress(res.results[0].formatted);
          setShow(false);
          setIsOverlayActive(false);
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

  const location = useLocation();
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

  if (isShow || isLoginOverlayActive || isHelpOverlayActive) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const toggleNavbarFocus = () => {
    setIsOverlayActive(!isOverlayActive);
    setShow(!isShow);
  }

  const toggleLoginOverlay = () => {
    setIsLoginOverlayActive(!isLoginOverlayActive);
    setIsOverlayActive(!isOverlayActive);
  }

  const toggleSearchOverlay = () => {
    setIsSearchOverlayActive(!isSearchOverlayActive);
    setIsOverlayActive(!isOverlayActive);
  }

  const toggleHelpOverlay = () => {
    setIsHelpOverlayActive(!isHelpOverlayActive);
    setIsOverlayActive(!isOverlayActive);
  }

  return (
    <Nawbar style={{display: props.showNavbar}}>
      <Nav ref={navRef}>
      <FlexContainer>
        <Linke to="/">
          <Logo> mopin </Logo>
          </Linke>
          <Linke className="ad" href="#">
            {isOverlayActive &&
              <BackgroundOverlay onClick={() => {isLoginOverlayActive ? toggleLoginOverlay() : toggleNavbarFocus()}}
            />}

            <AddressContainer
              style={{display: props.showAddress}}
              onClick={() => {toggleNavbarFocus()}}>
              <span className="material-symbols-outlined" style={{color: "#f16122"}}>pin_drop</span>
              <Address>
                {selectedAddress}
              </Address>
              <span className="material-symbols-outlined" style={{marginRight: '0'}}>expand_more</span>
            </AddressContainer>

            {isShow && (
              <AddressOverlay open={isShow}>
                <Location
                  setAddressProp={setSelectedAddress}
                  setShowProp={toggleNavbarFocus}
                />
                <p className="gps-location" onClick={handleGPS}>
                <span className="material-symbols-outlined" style={{marginRight: '16px'}}>my_location</span>
                  Use Current Location Using GPS
                </p>
                <div className="choose-location">
                  <div className="locationIcon-container">
                    <span class="material-symbols-outlined" style={{fontSize: '48px', margin: '0'}}>location_on</span>
                  </div>
                  <p className="choose-location-p1"> Choose your location! </p>
                  <p className="choose-location-p2"> And enjoy delicious homemade cuisines near your location </p>
                </div>
              </AddressOverlay>
            )}
          </Linke>
        </FlexContainer>

        {props.header &&
        <Head>{props.header}</Head>}

        <Menu open={props.header === "Secure Checkout"}>
          <Item  open={props.header === "Secure Checkout"}>
            <Linke>
            <span className="material-symbols-outlined">search</span>
              Search
            </Linke>
          </Item>
          <Item>
            <Linke onClick={toggleHelpOverlay}>
            <span className="material-symbols-outlined">support</span>
              Help
            </Linke>
          </Item>
          <Item>
            <Linke onClick={name ? "" : toggleLoginOverlay} to={name ? "/profile" : ""}>
              <span className="material-symbols-outlined">person</span>
              {name ? name : "Sign in"}
            </Linke>
          </Item>
          <Item open={props.header === "Secure Checkout"}>
            <Linke className="link" to="/checkout">
              <span className="material-symbols-outlined">shopping_cart</span>
              Cart
            </Linke>
          </Item>
        </Menu>

        {isLoginOverlayActive && (
            <LoginOverlay>
              <button className="close-button" onClick={toggleLoginOverlay}>
                <span class="material-symbols-outlined" style={{marginRight: '0', fontSize: '18px'}}>close</span>
              </button>
              <Login fetchData={fetchData} setShowProp={toggleLoginOverlay}/>
            </LoginOverlay>
        )}

        {isHelpOverlayActive && (
            <HelpOverlay>
              <button className="close-button" onClick={toggleHelpOverlay}>
                <span class="material-symbols-outlined" style={{marginRight: '0', fontSize: '18px'}}>close</span>
              </button>
              <Help setShowProp={toggleHelpOverlay}/>
            </HelpOverlay>
        )}

        {isSearchOverlayActive && (
          <SearchOverlay>
          <input
            type="text"
            placeholder="Search for dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {filteredDishes.map(dish => (
            <div key={dish.id} className="dish-card">
              {/* Display dish information */}
              <p>{dish.name}</p>
              {/* ...other dish details */}
            </div>
          ))}
          </SearchOverlay>
        )}

        <Icon style={{padding: '0'}}>
          <Linke onClick={name ? "" : toggleLoginOverlay} to={name ? "/profile" : ""}>
            <span style={{margin: '6px', fontSize: '24px'}} className="material-symbols-outlined">person</span>
          </Linke>
        </Icon>
      </Nav>

      <SearchContainer>
        <SearchBarContainer>
          <SearchButton><span style={{fontSize: '24px', display: 'flex', marginRight: '-8px'}} className="material-symbols-outlined">search</span></SearchButton>
          <SearchInput className="redi" type="text" placeholder="Search your favourite food..." />
        </SearchBarContainer>
        <Icon bcg='true'><span style={{margin: '4px', color: '#fff'}} className="material-symbols-outlined">page_info</span></Icon>
      </SearchContainer>

      <MobNav>
        <MobContainer>
          <MenuItem>
            <Linke to="/" sc={menuItem!=='Home'}>
              <span className="material-symbols-outlined">home</span>
              Home
            </Linke>
          </MenuItem>
          <MenuItem active={menuItem==='Profile'}>
            <Linke to={name ? "/profile" : ""} sc={menuItem!=='Profile'} onClick={name ? "" : toggleLoginOverlay}>
              <span className="material-symbols-outlined">person</span>
              Profile
            </Linke>
          </MenuItem>
          <MenuItem active={menuItem==='Help'}>
            <Linke sc={menuItem!=='Help'} onClick={() => {toggleHelpOverlay()}}>
              <span className="material-symbols-outlined">support</span>
              Help
            </Linke>
          </MenuItem>
          <MenuItem active={menuItem==='Checkout'}>
            <Linke to={name ? "/checkout" : ""} sc={menuItem!=='Checkout'}>
              <span className="material-symbols-outlined">shopping_cart</span>
              Checkout
            </Linke>
          </MenuItem>
        </MobContainer>
      </MobNav>
    </Nawbar>
  );
}

export default Navbar;
