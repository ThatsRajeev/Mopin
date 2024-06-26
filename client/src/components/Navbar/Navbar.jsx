import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams, useNavigate, Link } from "react-router-dom";
import { styled } from "@mui/system";
import Location from "../Location/Location";
import Login from "../Login/Login";
import HelpAndSupport from "../../pages/Profile/HelpAndSupport/HelpAndSupport";
import Overlay from "../Overlay/Overlay";
import { useUserAuth } from "../../context/AuthContext";
import fetchUserData from "../../utils/fetchUserData";
import HomeOutlinedIcon from '@mui/icons-material/Home';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SupportOutlinedIcon from '@mui/icons-material/SupportOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import "./Navbar.css";

const NavCase = styled('header')(({ open }) => ({
  display: open ? "none" : "block",
  backgroundColor: "#f2f2f2",
  padding: "0 16px",
  "@media (min-width: 768px)": {
    backgroundColor: "#fff",
    padding: "0 14px",
  },
}));

const GlobalNav = styled('nav')({
  display: "flex",
  position: "relative",
  alignItems: "center",
  height: "80px",
  margin: "0 auto",
  justifyContent: "space-between",
  maxWidth: "1200px",
});

const Logo = styled(Link)({
  display: "none",
  color: "#F16122",
  fontSize: "26px",
  letterSpacing: "2px",
  fontWeight: 800,
  marginRight: "20px",
  "@media (width > 768px)": {
    display: "flex",
  },
});

const Heading = styled('h3')({
  position: "absolute",
  fontSize: "18px",
  transform: "translateX(100%)",
});

const Address = styled('div')({
  fontSize: "14px",
  fontWeight: 600,
  letterSpacing: 0,
  whiteSpace: "nowrap",
  maxWidth: "64vw",
  margin: 0,
  backgroundColor: "#f2f2f2",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "@media (width > 768px)": {
    margin: "unset",
    maxWidth: "28vw",
    backgroundColor: "unset",
  },
  "@media (width > 1442px)": {
    maxWidth: "18vw",
  },
});

const Menu = styled('ul')(({ open }) => ({
  display: "none",
  width: open ? "18%" : "46%",
  justifyContent: "space-between",
  "@media (width > 768px)": {
    display: "flex",
  },
}));

const Item = styled('li')(({ open }) => ({
  listStyle: "none",
  cursor: "pointer",
  display: open ? "none" : "block",
  "&.last-item": {
    width: 0,
  },
}));

const NavItem = styled('div')({
  padding: "0.72rem 0px",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  fontSize: "0.68rem",
});

const NavLink = styled(Link)(({ open, sc }) => ({
  display: open ? "none" : "flex",
  alignItems: "center",
  fontSize: "0.8rem",
  fontWeight: "bold",
  letterSpacing: "1.6px",
  color: sc==='true' ? "#9C9C9C" : "#222222",
}));

const MobNav = styled('nav')({
  display: "flex",
  justifyContent: "space-around",
  position: "fixed",
  bottom: 0,
  width: "100%",
  marginLeft: "-16px",
  zIndex: 100,
  background: "#f2f2f2",
  borderRadius: "28px 28px 0 0",
  boxShadow: "0px -2px 14px 0px rgba(0, 0, 0, 0.12)",
  transition: "transform .3s ease-in",
  willChange: "transform",
  backfaceVisibility: "hidden",
  "@media (width > 768px)": {
    display: "none",
  },
});

const FlexContainer = styled('div')(({ adr }) => ({
  display: "flex",
  alignItems: "center",
  width: adr === "true" ? "unset" : "100%",
  justifyContent: "space-between",
  "& input": {
    border: "none",
    flex: 1,
    padding: "4px",
  },
}));

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
      <PinDropOutlinedIcon style={{ color: '#F16122', marginRight: '8px', fontSize: '22px'}} />
      <Address>{localStorage.getItem("userLocation")}</Address>
      <ExpandMoreOutlinedIcon style={{ color: '#222222', marginRight: '6px', fontSize: '20px'}}/>
     </NavLink>
    </FlexContainer>

    {header &&
    <Heading>{header}</Heading>}

    <Menu open={header === "Secure Checkout"}>
     <Item open={header === "Secure Checkout"}>
      <NavLink to="/search">
       <SearchOutlinedIcon />
       &nbsp;Search
      </NavLink>
     </Item>
     <Item>
      <NavLink onClick={() => {toggleOverlay('help')}}>
       <SupportOutlinedIcon />
       &nbsp;Help
      </NavLink>
     </Item>
     <Item>
      <NavLink onClick={handleProfileClick}>
       <PersonOutlineOutlinedIcon />
       &nbsp;{name ? name : "Sign in"}
      </NavLink>
     </Item>
     <Item open={header === "Secure Checkout"}>
      <NavLink to="/checkout">
       <ShoppingCartOutlinedIcon />
       &nbsp;Cart
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

   <MobNav>
    <NavLink sc={navItem!=='Home' ? 'true' : ''} to="/">
     <NavItem>
      <HomeOutlinedIcon />
      Home
     </NavItem>
    </NavLink>
    <NavLink sc={navItem!=='Profile' ? 'true' : ''} onClick={handleProfileClick}>
     <NavItem>
      <PersonOutlineOutlinedIcon />
      Profile
     </NavItem>
    </NavLink>
    <NavLink sc={navItem!=='Search' ? 'true' : ''} to="/search">
     <NavItem>
      <SearchOutlinedIcon />
      Search
     </NavItem>
    </NavLink>
    <NavLink sc={navItem!=='Checkout' ? 'true' : ''} to="/checkout">
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
