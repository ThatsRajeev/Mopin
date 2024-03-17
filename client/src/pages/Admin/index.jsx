import React, { useEffect } from "react";
import { useUserAuth } from '../../context/AuthContext';
import { useSearchParams, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import Login from "../../components/Login/Login";
import Overlay from "../../components/Overlay/Overlay";
import AdminOrders from "./AdminOrders/AdminOrders";

const Admin = () => {
  const { user } = useUserAuth();
  const userData = localStorage.getItem('userData');
  const [overlayParams, setOverlayParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <>
      {user && Object.keys(user).length !== 0 ? (
        JSON.parse(userData).data.role === 'admin' ? (
          <AdminNavbar>
            <AdminOrders />
          </AdminNavbar>
        ) : (
          navigate('/')
        )
      ) : (
        <Overlay>
          <Login setShowProp={() => navigate(-1)}/>
        </Overlay>
      )}
    </>
  );
};

export default Admin;
