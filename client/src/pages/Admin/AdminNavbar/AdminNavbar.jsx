import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Overlay from "../../../components/Overlay/Overlay";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const NavCase = styled.header`
  display: block;
  background-color: #f2f2f2;
  padding: 0 16px;

  @media (width > 768px){
    background-color: #fff;
    padding: 0 14px;
  }
`;

const GlobalNav = styled.nav`
  display: none;
  position: relative;
  align-items: center;
  height: 80px;
  margin: 0 auto;
  justify-content: space-between;
  max-width: 1100px;
  background: rgb(242, 242, 242);
  border-radius: 0 0 28px 28px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

  @media (width > 768px){
    display: flex;
  }
`;

const Logo = styled(Link)`
  display: none;
  color: #f16122;
  font-size: 26px;
  letter-spacing: 2px;
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
  background-color: #fff;
  border-radius: 16px;
  border: 1px solid rgb(239, 239, 239);
  padding: 6px;
  width: 100%;
  height: 48px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.12);

  @media (width > 768px){
    display: none;
  }
`;

const Menu = styled.ul`
  display: none;
  width: 72%;
  justify-content: space-between;


  @media (width > 768px){
    display: flex;
  }
`;

const Item = styled.li`
  list-style: none;
  cursor: pointer;
  display: block;

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
  display: flex;;
  align-items: center;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 1.6px;
  color: ${(props) => (props.sc==="true" ? "#9C9C9C" : "#222222")};
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
  width: 100%;
  justify-content: space-between;

  input {
    border: none;
    flex: 1;
    padding: 4px;
  }
`;

function AdminNavbar({children}) {
  const [navItem, setNavItem] = useState('Orders');
  const location = useLocation();
  const navigate = useNavigate();
  const [overlayParams, setOverlayParams] = useSearchParams();

  useEffect(() => {
    const pathname = location.pathname;
    const updatedNavItem =
      pathname === "/menu"
        ? "Menu"
        : pathname === "/customers"
        ? "Customers"
        : pathname === "/settings"
        ? "Settings"
        : "Orders";
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

  return (
    <NavCase>
      <GlobalNav>
        <Logo to="/"> mopin </Logo>

        <Menu>
          <Item>
            <NavLink sc={navItem!=='Orders' ? "true" : "false"} to="/search">
              <LunchDiningOutlinedIcon />
              &nbsp;Orders
            </NavLink>
          </Item>
          <Item>
            <NavLink sc={navItem!=='Menu' ? "true" : "false"} onClick={() => {toggleOverlay('help')}}>
              <MenuOutlinedIcon />
              &nbsp;Menu
            </NavLink>
          </Item>
          <Item>
            <NavLink sc={navItem!=='Customers' ? "true" : "false"}>
              <PersonOutlineOutlinedIcon />
              &nbsp;Customers
            </NavLink>
          </Item>
          <Item>
            <NavLink sc={navItem!=='Settings' ? "true" : "false"} to="/checkout">
              <SettingsOutlinedIcon />
              &nbsp;Settings
            </NavLink>
          </Item>
        </Menu>
      </GlobalNav>

      <MobNav>
        <NavLink sc={navItem!=='Orders' ? "true" : "false"} to="/">
          <NavItem>
            <LunchDiningOutlinedIcon />
            Orders
          </NavItem>
        </NavLink>
        <NavLink sc={navItem!=='Menu' ? "true" : "false"} >
          <NavItem>
            <MenuOutlinedIcon />
            Menu
          </NavItem>
        </NavLink>
        <NavLink sc={navItem!=='Customers' ? "true" : "false"} to="/search">
          <NavItem>
            <PersonOutlineOutlinedIcon />
            Customers
          </NavItem>
        </NavLink>
        <NavLink sc={navItem!=='Settings' ? "true" : "false"} to="/checkout">
          <NavItem>
            <SettingsOutlinedIcon />
            Settings
          </NavItem>
        </NavLink>
      </MobNav>

      {children}
    </NavCase>
  );
}

export default AdminNavbar;
