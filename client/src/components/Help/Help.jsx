import React, {useState} from "react";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import "./Help.css";

function Help({setShowProp}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subjectOptions = [
    "Not able to place an order",
    "Products Enquiry",
    "Money Deducted order not placed",
    "Service Enquiry",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      phone,
      subject,
      message,
    };

    try {
      await axios.post("https://mopin-server.vercel.app/formspree", data);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="help-section">
    <div className="mob-view">
      <div className="help-heading">
        <span class="material-symbols-outlined" onClick={() => setShowProp('help')}>arrow_back</span>
        <p> Help & Support </p>
      </div>
    </div>
      <h3 className="pc-view"> Help & Support </h3>
      {!isSubmitted ? (
        <>
          <p className="help-info">
            If you have any questions or need help with your order, please don't hesitate to contact us.</p>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="form-group">
              <PhoneInput defaultCountry="IN" placeholder="Your phone number" className="form-control"
               autoComplete="off" value={phone} onChange={setPhone} />
              </div>

              <div className="form-group">
              <input name="name" type="text" autoComplete="off" placeholder="Your name" className="form-control"
               value={name} onChange={(e) => setName(e.target.value)} required/>
              </div>

              <div className="form-group">
                <select name="subject" id="subject" className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} required>
                  <option value="" disabled>
                    Select your issue:
                  </option>
                  {subjectOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
              <textarea name="message" type="text" autoComplete="off" placeholder="Your message" className="form-control"
                value={message} required rows="4" onChange={(e) => setMessage(e.target.value)} required/>
              </div>
            </div>

            <button type="submit" className="submit-btn">Submit</button>

          </form>
        </>
      ) : (
        <div className="success-container">
          <div>
            <img className="success-img" src="https://drive.google.com/uc?id=1l2BlxW-B5l47c5QanudkPSvUwrii_jiW" alt="confirm-img" />
            <p className="success-msg">Query registered successfully!</p>
          </div>
          <p>Thank you for your patience. We will get back to you as soon as possible</p>
        </div>
      )}
    </div>
  );
}

export default Help;
