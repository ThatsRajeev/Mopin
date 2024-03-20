import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import { MuiTelInput } from 'mui-tel-input'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import loader from "../../assets/loader.svg";
import { useUserAuth } from "../../context/AuthContext";
import TextField from '@mui/material/TextField';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./Login.css";

function Login({ setShowProp }) {
  const [isSignUp, setSignUp] = useState(false);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const { setUpRecaptha } = useUserAuth();

  useEffect(() => {
    setName(""); setEmail(""); setOtp("");
  }, [isSignUp]);

  useEffect(() => {
    if (otp.length === 6) {
      verifyOtp();
    }
  }, [otp]);

  useEffect(() => {
    const storedResendData = localStorage.getItem("resendData");
    if (storedResendData) {
      const { count, timestamp } = JSON.parse(storedResendData);
      const currentTime = new Date().getTime();

      const elapsedTime = currentTime - timestamp;

      if (count < 3 && elapsedTime > 30000) {
        setResendDisabled(false);
      }
      else if(count >= 3 && elapsedTime > 3.6e+6) {
        localStorage.removeItem("resendData");
        setResendDisabled(false);
      }
    } else {
      setResendDisabled(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if(resendTimer > 0) {
        setResendTimer(prev => prev-1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [resendTimer]);

  const sendDataToServer = async (event) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = {
          phoneNumber: number.replace(/\s/g, ''),
          name: name,
          email: email,
        };
        const res = await axios.post("https://mopin-server.vercel.app/api/endpoint", data);
        resolve(res.data);
      } catch (error) {
        toast.error(error.message);
        reject(error);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!isSignUp && !number) ||
      (isSignUp && (number.length<6 || !name || !email))) {
      return toast.error("Please fill in all required fields.");
    }

    try {
      setLoading(true);
      const res = await sendDataToServer();

      if(res.message === "Create an Account") {
        setSignUp(true);

      } else if(res.message === "User Details Saved" || res.message === "User Found") {
        if (resendDisabled) {
          toast.error("You have reached the maximum resend attempts. Please try again after some time.");
        } else {
          const confirmationResult = await setUpRecaptha(number);
          setResult(confirmationResult);
          toast.success("OTP sent successfully!");
          setSignUp(false); setShowOtp(true); setResendTimer(30);

          const storedResendData = localStorage.getItem("resendData");
          const { count = 0 } = storedResendData ? JSON.parse(storedResendData) : {};
          if (count + 1 > 3) {
            setResendDisabled(true);
          }

          const resendData = {
            count: count + 1,
            timestamp: new Date().getTime(),
          };
          localStorage.setItem("resendData", JSON.stringify(resendData));
        }

      } else {
        toast.error(res.message);
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
    result.confirm(otp)
      .then((res) => {
        setShowProp('login');
      })
      .catch((err) => {
        console.error("Error during OTP verification:", err);
        toast.error("Invalid OTP - Please try again");
        setLoading(false);
      });
  };

  return(
    <div className="login-container">
      <Toaster
        position="bottom-center"
      />
      <div className="back-button-div mob-view">
        <button className="back-button">
          <ArrowBackIosIcon onClick={() => setShowProp('login')} sx={{fontSize: '16px'}}/>
        </button>
      </div>
      <div className="login-img"></div>
      <div className="login-div">
        {showOtp ? (
          <p className="otp-text">
            <div className="active-text">
              <ArrowBackIosIcon onClick={(event) => setShowOtp(false)} sx={{marginRight: '8px'}}/>
              Enter OTP
            </div>
            We've sent an OTP to your phone number.
          </p>
        ) : (
          <p>
            <span className="active-text">{isSignUp ? "Signup" : "Login"}</span> or
            <span className="inactive-text" onClick={() => setSignUp(!isSignUp)}>{isSignUp ? " Login" : " Signup"}</span>
          </p>
        )}

        <form>
          {showOtp ? (
            <>
              <MuiOtpInput display="flex" gap={1.6} TextFieldsProps={{size: 'small'}} autoFocus value={otp} onChange={setOtp}
                sx={{marginBottom: '16px'}} fullWidth validateChar={(value) => {return /^\d$/.test(value) ? value : ""}} length={6}/>

              {resendTimer > 0 ? (
                <p className="resend-p">Didn't recieve code? Resend OTP after <b>{resendTimer} seconds</b></p>
              ) : (
                resendDisabled ? (
                  <p className="resend-p">Maximum resend attempts reached</p>
                ) : (
                  <Button fullWidth size="large" variant="outlined" onClick={handleSubmit} sx={{marginBottom: '16px'}}>Resend OTP on SMS</Button>
                )
              )}
            </>
          ) : (
            <MuiTelInput defaultCountry="IN" fullWidth size="small" placeholder="Phone Number"
            sx={{margin: '18px 0'}} value={number} onChange={setNumber} />
          )}

          {isSignUp && (
            <>
              <TextField name="name" fullWidth label="Name" size="small" sx={{marginBottom: '18px'}}
               value={name} onChange={(e) => setName(e.target.value)}/>
              <TextField name="email" fullWidth label="Email Address" size="small" sx={{marginBottom: '18px'}}
              value={email} onChange={(e) => setEmail(e.target.value)}/>
            </>
          )}

          <Button type="submit" fullWidth size="large" variant="contained" id="sign-in-button"
           onClick={showOtp ? "" : handleSubmit} disabled={showOtp && otp.length !== 6}>
             {isSignUp ? "Sign Me Up" : "Login With OTP"}
             {loading && <img className="loader-img" src={loader} alt="load-img" />}
           </Button>
        </form>
        <p className="login-tc" >By {isSignUp ? 'creating an account': 'signing in'}, I accept the Terms and Conditions of Mopin.</p>
      </div>
    </div>
  );
}

export default Login;
