import React, {useState} from "react";
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
        <p> Help & Support</p>
      </div>
    </div>
      <h1 style={{fontSize: '20px'}} className="pc-view">Help & Support</h1>
      {!isSubmitted ? (
        <>
          <p className="help-info" style={{fontSize: '15px', color: 'rgba(0,0,0,0.64)', margin: '8px 0 16px'}}>
            If you have any questions or need help with your order, please don't hesitate to contact us.</p>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="form-group">
              <input name="name" type="text" autoComplete="off" placeholder="Your name" className="form-control"
               value={name} onChange={(e) => setName(e.target.value)} required/>
              </div>

              <div className="form-group">
              <input name="phone" type="text" autoComplete="off" pattern="[0-9]*" maxLength="10" placeholder="Your phone number" inputMode="numeric"
                className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
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
        <div style={{textAlign: 'center', margin: '12% 0'}}>
          <div>
            <img style={{width: '180px', height: '180px'}} src="https://drive.google.com/uc?id=1pggpvq1qfPOY48yPXRXhLFZydO97ElBJ" alt="confirm-img" />
            <p style={{fontSize: '18px', fontWeight: '600', marginBottom: '8px'}}>Query registered successfully!</p>
          </div>
          <p>Thank you for your patience. We will get back to you as soon as possible</p>
        </div>
      )}
    </div>
  );
}

export default Help;
