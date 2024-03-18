import React, { useState, useEffect } from "react";
import { useUserAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import fetchUserData from "../../utils/fetchUserData";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import Login from "../../components/Login/Login";
import Overlay from "../../components/Overlay/Overlay";
import CircularProgress from '@mui/material/CircularProgress';

const Admin = () => {
  const { user, isLoadingUser } = useUserAuth();
  const navigate = useNavigate();
  const [isLoadingRole, setIsLoadingRole] = useState(true);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        if (user && Object.keys(user).length !== 0) {
          const res = await fetchUserData(user);

          if (res.role !== 'admin') {
            navigate('/');
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoadingRole(false);
      }
    }

    getUserRole();
  }, [user]);

  return (
    <>
      {isLoadingUser || isLoadingRole ? (
        <div className="circularProgress">
          <CircularProgress />
        </div>
      ) : (
        user && Object.keys(user).length !== 0 ? (
          <AdminNavbar />
        ) : (
          <Overlay>
            <Login setShowProp={() => navigate(-1)}/>
          </Overlay>
        )
      )}
    </>
  );
};

export default Admin;
