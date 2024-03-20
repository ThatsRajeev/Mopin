import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import locationIcon from "../../assets/location-icon.png";
import { useUserAuth } from "../../context/AuthContext";
import handleGeolocation from "../../utils/handleGeolocation";
import { TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MyLocationOutlinedIcon from '@mui/icons-material/MyLocationOutlined';
import "./MapComponent.css"

function DraggableMarker({ setAddressInfo, setCurrentLocation, setLoading }) {
  const map = useMap();

  const handleDragEnd = async () => {
    setLoading(true);

    try {
      const newPosition = map.getCenter();
      setCurrentLocation(newPosition);

      const res = await handleGeolocation(newPosition);
      setAddressInfo(prev => ({ ...prev, address: res.display_name }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const mapInstance = map;
    mapInstance.on('dragend', handleDragEnd);

    return () => {
      mapInstance.off('dragend', handleDragEnd);
    };
  }, [map, setCurrentLocation, setAddressInfo, setLoading]);

  return null;
}

function LocationButton({getCurrentLocation}) {
  const map = useMap();

  useEffect(() => {
    const locationControl = L.control({position: 'bottomright'});

    locationControl.onAdd = function () {
      const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom location-button');

      const iconContainer = document.createElement('div');
      iconContainer.style.display = 'flex';
      ReactDOM.render(<MyLocationOutlinedIcon />, iconContainer);
      container.appendChild(iconContainer);

      container.onclick = function(){
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          map.flyTo([latitude, longitude], map.getZoom());
        });
        getCurrentLocation();
      }
      return container;
    };

    locationControl.addTo(map);

    return () => {
      locationControl.remove();
    };
  }, []);

  return null;
}

const MapComponent = ({ setShowMap }) => {
  const { user } = useUserAuth();
  const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    address: "",
    addressType: "",
    houseNo: "",
    houseName: "",
    landmark: "",
  });

  const getCurrentLocation = async () => {
    setLoading(true);

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const coords = position.coords;
      setCurrentLocation({ lat: coords.latitude, lng: coords.longitude });

      const res = await handleGeolocation();
      setAddressInfo((prev) => ({ ...prev, address: res.display_name }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);

    return new Promise(async (resolve, reject) => {
      try {
        const data = {
          phoneNumber: user.phoneNumber,
          address: addressInfo.address,
          houseNo: addressInfo.houseNo,
          houseName: addressInfo.houseName,
          landmark: addressInfo.landmark,
          addressType: addressInfo.addressType
        };
        const response = await axios.post("https://mopin-server.vercel.app/api/savepoint", data);
        localStorage.removeItem("savedAddress");
        setShowMap(false);
        resolve(response.data);
      } catch (error) {
        console.error(error);
      }
    });
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="map-component">
      {currentLocation.lat && currentLocation.lng && (
        <MapContainer center={currentLocation} zoom={16} className="map-container">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DraggableMarker setAddressInfo={setAddressInfo} setCurrentLocation={setCurrentLocation} setLoading={setLoading}/>
          <LocationButton getCurrentLocation={getCurrentLocation}/>
          <div className="tooltip-container">
            <img src={locationIcon} alt="marker" />
            <span className="tooltip">
              Drag the map to set your location
            </span>
          </div>
        </MapContainer>
      )}

      <div className={`set-address ${isEditing ? "address-editing" : ""}`}>
        {isEditing && (
          <>
            <div className="profile-head" onClick={() => setIsEditing(false)}>
              <ArrowBackIcon style={{fontSize: '20px', marginRight: '16px'}} />
              <p> Edit Address </p>
            </div>
            <hr />
          </>
        )}
        <p> Your Delivery Location </p>
        <h2>{loading ? "Loading..." : addressInfo.address}</h2>
        {isEditing && (
          <div>
            <div className="address-form-group">
              <TextField type="text" value={addressInfo.houseNo} onChange={(event) => setAddressInfo(prev => ({...prev, houseNo: event.target.value}))} required label="House / Apartment No." sx={{ width: '100%' }} />
            </div>
            <div className="address-form-group">
              <TextField type="text" value={addressInfo.houseName} onChange={(event) => setAddressInfo(prev => ({...prev, houseName: event.target.value}))} required label="House / Apartment Name." sx={{ width: '100%' }} />
            </div>
            <div className="address-form-group">
              <TextField type="text" value={addressInfo.landmark} onChange={(event) => setAddressInfo(prev => ({...prev, landmark: event.target.value}))} label="LandMark / Street Details" sx={{ width: '100%' }} />
            </div>
            <ul className="address-type">
              <p>Address Type</p>
              <li className={`${addressInfo.addressType === "Home" ? "highlight-li" : ""}`} onClick={() => {setAddressInfo(prev => ({...prev, addressType: "Home"}))}}> Home </li>
              <li className={`${addressInfo.addressType === "Office" ? "highlight-li" : ""}`} onClick={() => {setAddressInfo(prev => ({...prev, addressType: "Office"}))}}> Office </li>
              <li className={`${addressInfo.addressType === "Others" ? "highlight-li" : ""}`} onClick={() => {setAddressInfo(prev => ({...prev, addressType: "Others"}))}}> Others </li>
            </ul>
          </div>
        )}
        <Button variant="contained" disabled={loading || isEditing && (!addressInfo.houseNo || !addressInfo.houseName) } size='large' onClick={() => {isEditing ? handleSave() : setIsEditing(true)}} sx={{textTransform: 'none'}}>
          {isEditing ? "Save Address Details" : "Confirm Location and Proceed"}
        </Button>
      </div>
    </div>
  );
}

export default MapComponent;
