import React, {useState, useEffect} from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import loader from "../assets/images/loader.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import { useUserAuth } from "../context/AuthContext";

function Login({ fetchData, setShowProp, fromCheckout, setLogged }) {
  const [isSignUp, setSignUp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [getOTP, setOTP] = useState("");
  const [enterOTP, setEnterOTP] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {setName(""); setEmail(""); setOTP("");
    }, [isSignUp]);

  useEffect(() => {
    if(getOTP.length === 6) {
      OTP();
    }
  }, [getOTP])

  const { setUpRecaptha } = useUserAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target.form;
    if(form.checkValidity() && getOTP.length !== 6) {
      onSignInSubmit(event);
    } else {
      if (isSignUp && (!phoneNumber || !name || !email)) {
        return alert("Please fill in all required fields.");
      }
      if (!isSignUp && (!phoneNumber)) {
        return alert("Please fill in all required fields.")
      }
    }
  }

  const onSignInSubmit = async (event) => {
    const response = await sendDataToServer();

    if (response === "Create an Account") {
      setSignUp(true);
      return;
    } else if (response === "User Details Saved" || response === "User Found") {
      if(isSignUp) { setSignUp(false)};
      setLoading(true);
      try {
        const response = await setUpRecaptha(phoneNumber);
        setResult(response);
        setEnterOTP(true);
      } catch(err) {
        console.log('Error during phone number sign in:', err);
        setLoading(false);
      }
    } else {
      return alert(response);
    }
  };

const OTP = async (event) => {
  setLoading(true);
  try {
    await result.confirm(getOTP);
    if(setLogged) {
      setLogged(true);
    }

    const authenticate = async (event) => {
      try {
        await axios.post("https://mopin-server.vercel.app/api/authenticate", {phoneNumber}, {
          withCredentials: true
        });
        fetchData();
        setLoading(false);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    };

    authenticate();
  } catch (error) {
    return alert("Invalid OTP - Please try again");
    console.error("Error during OTP verification:", error);
  }
};

const sendDataToServer = async (event) => {
  if(event) {
    event.preventDefault();
  }
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        phoneNumber: phoneNumber,
        name: name.length ? name : "",
        email: email.length ? email : "",
      };
      const response = await axios.post("https://mopin-server.vercel.app/api/endpoint", data);
      console.log("Response from server: " + response.data);

      resolve(response.data);
    } catch (error) {
      console.error(error);
    }
  });
};

  return(
    <div className="login-container">
      <div className="back-button-div mob-view">
        <button className="back-button">
          <span class="material-symbols-outlined" style={{fontSize: '18px', margin: '0'}} onClick={() => setShowProp()}>arrow_back_ios</span>
        </button>
      </div>
      <div className={fromCheckout ? "ck-login-img" : "login-img"}></div>
      <div className={fromCheckout ? "ck-login-div" : "login-div"}>
        {enterOTP ? <p style={{marginBottom: "24px"}}> <span className={fromCheckout ? "ck-active-text" : "active-text"}><FontAwesomeIcon
          style={{ marginRight: "10px", cursor: "pointer" }}
          icon={faAngleLeft}
          onClick={(event)=> setEnterOTP(false)}
        />Enter OTP</span>
            We've sent an OTP to your phone number.</p> :
              <p style={{marginBottom: "24px", display: fromCheckout ? "none":"block"}}> <span className="active-text">{isSignUp ? "Signup" : "Login"}</span> or
            <span className="inactive-text" onClick={() => setSignUp(!isSignUp)}>{isSignUp ? " Login" : " Signup"}</span></p>}

        <form>
          <div className="form-group">
          <PhoneInput autoComplete="off" defaultCountry="IN" placeholder="Phone number" className="form-control"
           id="phoneNum" value={phoneNumber} onChange={setPhoneNumber} required/>
          </div>

          {enterOTP &&
          <div className="form-group">
          <input type="text" autoComplete="off" pattern="[0-9]*" maxLength="6" placeholder="One time password" inputMode="numeric" className="form-control"
           id="phoneNum" value={getOTP} onChange={(e) => setOTP(e.target.value)} required/>
          </div>}

          {isSignUp && (
            <>
            <div className="form-group">
              <input type="text" autoComplete="off" placeholder="Full Name" className="form-control" id="name" name="name"
               value={name} onChange={(event)=> setName(event.target.value)} required/>
            </div>
            <div className="form-group">
              <input type="email" autoComplete="off" maxLength="40" placeholder="Email Address" className="form-control" id="email"
               name="email" value={email} onChange={(event)=> setEmail(event.target.value)} required/>
            </div>
            </>
          )}
          <button name="submit" className="submit-btn" id="sign-in-button"
           onClick={handleSubmit} disabled={loading}>
             {isSignUp ? "Sign Me Up" : "Login With OTP"}
             {loading && <img style={{marginLeft: '6px'}} src={loader} alt="load-img" />}</button>
        </form>
        <p className="login-tc" style={{display: fromCheckout ? 'none':'block'}}>By {isSignUp ? 'creating an account': 'signing in'}, I accept the Terms and Conditions of Mopin.</p>
      </div>
    </div>
  );
}

export default Login;
