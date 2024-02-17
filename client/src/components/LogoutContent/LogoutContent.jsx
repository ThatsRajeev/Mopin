import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/AuthContext";
import Overlay from "../Overlay/Overlay";
import "./LogoutContent.css";

const LogoutContent = ({ active, setActive }) => {
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
    setActive((prev) => {
      prev.delete("p");
      return prev;
    });
  };

  return(
    <div className="component logout">
      {active && (
        <Overlay closeOverlay={handleCancel} unsetDims="true">
          <div className="delete-container">
            <h3 className="delete-heading">Are you sure you want to logout? </h3>
            <div>
              <button className="delete" onClick={handleLogout}>Yes</button>
              <button className="cancel" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </Overlay>
      )}
    </div>
  )
};

export default LogoutContent;
