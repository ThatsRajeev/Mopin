import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/AuthContext";
import Overlay from "../Overlay/Overlay";
import Button from '@mui/material/Button';
import "./LogoutContent.css";

const LogoutContent = ({ active }) => {
  const navigate = useNavigate();
  const { user, logOut } = useUserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');

    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return(
    <div className="component logout">
      {active && (
        <Overlay unsetDims="true">
          <div className="delete-container">
            <h3 className="delete-heading">Are you sure you want to logout? </h3>
            <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{marginRight: '28px', padding: '8px 32px'}}>Yes</Button>
            <Button variant="contained" color="secondary" onClick={handleCancel} sx={{padding: '8px 32px'}}>Cancel</Button>
          </div>
        </Overlay>
      )}
    </div>
  )
};

export default LogoutContent;
