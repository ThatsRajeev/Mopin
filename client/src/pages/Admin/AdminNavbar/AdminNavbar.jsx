import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { styled } from "@mui/system";
import AdminOrders from "../AdminOrders/AdminOrders"
import AdminProductList from "../AdminProductList/AdminProductList"
import Overlay from "../../../components/Overlay/Overlay";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const NavCase = styled('header')({
  display: "block",
  padding: "0 16px",

  "@media (width > 768px)": {
    padding: "0 14px",
  }
});

const GlobalNav = styled('nav')({
  display: "none",
  position: "sticky",
  top: 0,
  zIndex: 100,
  alignItems: "center",
  height: "80px",
  margin: "0 auto",
  justifyContent: "space-between",
  maxWidth: "1164px",
  background: "#fff",
  borderRadius: "0 0 28px 28px",
  padding: "16px 32px",
  marginBottom: "32px",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",

  "@media (width > 768px)": {
    display: "flex",
  }
});

const Logo = styled(Link)({
  display: "none",
  color: "#F16122",
  fontSize: "26px",
  letterSpacing: "2px",
  fontWeight: 800,

  "@media (width > 768px)": {
    display: "flex",
  }
});

const Menu = styled('ul')({
  display: "none",
  width: "78%",
  justifyContent: "space-between",

  "@media (width > 768px)": {
    display: "flex",
  }
});

const Item = styled('li')({
  listStyle: "none",
  cursor: "pointer",
  display: "block",

  "&.last-item": {
    width: 0,
  }
});

const NavItem = styled('div')({
  padding: "0.72rem 0px",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  fontSize: "0.68rem",
});

const NavLink = styled(Link)(({ sc }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: "0.8rem",
  fontWeight: "bold",
  letterSpacing: "1.6px",
  color: sc === "true" ? "#9C9C9C" : "#222222",
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
  }
});

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
        <Logo to="/admin?nav=Orders"> mopin </Logo>

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
