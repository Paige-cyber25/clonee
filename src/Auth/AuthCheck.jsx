import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../libs/app";

const AuthCheck = () => {
  
  
  const [autheticated, setAuthenticated] = useState(false);
  const auth_user = getCookie("_apuid") || 1;
  
  useEffect(() => {
    if (auth_user != null) {
      getAuthCredentials();
    }
  }, []);
  
  console.log(getCookie("_apuid"));
  if(getCookie("_apuid") == null) {
    // window.location.href = ("http://account.wearslot.now?service=sell&continue=http://localhost:3000");
  }
  
  async function getAuthCredentials() {
    try {
      var authCredendtials = axios.get(
        `/account/auth/get-auth-details?auth_user=${auth_user}&store_details=1`
      );
      var response = (await authCredendtials).data;

      if (response.success) {

        if(response.data.user && response.data.store) {

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("store", JSON.stringify(response.data.store));
          window.token = response.data.token;
          setAuthenticated(true);
        }
        else 
        {
          // window.location.href = ("https://account.wearslot.com?service=sell&continue=https://app.wearslot.com");
        }

      }
    } catch (error) {}
  }

  if(autheticated === true) {
    window.location.href = ("/");
  }

  return <>{autheticated === true ? <Navigate to={"/"} /> : null}</>;
};

export default AuthCheck;
