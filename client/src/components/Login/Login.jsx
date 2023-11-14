import React, {useState, useEffect} from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import OtpInput from "react-otp-input";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import loader from "../../assets/images/loader.svg";
import { useUserAuth } from "../../context/AuthContext";
import "./Login.css";

function Login({ setShowProp, fromCheckout }) {
  const [isSignUp, setSignUp] = useState(false);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

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
        toast.error(error.message);
        reject(error);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!isSignUp && !number) ||
      (isSignUp && (!number || !name || !email))) {
      return toast.error("Please fill in all required fields.");
    }

    try {
      setLoading(true);
      const response = await sendDataToServer();

      if(response === "Create an Account") {
        setSignUp(true);

      } else if(response === "User Details Saved" || response === "User Found") {
        const confirmationResult = await setUpRecaptha(number);
        toast.success("OTP sent successfully!");
        setResult(confirmationResult);
        setShowOtp(true);

      } else {
        toast.error(response);
      }

    } catch(err) {
      console.error("Error during phone number sign in:", err);
      toast.error("An error occurred during phone number sign in. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      result.confirm(otp).then((result) => {
        console.log(result);
        setShowProp();
      });
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error("Invalid OTP - Please try again");
      setLoading(false);
    }
  };

  return(
    <div className="login-container">
      <Toaster
        position="bottom-center"
      />
      <div className="back-button-div mob-view">
        <button className="back-button">
          <span class="material-symbols-outlined back-button-icon"
          onClick={() => setShowProp()}>arrow_back_ios</span>
        </button>
      </div>
      <div className={fromCheckout ? "ck-login-img" : "login-img"}></div>
      <div className={fromCheckout ? "ck-login-div" : "login-div"}>
        {showOtp ? (
          <p>
            <div className={fromCheckout ? "ck-active-text" : "active-text"}>
              <span class="material-symbols-outlined clear-otp-icon"
              onClick={(event) => setShowOtp(false)}>arrow_back_ios</span>
              Enter OTP
            </div>
            We've sent an OTP to your phone number.
          </p>
        ) : (
          <p style={{display: fromCheckout ? "none":"block"}}>
            <span className="active-text">{isSignUp ? "Signup" : "Login"}</span> or
            <span className="inactive-text" onClick={() => setSignUp(!isSignUp)}>{isSignUp ? " Login" : " Signup"}</span>
          </p>
        )}

        <form>
          {showOtp ? (
            <div className="form-group">
              <OtpInput numInputs={6} isInputNum={true} value={otp} onChange={setOtp}
               shouldAutoFocus={true} renderInput={(props) => <input {...props} />}
               inputStyle={{
                  border: "1px solid rgb(204, 204, 204)",
                  borderRadius: "8px",
                  width: "44px",
                  height: "44px",
                  fontSize: "24px",
                  margin: "0 6px 18px 0",
                  boxShadow: "rgba(0, 0, 0, 0.04) 0px 4px 4px 0px"
                }}
              />
            </div>
          ) : (
            <div className="form-group">
              <PhoneInput defaultCountry="IN" placeholder="Phone number" className="form-control"
               autoComplete="off" value={number} onChange={setNumber} />
            </div>
          )}

          {isSignUp && (
            <>
              <div className="form-group">
                <input type="text" autoComplete="off" placeholder="Full Name" className="form-control" id="name" name="name"
                 value={name} onChange={(e) => {setName(e.target.value)}} required/>
              </div>
              <div className="form-group">
                <input type="email" autoComplete="off" maxLength="40" placeholder="Email Address" className="form-control" id="email"
                 name="email" value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
              </div>
            </>
          )}

          <button name="submit" className="submit-btn" id="sign-in-button"
           onClick={showOtp ? "" : handleSubmit} disabled={loading}>
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
