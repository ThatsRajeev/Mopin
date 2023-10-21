import React, { useState, useEffect } from 'react';
import axios from "axios";
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { createControlComponent } from '@react-leaflet/core';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import locationIcon from "../assets/images/location-icon.png";

function DraggableMarker({ setAddressProp, setCurrentLocation }) {
  const [position, setPosition] = useState({ lat: 28.75, lng: 77.11 })
  const map = useMap();

  const handleDragEnd = async () => {
    const newPosition = map.getCenter();
    setPosition(newPosition);
    setCurrentLocation(newPosition);

    const response = await axios.get(
      `https://mopin-server.vercel.app/proxy/geocode/v1/json?q=${newPosition.lat}+${newPosition.lng}&key=12b6daa5213d46898ef052dfacf9ac5a`
    );
    // const response2 = await axios.get(
    //   `https://api.mapmyindia.com/geocoder/v1/geocode?query=<span class="math-inline">\{newPosition\.lat\}\+</span>{newPosition.lng}&key=f49ebcb2a78605e14ba17ae34db120df`
    // );
    // console.log(response2.data.results[0].components);
    setAddressProp(response.data.results[0].formatted);
  };

  useEffect(() => {
    const mapInstance = map;
    mapInstance.on('dragend', handleDragEnd);

    return () => {
      mapInstance.off('dragend', handleDragEnd);
    };
  }, [map, setAddressProp, setCurrentLocation]);

  return null;
}


const LocationControl = createControlComponent(function createLocationControl(options) {
  return L.control(options);
});

function LocationButton({getCurrentLocation}) {
  const map = useMap();

  useEffect(() => {
    const locationControl = L.control({position: 'bottomright'});

    locationControl.onAdd = function () {
      const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
      container.style.backgroundColor = '#fff';
      container.style.color = '#f16122';
      container.style.width = '32px';
      container.style.height = '32px';
      container.style.borderRadius = '50%';
      container.style.display = 'flex';
      container.style.cursor = 'pointer';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'center';
      container.innerHTML = '<span class="material-symbols-outlined home-icon" style="margin: 0">my_location</span>';

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


function MapComponent({ setShowMap }) {

  const mapContainerStyle = {
    height: '386px',
    width: '486px',
  };

  const smallScreenStyle = {
    height: '100vh',
    width: '100vw',
  }
  const mapStyle = {
    position: 'relative',
    height: '100%' ,
    width: '100%' ,
  }

  const isSmallScreen = window.innerWidth <= 35 * parseFloat(getComputedStyle(document.documentElement).fontSize);
  const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("");

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const coords = position.coords;
      setCurrentLocation({ lat: coords.latitude, lng: coords.longitude });
      const response = await axios.get(
        `https://mopin-server.vercel.app/proxy/geocode/v1/json?q=${coords.latitude}+${coords.longitude}&key=12b6daa5213d46898ef052dfacf9ac5a`
      );
      setAddress(response.data.results[0].formatted.substring(0, 40) + "...");
    });
  };

  const [phoneNumber, setphoneNumber] = useState("");

   const fetchData = async () => {
     try {
       const response = await axios.get('https://mopin-server.vercel.app/api/userdata', {
         withCredentials: true
       });
       setphoneNumber(response.data.phoneNumber);

     } catch (error) {
       console.error(error);
     }
   };

   const fetchAddress = async () => {
     try {
       const response = await axios.get('https://mopin-server.vercel.app/api/addressdata', {
         withCredentials: true
       });
       setAddress(response.data.apartmentNumber + ", " + response.data.apartmentName + ", " +
                  response.data.streetDetails + ", " + response.data.address);
       setAddressType(response.data.addressType);

     } catch (error) {
       console.error(error);
     }
   };

   useEffect(() => {
     fetchData();
   }, []);

  const handleSave = async (event) => {
    setDisable(true);
    if(event) {
      event.preventDefault();
    }
    return new Promise(async (resolve, reject) => {
      try {
        const data = {
          phoneNumber: phoneNumber,
          address: address,
          apartmentNumber: no,
          apartmentName: name,
          streetDetails: details,
          addressType: type === "Others" ? others : type
        };
        const response = await axios.post("https://mopin-server.vercel.app/api/savepoint", data);
        setShowMap(false);
        window.location.reload();
        resolve(response.data);
      } catch (error) {
        console.error(error);
      }
    });
  }

    useEffect(() => {
      getCurrentLocation();
    }, []);

    const [show, setShow] = useState(false);
    const [no, setNo] = useState("");
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [type, setType] = useState("");
    const [others, setOthers] = useState("");
    const [disable, setDisable] = useState(false);

    useEffect(() => {
      if (no === "" || name === "" || details === "") {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }, [no, name, details, type]);

  return (
    <div style={isSmallScreen ? smallScreenStyle : mapContainerStyle}>
    {show && <button className="back-button pc-view" onClick={() => setShow(false)}>
    <span class="material-symbols-outlined" style={{fontSize: '16px', marginRight: '0'}}>arrow_back_ios</span></button>}

      {currentLocation.lat && currentLocation.lng && (
        <div style={mapStyle}>
          <MapContainer center={currentLocation} zoom={16} style={mapStyle}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker setAddressProp={setAddress} setCurrentLocation={setCurrentLocation}/>
            <LocationButton getCurrentLocation={getCurrentLocation}/>
          </MapContainer>
        <div style={{
          position: 'absolute',
          top: '44%',
          left: '50%',
          paddingTop: '100px',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
        }}>
          <img src={locationIcon} alt="marker" />
          <div className="tooltip-arrow" style={{
            position: 'absolute',
            top: '68px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '4px',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '12px',
            width: '180px'
          }}>
          Drag the map to set your location
          </div>
        </div>
       </div>
      )}

      <div className={`set-address ${show ? "fill-address-details" : ""}`}>
      {currentLocation.lat && currentLocation.lng && (
        <div>
          <p> Your Delivery Location </p>
          <h2>{address}</h2>
          {!show &&<button className="save-btn" onClick={() => setShow(true)}>Confirm Location and Proceed</button>}
        </div>
      )}

        {show && (
          <div>
            <div className="address-form-group">
              <input type="text" autoComplete="off"
               value={no} onChange={(event) => setNo(event.target.value)} required/>
               <label>Apartment / House No.</label>
            </div>
            <div className="address-form-group">
              <input type="text" autoComplete="off"
               value={name} onChange={(event) => setName(event.target.value)} required/>
               <label>Apartment Name / House Name.</label>
            </div>
            <div className="address-form-group">
              <input type="text" autoComplete="off"
               value={details} onChange={(event) => setDetails(event.target.value)} required/>
               <label>Street Details / LandMark</label>
            </div>
            <ul className="address-type">
              <p style={{margin: '3px 0'}}>Address Type</p>
              <li className={`${type === "Home" ? "highlight-li" : ""}`} onClick={() => {setType("Home")}}> Home </li>
              <li className={`${type === "Office" ? "highlight-li" : ""}`} onClick={() => {setType("Office")}}> Office </li>
              <li className={`${type === "Others" ? "highlight-li" : ""}`} onClick={() => {setType("Others")}}> Others </li>
            </ul>
              <button className={`save-btn ${disable ? 'unsave-btn' : ""}`} disabled={disable} onClick={handleSave}>Save Address Details</button>
          </div>
        )}
      </div>
    </div>
  );
}


export default MapComponent;
