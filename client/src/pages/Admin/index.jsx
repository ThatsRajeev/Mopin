import React, { useEffect } from "react";
import { useUserAuth } from '../../context/AuthContext';
import { useSearchParams, useNavigate } from "react-router-dom";
import Login from "../../components/Login/Login";
import Overlay from "../../components/Overlay/Overlay";
import AdminOrders from "./AdminOrders/AdminOrders";

const Admin = () => {
  const { user } = useUserAuth();
  const [overlayParams, setOverlayParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userd = localStorage.getItem('userData');
    console.log(userd);
  } , [])

  return (
    user && Object.keys(user).length !== 0 ? (
      <>
        <AdminOrders />
      </>
    ) : (
      <Overlay>
        <Login setShowProp={() => navigate(-1)}/>
      </Overlay>
    )
  )
}

export default (Admin);
