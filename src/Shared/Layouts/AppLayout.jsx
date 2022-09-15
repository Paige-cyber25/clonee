import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import NavMenu from "../Components/NavMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLoggedIn, validateLoggedIn } from "../../libs/app";

export default function AppLayout(props) {

  if(!isLoggedIn()) {
    return <Navigate to={'/auth/check'} />
  }

  return (
    <div id="layout-wrapper">
      <Header />
      <NavMenu />
      <div className="vertical-overlay"></div>
      <div className="main-content">
        <Outlet />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Footer />
      </div>
    </div>
  );
}
