import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserAuth } from "../../context/AuthContext";
import Overlay from "../Overlay/Overlay";
import MapComponent from "../MapComponent/MapComponent";
import fetchAddress from "../../utils/fetchAddress";
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
      const response = await axios.post('https://mopin-server.vercel.app/api/deletedata', {
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
        <span className="material-symbols-outlined address-icon ">add_circle</span>
        <h3> Add New Address </h3>
      </div>

      {overlayParams.get("map") && (
        <Overlay>
          <div className="profile-head mob-view" onClick={() => toggleOverlay('map')}>
            <span className="material-symbols-outlined">arrow_back</span>
            <p> Edit Address </p>
          </div>
          <MapComponent setShowMap={() => {toggleOverlay('map')}} />
        </Overlay>
      )}

      {address !== "" && (
        <div className="saved-address addresses">
          <div className="address-type-div">
            <span className="material-symbols-outlined address-icon">
              {addressType === "Home" ? "home" :
              addressType === "Office" ? "apartment" :
              addressType === "Others" ? "person_pin_circle" : ""}
            </span>
            <p>{addressType}</p>
          </div>
          <p onClick={() => setAddressChoosen && setAddressChoosen(true)}>{address}</p>
          <div className="modify-div">
            <button onClick={() => {toggleOverlay('map')}}><span className="material-symbols-outlined type-icon">edit</span></button>
            <button onClick={() => {toggleOverlay('delete')}}><span className="material-symbols-outlined type-icon">delete</span></button>

            {overlayParams.get("delete") && (
              <Overlay unsetDims="true">
                <div className="delete-container">
                  <h3 className="delete-heading">Are you sure you want to delete? </h3>
                  <div>
                    <button className="delete" onClick={deleteAddress}>Yes</button>
                    <button className="cancel" onClick={() => toggleOverlay('delete')}>Cancel</button>
                  </div>
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
