import React, { useState } from 'react';
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import "./DataDeletion.css"

function DataDeletion() {
  const [number, setNumber] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const msg = "delete my account"
    const data = {
      number,
      msg,
    };

    await axios.post("https://mopin-server.vercel.app/formspree", data);
    setRequestSubmitted(true);
  };

  return (
    <div className="data-deletion-container">
      <h1>Data Deletion Request</h1>

      {requestSubmitted ? (
        <div className="success-container">
          <div>
            <img className="success-img" src="https://mopin-assets.s3.ap-south-1.amazonaws.com/base+images/checkmark-icon" alt="confirm-img" />
            <p className="success-msg">Query registered successfully!</p>
          </div>
          <p>Your deletion request has been submitted. We will process your request as soon as possible.</p>
        </div>
      ) : (
      <>
        <p>
          To request the deletion of your account and associated data from <b>Mopin</b>, please enter the phone number linked to your account below.
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="form-group">
            <PhoneInput defaultCountry="IN" placeholder="Your phone number" className="form-control"
              autoComplete="off" value={number} onChange={setNumber} />
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
          <p className="delete-tc" >* All your stored data will be deleted within a span of 7 days.</p>
        </form>
      </>
      )}
    </div>
  );
}

export default DataDeletion;
