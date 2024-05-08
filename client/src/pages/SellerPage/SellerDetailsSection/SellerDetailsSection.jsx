import React, { useState, useEffect, useRef } from "react";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import woman from "../../../assets/woman.png";
import "./SellerDetailsSection.css";

const SellerDetailsSection = ({ sellerDetails, showCheckboxes, setShowCheckboxes }) => {
  const navigate = useNavigate();
  const [isSticky, setSticky] = useState(false);
  const backFavBtnDivRef = useRef(null);
  const backFavBtnWrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const isSticky = scrollPosition > 180;
      setSticky(isSticky);

      if (backFavBtnDivRef.current && backFavBtnWrapperRef.current) {
        backFavBtnDivRef.current.classList.toggle("backFavBtn-div-sticky", isSticky);
        backFavBtnWrapperRef.current.classList.toggle("backFavBtn-wrapper-unfixed", isSticky);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let rotation = (scrollPosition / 16) % 360;
      if (rotation > 180) {
        rotation -= 360;
      }
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(-50%) rotate(${rotation}deg)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="seller-container">
      <div className="seller-div-pc pc-view">
        <span className="top-bar"></span>
        <img className="seller-food-img" src={sellerDetails.imgURL} alt="food-img" />
        <div className="seller-details-div">
          <div className="sellerName-div">
            <img className="avatar-img" src={woman} alt="avatar-img" />
            <h1 className="sellerName"> {sellerDetails.name} </h1>
          </div>
          <div style={{padding: '24px 0'}}>
            <span className="tag-line"></span>
            <div className="seller-sub-info">
              <p>Feeds: {sellerDetails.feeds}</p>
              <span className="span" style={{margin: '0 28px'}}>•</span>
              <div className="rating-svg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="#349E46" style={{width: '1.2rem'}}>
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                </svg>
                <span>{sellerDetails.rating}</span>
              </div>
              <span className="span" style={{margin: '0 28px'}}>•</span>
              <p>{parseInt(sellerDetails.noOfOrders/ 5, 10) * 5} + orders</p>
            </div>
            <span className="tag-line"></span>
          </div>
          <Button color="tertiary" variant="contained" sx={{borderRadius: '12px', textTransform: 'none', fontSize: '18px', fontWeight: '400'}} onClick={() => setShowCheckboxes(!showCheckboxes)}>
            Subscribe
          </Button>
        </div>
        <img className="seller-food-img blurred-img" src={sellerDetails.imgURL} alt="food-img" />
        <span className="bottom-bar"></span>
      </div>
      <div className="seller-div-mobile mob-view">
        <div ref={backFavBtnWrapperRef} className="backFavBtn-wrapper">
          <div ref={backFavBtnDivRef} className="backFavBtn-div">
            <ArrowBackIosIcon onClick={() => navigate(-1)} sx={{color: isSticky ? "#222222" : "#fff"}}></ArrowBackIosIcon>
            <div>
              <div>{sellerDetails.name}</div>
              <div>{sellerDetails.foodType}</div>
            </div>
            <Checkbox icon={<FavoriteBorder sx={{color: isSticky ? "#222222" : "#fff"}}/>} checkedIcon={<Favorite sx={{color: isSticky ? "#f16122" : "#fff"}}/>} />
          </div>
        </div>
        <div className="seller-details-wrapper">
          <img ref={imageRef} className="anim-food-img" src={sellerDetails.imgURL} alt="food-img" />
          <div>
            <h1> {sellerDetails.name} </h1>
            <p>{sellerDetails.foodType}</p>
            <Button color="secondary" variant="contained" sx={{marginTop: '12px', borderRadius: '12px', textTransform: 'none', fontSize: '18px', fontWeight: '400'}} onClick={() => setShowCheckboxes(!showCheckboxes)}>
              Subscribe
            </Button>
          </div>
          <div className="sub-info-mobile">
            <p>Feeds: {sellerDetails.feeds}</p>
            <span className="span">•</span>
            <div className="rating-svg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="#349E46" style={{width: '0.96rem'}}>
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
              </svg>
              <span>{sellerDetails.rating}</span>
            </div>
            <span className="span">•</span>
            <p>{parseInt(sellerDetails.noOfOrders/ 5, 10) * 5} + orders</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SellerDetailsSection;
