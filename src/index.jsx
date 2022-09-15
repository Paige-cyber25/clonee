import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import "./styles.css";

window.base_url = "http://3.237.32.174:8000/";
window.endpoint = window.base_url + "/api";
window.token = localStorage.getItem("token");
axios.defaults.baseURL = window.endpoint;
// axios.defaults.withCredentials = true;
axios.defaults.headers.common = {
  Authorization: "Bearer " + window.token,
  Accept: "application/json",
};


ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
  ,
  document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
