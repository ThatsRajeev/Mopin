import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import loader from "../../assets/images/loader.svg";
import { useUserAuth } from "../../context/AuthContext";
import "./Login.css";

function Login({ fetchData, setShowProp, fromCheckout, setLogged }) {
  const [isSignUp, setSignUp] = useState(false);
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
  }, [isSignUp]);

  useEffect(() => {
    if (otp.length === 6) {
      verifyOtp();
    }
  }, [otp]);

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
      if ((isSignUp && (!number || !name || !email)) || (!isSignUp && !number)) {
        return alert("Please fill in all required fields.");
      }
    } else {
      const response = await sendDataToServer();

      if (response === "Create an Account") {
        setSignUp(true);
      } else if (response === "User Details Saved" || response === "User Found") {
        setSignUp(false);
        setLoading(true);
        try {
          const confirmationResult = await setUpRecaptha(number);
          setResult(confirmationResult);
          setLoading(false); setEnterOtp(true);
        } catch (err) {
          console.error('Error during phone number sign in:', err);
          alert("An error occurred during phone number sign in. Please try again.");
          setLoading(false);
        }
      } else {
        alert(response);
      }
    }
  }

  const verifyOtp = async (event) => {
    setLoading(true);
    console.log(result);
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
          console.log(error);
        }
      };

      authenticate();
    } catch (error) {
      console.error("Error during OTP verification:", error);
      return alert("Invalid OTP - Please try again");
    }
  };

  return(
    <div className="login-container">
      <div className="back-button-div mob-view">
        <button className="back-button">
          <span class="material-symbols-outlined back-button-icon"
          onClick={() => setShowProp()}>arrow_back_ios</span>
        </button>
      </div>
      <div className={fromCheckout ? "ck-login-img" : "login-img"}></div>
      <div className={fromCheckout ? "ck-login-div" : "login-div"}>
        {enterOtp ? <p>
          <div className={fromCheckout ? "ck-active-text" : "active-text"}>
            <span class="material-symbols-outlined clear-otp-icon"
            onClick={(event) => setEnterOtp(false)}>arrow_back_ios</span>
            Enter OTP
          </div>
          We've sent an OTP to your phone number.</p> :
        <p style={{display: fromCheckout ? "none":"block"}}>
          <span className="active-text">{isSignUp ? "Signup" : "Login"}</span> or
          <span className="inactive-text" onClick={() => setSignUp(!isSignUp)}>{isSignUp ? " Login" : " Signup"}</span>
        </p>}

        <form>
          <div className="form-group">
          <PhoneInput autoComplete="off" defaultCountry="IN" placeholder="Phone number" className="form-control"
           id="phoneNum" value={number} onChange={setNumber} required/>
          </div>

          {enterOtp &&
          <div className="form-group">
          <input type="text" autoComplete="off" pattern="[0-9]*" maxLength="6" placeholder="One time password" inputMode="numeric" className="form-control"
           id="phoneNum" value={otp} onChange={(e) => {setOtp(e.target.value)}} required/>
          </div>}

          {isSignUp && (
            <>
            <div className="form-group">
              <input type="text" autoComplete="off" placeholder="Full Name" className="form-control" id="name" name="name"
               value={name} onChange={setName} required/>
            </div>
            <div className="form-group">
              <input type="email" autoComplete="off" maxLength="40" placeholder="Email Address" className="form-control" id="email"
               name="email" value={email} onChange={setEmail} required/>
            </div>
            </>
          )}

          <button name="submit" className="submit-btn" id="sign-in-button"
           onClick={handleSubmit} disabled={loading}>
             {isSignUp ? "Sign Me Up" : "Login With OTP"}
             {loading && <img className="loader-img" src={loader} alt="load-img" />}
          </button>
        </form>
        <p className="login-tc" style={{display: fromCheckout ? 'none':'block'}}>By {isSignUp ? 'creating an account': 'signing in'}, I accept the Terms and Conditions of Mopin.</p>
      </div>
    </div>
  );
}

export default Login;
