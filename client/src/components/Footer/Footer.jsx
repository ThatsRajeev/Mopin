import React from "react";
import { Link } from 'react-router-dom';
import insta from "../../assets/insta.png";
import fb from "../../assets/fb.png";
import twitter from "../../assets/twitter.png";
import googleLogo from "../../assets/google-play-badge.png";
import AppleLogo from "../../assets/app-store-logo.png";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-container">
          <div>
            <b>Our Story</b>
            <p>Who are we</p>
            <p>Know your food</p>
            <p>FAQs</p>
            <p><Link className="custom-link" to="/terms">Terms and Conditions</Link></p>
            <p><Link className="custom-link" to="/contact-us">Contact us</Link></p>
          </div>
          <div>
            <b>For Sellers</b>
            <p>Partner with us</p>
            <p>Share your Story</p>
          </div>
          <div>
            <b>Learn more</b>
            <p><Link className="custom-link" to="/privacy-policy">Privacy policy</Link></p>
            <p>Security</p>
            <p><Link className="custom-link" to="/cancellation-refund">Refund and Cancellation Policy</Link></p>
            <p><Link className="custom-link" to="/shipping-delivery">Ship and Delivery Policy</Link></p>
          </div>
          <div>
            <b>Social links</b>
            <div className="social-container">
              <a href="#">
                <img src={insta} alt="insta-img" />
              </a>
              <a href="#">
                <img src={fb} alt="fb-img" />
              </a>
              <a href="#">
                <img src={twitter} alt="twitter-img" />
              </a>
            </div>
            <div>
              <a href="#">
                <img
                  className="download-img"
                  src={googleLogo}
                  alt="google-play-img"
                />
              </a>
              <a href="#">
                <img
                  className="download-img"
                  src={AppleLogo}
                  alt="apple-store-img"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="company-details">
          <h3>mopin</h3>
          <p>Copyright © {year}. Mopin- All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
