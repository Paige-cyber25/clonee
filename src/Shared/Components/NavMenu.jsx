import React from "react";
import { Link } from "react-router-dom";
import LogoDark from "./Logos/LogoDark";
import LogoLight from "./Logos/LogoLight";
import SimpleBar from 'simplebar-react';

import 'simplebar/dist/simplebar.min.css';

const NavMenu = () => {
  return (
    <div className="app-menu navbar-menu">
      <div className="navbar-brand-box">
        <LogoDark />
        <LogoLight />
        <button
          type="button"
          className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
          id="vertical-hover"
        >
          <i className="ri-record-circle-line"></i>
        </button>
      </div>

      <SimpleBar id="scrollbar" className="h-100">
          <div className="container-fluid">
            <div id="two-column-menu"></div>
            <ul className="navbar-nav" id="navbar-nav">
              <li className="menu-title">
                <span data-key="t-menu">Menu</span>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/">
                  <i className="ri-dashboard-2-line"></i>
                  <span data-key="t-dashboards">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link menu-link">
                  <i className="ri-apps-2-line"></i>
                  <span data-key="t-products">Products</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/orders" className="nav-link menu-link">
                  <i className="ri-shopping-bag-3-line"></i>
                  <span data-key="t-orders">Orders</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/invoices" className="nav-link menu-link">
                  <i className="ri-pages-line"></i>
                  <span data-key="t-orders">Invoices</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/customers" className="nav-link menu-link">
                  <i className="ri-contacts-line"></i>
                  <span data-key="t-customers">Customers</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/chats" className="nav-link menu-link">
                  <i className="ri-message-3-line"></i>
                  <span data-key="t-customers">Chats</span>
                  <span className="badge badge-pill bg-success" data-key="t-new">2</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/insights" className="nav-link menu-link">
                  <i className="ri-bar-chart-line"></i>
                  <span data-key="t-insights">Insights</span>
                </Link>
              </li>

              <li className="menu-title">
                <i className="ri-more-fill"></i>
                <span data-key="t-settings">Settings</span>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="#sidebarLayouts"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarLayouts"
                >
                  <i className="ri-settings-2-line"></i>
                  <span data-key="t-layouts">Store Settings</span>
                </Link>
                <div className="collapse menu-dropdown" id="sidebarLayouts">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to="/settings/store-front"
                        className="nav-link"
                        data-key="t-two-column"
                      >
                        Store Front
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/settings/store-details"
                        className="nav-link"
                        data-key="t-horizontal"
                      >
                        Store Details
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/settings/payments"
                        className="nav-link"
                        data-key="t-detached"
                      >
                        Payment
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <Link className="nav-link menu-link" to="/settings/profile">
                  <i className="ri-account-circle-line"></i>
                  <span data-key="t-authentication">Profile</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link menu-link" to="/logout">
                  <i className="ri-logout-circle-line"></i>
                  <span data-key="t-authentication">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
      </SimpleBar>
    </div>
  );
}

export default NavMenu;