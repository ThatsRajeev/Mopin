import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserAuth } from "../../../context/AuthContext";
import Overlay from "../../../components/Overlay/Overlay";
import MapComponent from "../../Checkout/MapComponent";
import fetchAddress from "../../../utils/fetchAddress";
import "./ManageAddressContent.css"

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
    (async function() {
      try {
        if (user) {
          const res = await fetchAddress(user);
          setAddress(
            `${res.apartmentNumber}, ${res.apartmentName}, ${res.streetDetails}, ${res.address}`
          );
          setAddressType(res.addressType);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user]);

  useEffect(() => {
    document.body.style.overflow = showMap || showDelete ? "hidden" : "auto";
  }, [showMap, showDelete]);

  return (
    <div className="component address-comp">
      <div className="new-address-div addresses" onClick={() => {setShowMap(true)}}>
        <span className="material-symbols-outlined address-icon ">add_circle</span>
        <h3> Add New Address </h3>
      </div>

      {showMap && (
        <Overlay closeOverlay={() => setShowMap(false)}>
          <div className="profile-head mob-view" onClick={() => setShowMap(false)}>
            <span className="material-symbols-outlined">arrow_back</span>
            <p> Edit Address </p>
          </div>
          <MapComponent setShowMap={setShowMap} />
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
          <p>{address}</p>
          <div className="modify-div">
            <button onClick={() => {setShowMap(true)}}><span className="material-symbols-outlined type-icon">edit</span></button>
            <button onClick={() => {setShowDelete(true)}}><span className="material-symbols-outlined type-icon">delete</span></button>

            {showDelete && (
              <Overlay closeOverlay={() => setShowDelete(false)}>
                <div className="delete-container">
                  <h3 className="delete-heading">Are you sure you want to delete? </h3>
                  <div>
                    <button className="delete" onClick={deleteAddress}>Yes</button>
                    <button className="cancel" onClick={() => setShowDelete(false)}>Cancel</button>
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
