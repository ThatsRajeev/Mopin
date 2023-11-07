import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import loader from "../assets/images/loader.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import { useUserAuth } from "../context/AuthContext";

function Login({ fetchData, setShowProp, fromCheckout, setLogged }) {
  const [flag, setFlag] = useState(false);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [enterOtp, setEnterOtp] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUpRecaptha } = useUserAuth();

  useEffect(() => {
    setName(""); setEmail(""); setOtp("");

    if (otp.length === 6) {
      verifyOtp();
    }
  }, [flag, otp]);

  const sendDataToServer = async (event) => {
    if(event) {
      event.preventDefault();
    }
    return new Promise(async (resolve, reject) => {
      try {
        const data = {
          phoneNumber: number,
          name: name,
          email: email,
        };
        const response = await axios.post("https://mopin-server.vercel.app/api/endpoint", data);
        resolve(response.data);
      } catch (error) {
        return alert(error);
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target.form;

    if (!form.checkValidity() || enterOtp) {
      if ((flag && (!number || !name || !email)) || (!flag && !number)) {
        return alert("Please fill in all required fields.");
      }
    } else {
      const response = await sendDataToServer();

      if (response === "Create an Account") {
        setFlag(true);
      } else if (response === "User Details Saved" || response === "User Found") {
        setFlag(false);
        setLoading(true);
        try {
          const response = await setUpRecaptha(number);
          setResult(response);
          setEnterOtp(true);
        } catch (err) {
          alert(err.message);
          setLoading(false);
        }
      } else {
        alert(response);
      }
    }
  }

  const verifyOtp = async (event) => {
    setLoading(true);
    try {
      await result.confirm(otp);

      const authenticate = async (event) => {
        try {
          await axios.post("https://mopin-server.vercel.app/api/authenticate", {number}, {
            withCredentials: true
          });
          fetchData();
          setLoading(false);
          setLogged(true);
          navigate("/");
        } catch (error) {
          alert(error.message);
        }
      };

      authenticate();
    } catch (error) {
      return alert("Invalid OTP - Please try again");
      console.error("Error during OTP verification:", error);
    }
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
        {enterOtp ? <p style={{marginBottom: "24px"}}> <span className={fromCheckout ? "ck-active-text" : "active-text"}><FontAwesomeIcon
          style={{ marginRight: "10px", cursor: "pointer" }}
          icon={faAngleLeft}
          onClick={(event)=> setEnterOtp(false)}
        />Enter OTP</span>
            We've sent an OTP to your phone number.</p> :
              <p style={{marginBottom: "24px", display: fromCheckout ? "none":"block"}}> <span className="active-text">{flag ? "Signup" : "Login"}</span> or
            <span className="inactive-text" onClick={() => setFlag(!flag)}>{flag ? " Login" : " Signup"}</span></p>}

        <form>
          <div className="form-group">
          <PhoneInput autoComplete="off" defaultCountry="IN" placeholder="Phone number" className="form-control"
           id="phoneNum" value={number} onChange={setNumber} required/>
          </div>

          {enterOtp &&
          <div className="form-group">
          <input type="text" autoComplete="off" pattern="[0-9]*" maxLength="6" placeholder="One time password" inputMode="numeric" className="form-control"
           id="phoneNum" value={otp} onChange={(e) => setOtp(e.target.value)} required/>
          </div>}

          {flag && (
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
             {flag ? "Sign Me Up" : "Login With OTP"}
             {loading && <img style={{marginLeft: '6px'}} src={loader} alt="load-img" />}</button>
        </form>
        <p className="login-tc" style={{display: fromCheckout ? 'none':'block'}}>By {flag ? 'creating an account': 'signing in'}, I accept the Terms and Conditions of Mopin.</p>
      </div>
    </div>
  );
}

export default Login;
