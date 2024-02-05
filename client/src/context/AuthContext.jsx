import { createContext, useContext } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";

import { useState, useEffect } from "react";

const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  function setUpRecaptha(number) {
    return new Promise(async (resolve, reject) => {
      try {
        if (window.recaptchaVerifier) {
        window.recaptchaVerifier.recaptcha.reset(window.recaptchaWidgetId);
      } else {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
            size: 'invisible',
          });
        window.recaptchaWidgetId = await window.recaptchaVerifier.render();
      }

        const confirmationResult = await signInWithPhoneNumber(auth, number, window.recaptchaVerifier);
        resolve(confirmationResult);
      } catch (error) {
        reject(error);
      }
    });
  }

  function logOut() {
    localStorage.removeItem("userData");
    localStorage.removeItem("savedAddress");
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ logOut, setUpRecaptha, user }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
