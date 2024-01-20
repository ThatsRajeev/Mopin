import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserAuth } from "../../../context/AuthContext";
import Overlay from "../../../components/Overlay/Overlay";
import MapComponent from "../../Checkout/MapComponent";
import fetchAddress from "../../../utils/fetchAddress";
import fetchAndStore from "../../../utils/fetchAndStore";

const ManageAddressContent = () => {
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { user, logOut } = useUserAuth();

  const deleteAddress = async () => {
    try {
      const response = await axios.get('https://mopin-server.vercel.app/api/deletedata', {
        withCredentials: true
      });
      setShowDelete(false);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      fetchAndStore(user, "address", fetchAddress, setAddress);
      setAddress(a => a.apartmentNumber + ", " + a.apartmentName + ", " +
                       a.streetDetails + ", " + a.address);
    }
  }, [user]);

  useEffect(() => {
    if (showMap || showDelete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showMap, showDelete])

  return (
    <div className="component address-comp">
        <div className="new-address-div addresses" onClick={() => {setShowMap(true)}}>
          <span className="material-symbols-outlined address-icon ">add_circle</span>
          <h3 style={{fontWeight: "100"}}> Add New Address </h3>
        </div>
      {showMap &&
        <Overlay closeOverlay={() => setShowMap(false)}>
          <div className="map-container">
            <button className="close-button" onClick={() => setShowMap(false)} style={{right: '-28px'}}>
              <span className="material-symbols-outlined" style={{marginRight: '0'}}>close</span>
            </button>
            <div className="mob-view">
              <div className="profile-head" onClick={() => setShowMap(false)}>
                <span className="material-symbols-outlined" style={{marginRight: '16px'}}>arrow_back</span>
                <p> Edit Address </p>
              </div>
            </div>
            <MapComponent setShowMap={setShowMap} />
          </div>
        </Overlay>
      }
      {address !== "" &&
    <div className="saved-address addresses">
      <div className="address-type-div">
        {addressType === "Home" &&<span className="material-symbols-outlined address-icon">home</span>}
        {addressType === "Office" &&<span className="material-symbols-outlined address-icon">apartment</span>}
        {(addressType !== "Home") && (addressType !== "Office")  &&<span className="material-symbols-outlined address-icon">person_pin_circle</span>}
        <p style={{fontWeight: '600'}}>{addressType}</p>
      </div>
      <p className="addressed">{address}</p>
      <div className="modify-div">
        <button className="modify" onClick={() => {setShowMap(true)}}><span className="material-symbols-outlined type-icon">edit</span></button>
        <button className="modify" onClick={() => {setShowDelete(true)}}><span className="material-symbols-outlined type-icon">delete</span></button>
        {showDelete &&
          <Overlay closeOverlay={() => setShowDelete(false)}>
            <div className="delete-container">
              <h3 className="delete-heading">Are you sure you want to delete the saved Address? </h3>
              <div style={{display: 'flex'}}>
                <button className="delete" onClick={deleteAddress}>Delete</button>
                <button className="cancel" onClick={() => setShowDelete(false)}>Cancel</button>
              </div>
              <button className="close-button" onClick={() => setShowDelete(false)}>
                <span className="material-symbols-outlined" style={{marginRight: '0'}}>close</span>
              </button>
            </div>
          </Overlay>
        }
      </div>
      </div>}
    </div>
  )
};

export default ManageAddressContent;
