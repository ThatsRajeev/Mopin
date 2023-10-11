import React, {useState, useEffect} from "react";
import axios from "axios";
import MapComponent from "./MapComponent";

const ManageAddressContent = ({ fromCheckout, setAddressChoosen }) => {
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("");
  const [active, setActive] = useState("My Orders");
  const [showMap, setShowMap] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const Overlay = ({ children, closeOverlay }) => {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}
        onClick={closeOverlay}
      >
        <div onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  };

  const fetchAddress = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/addressdata', {
        withCredentials: true
      });
      setAddress(response.data.apartmentNumber + ", " + response.data.apartmentName + ", " +
                 response.data.streetDetails + ", " + response.data.address);
      setAddressType(response.data.addressType);

    } catch (error) {
      console.error(error);
    }
  };

  const deleteAddress = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/deletedata', {
        withCredentials: true
      });
      setShowDelete(false);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (showMap) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showMap, showDelete])

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <div className={`component ${fromCheckout ? "ck-address-comp" : "address-comp"}`}>
        <div className={fromCheckout ? "ck-new-address" : "new-address"} onClick={() => {setShowMap(true)}}>
          <span className="material-symbols-outlined address-icon ">add_circle</span>
          <h3 style={{fontWeight: "100"}}> Add New Address </h3>
        </div>
      {showMap &&
        <Overlay closeOverlay={() => setShowMap(false)}>
          <div className="map-container">
            <button className="close-button opt" onClick={() => setShowMap(false)}>×</button>
            <MapComponent setShowMap={setShowMap} />
          </div>
        </Overlay>
      }
      {address !== "" &&
    <div className={fromCheckout ? "ck-theAddressDiv" : "theAddressDiv"}>
      <div className="typed">
        {addressType === "Home" &&<span className="material-symbols-outlined address-icon">home</span>}
        {addressType === "Office" &&<span className="material-symbols-outlined address-icon">apartment</span>}
        {(addressType !== "Home") && (addressType !== "Office")  &&<span className="material-symbols-outlined address-icon">person_pin_circle</span>}
        <p style={{fontWeight: '600'}}>{addressType}</p>
      </div>
      <p className="addressed" onClick={() => setAddressChoosen(true)}>{address}</p> 
      <div className="modify-div">
        <button className="modify" onClick={() => {setShowMap(true)}}><span class="material-symbols-outlined type-icon">edit</span></button>
        <button className="modify" onClick={() => {setShowDelete(true)}}><span class="material-symbols-outlined type-icon">delete</span></button>
        {showDelete &&
          <Overlay closeOverlay={() => setShowDelete(false)}>
            <div className="delete-container">
              <h3 className="delete-heading">Are you sure you want to delete the saved Address? </h3>
              <button className="delete" onClick={deleteAddress}>Delete</button>
              <button className="cancel" onClick={() => setShowDelete(false)}>Cancel</button>
              <button className="close-button" onClick={() => setShowDelete(false)}>×</button>
            </div>
          </Overlay>
        }
      </div>
      </div>}
    </div>
  )
};

export default ManageAddressContent;
