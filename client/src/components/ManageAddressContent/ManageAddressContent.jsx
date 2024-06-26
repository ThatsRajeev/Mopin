import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserAuth } from "../../context/AuthContext";
import Overlay from "../Overlay/Overlay";
import MapComponent from "../MapComponent/MapComponent";
import fetchAddress from "../../utils/fetchAddress";

import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./ManageAddressContent.css"

const ManageAddressContent = ({ setAddressChoosen }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user, logOut } = useUserAuth();
  const [overlayParams, setOverlayParams] = useSearchParams();

  useEffect(() => {
    (async function() {
      try {
        if (user && Object.keys(user).length !== 0) {
          const res = await fetchAddress(user);
          setAddress(
            `${res.houseNo}, ${res.houseName}, ${res.landmark}, ${res.address}`
          );
          setAddressType(res.addressType);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user, overlayParams]);

  const deleteAddress = async () => {
    try {
      const encodedPhoneNumber = encodeURIComponent(user.phoneNumber);
      const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/addresses/${encodedPhoneNumber}`, {
        withCredentials: true
      });
      localStorage.removeItem("savedAddress");
      toggleOverlay('delete');

    } catch (error) {
      console.error(error);
    }
  };

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
    <div className="component address-comp">
      <div className="new-address-div addresses" onClick={() => {toggleOverlay('map')}}>
        <Fab size="medium" aria-label="add" sx={{marginRight: '12px'}}>
          <AddIcon />
        </Fab>
        <h3> Add New Address </h3>
      </div>

      {overlayParams.get("map") && (
        <Overlay>
          <div className="head mob-view" onClick={() => toggleOverlay('map')}>
            <ArrowBackIosIcon sx={{fontSize: '20px'}}/>
            <p> Edit Address </p>
          </div>
          <MapComponent setShowMap={() => {toggleOverlay('map')}} />
        </Overlay>
      )}

      {address !== "" && (
        <div className="saved-address addresses">
          <div className="address-type-div">
            {addressType === "Home" ? <HomeIcon/> :
            addressType === "Office" ? <ApartmentIcon/> :
            addressType === "Others" ? <PersonPinCircleIcon/> : ""}
            <p style={{marginLeft: '8px'}}>{addressType}</p>
          </div>
          <p onClick={() => setAddressChoosen && setAddressChoosen(true)}>{address}</p>
          <div className="modify-div">
            <Fab size="small"  aria-label="edit"  sx={{margin: '12px 12px 0 0 '}}>
              <EditOutlinedIcon onClick={() => {toggleOverlay('map')}}/>
            </Fab>
            <Fab size="small"  aria-label="delete"  sx={{margin: '12px 12px 0 0'}}>
              <DeleteOutlineIcon onClick={() => {toggleOverlay('delete')}}/>
            </Fab>

            {overlayParams.get("delete") && (
              <Overlay unsetDims="true">
                <div className="delete-container">
                  <h3 className="delete-heading">Are you sure you want to delete? </h3>
                  <Button variant="outlined" color="secondary" onClick={deleteAddress} sx={{marginRight: '28px', padding: '8px 32px'}}>Yes</Button>
                  <Button variant="contained" color="secondary" onClick={() => toggleOverlay('delete')} sx={{padding: '8px 32px'}}>Cancel</Button>
                </div>
              </Overlay>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAddressContent;
