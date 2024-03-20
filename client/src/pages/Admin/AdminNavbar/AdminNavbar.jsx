import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import AdminOrders from "../AdminOrders/AdminOrders"
import AdminProductList from "../AdminProductList/AdminProductList"
import Overlay from "../../../components/Overlay/Overlay";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const NavCase = styled.header`
  display: block;
  padding: 0 16px;

  @media (width > 768px){
    padding: 0 14px;
  }
`;

const GlobalNav = styled.nav`
  display: none;
  position: sticky;
  top: 0;
  z-index: 100;
  align-items: center;
  height: 80px;
  margin: 0 auto;
  justify-content: space-between;
  max-width: 1164px;
  background: #fff;
  border-radius: 0 0 28px 28px;
  padding: 16px 32px;
  margin-bottom: 32px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

  @media (width > 768px){
    display: flex;
  }
`;

const Logo = styled(Link)`
  display: none;
  color: #FF5B22;
  font-size: 26px;
  letter-spacing: 2px;
  font-weight: 800;

  @media (width > 768px){
    display: flex;
  }
`;

const Menu = styled.ul`
  display: none;
  width: 78%;
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

function AdminNavbar({children}) {
  const [navParams, setNavParams] = useSearchParams();

  const setNav = (overlayType) => {
    setNavParams(params => {
      params.set("nav", overlayType);
      return params;
    });
 };

  useEffect(() => {
    setNavParams(params => {
      params.set("nav", navParams.get("nav") || 'Orders');
      return params;
    });
  }, []);

  return (
    <NavCase>
      <GlobalNav>
        <Logo to="/"> mopin </Logo>

        <Menu>
          <Item>
            <NavLink sc={navParams.get("nav")!=='Orders' ? "true" : "false"} onClick={() => setNav('Orders')}>
              <LunchDiningOutlinedIcon />
              &nbsp;Orders
            </NavLink>
          </Item>
          <Item>
            <NavLink sc={navParams.get("nav")!=='Menu' ? "true" : "false"} onClick={() => setNav('Menu')}>
              <MenuOutlinedIcon />
              &nbsp;Menu
            </NavLink>
          </Item>
          <Item>
            <NavLink sc={navParams.get("nav")!=='Customers' ? "true" : "false"} onClick={() => setNav('Customers')}>
              <PersonOutlineOutlinedIcon />
              &nbsp;Customers
            </NavLink>
          </Item>
          <Item>
            <NavLink sc={navParams.get("nav")!=='Settings' ? "true" : "false"} onClick={() => setNav('Settings')}>
              <SettingsOutlinedIcon />
              &nbsp;Settings
            </NavLink>
          </Item>
        </Menu>
      </GlobalNav>

      <MobNav>
        <NavLink sc={navParams.get("nav")!=='Orders' ? "true" : "false"} onClick={() => setNav('Orders')}>
          <NavItem>
            <LunchDiningOutlinedIcon />
            Orders
          </NavItem>
        </NavLink>
        <NavLink sc={navParams.get("nav")!=='Menu' ? "true" : "false"} onClick={() => setNav('Menu')}>
          <NavItem>
            <MenuOutlinedIcon />
            Menu
          </NavItem>
        </NavLink>
        <NavLink sc={navParams.get("nav")!=='Customers' ? "true" : "false"} onClick={() => setNav('Customers')}>
          <NavItem>
            <PersonOutlineOutlinedIcon />
            Customers
          </NavItem>
        </NavLink>
        <NavLink sc={navParams.get("nav")!=='Settings' ? "true" : "false"} onClick={() => setNav('Settings')}>
          <NavItem>
            <SettingsOutlinedIcon />
            Settings
          </NavItem>
        </NavLink>
      </MobNav>

      {navParams.get("nav") === 'Orders' ? (
        <AdminOrders />
        ) : (
          navParams.get("nav") === 'Menu' ? (
            <AdminProductList />
          ) : ""
        )
      }
    </NavCase>
  );
}

export default AdminNavbar;
