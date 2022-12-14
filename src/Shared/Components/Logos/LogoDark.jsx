import React from "react";
import { Link } from 'react-router-dom';

import logo from '../../../logos/wearslot/logo-color.png';
import Icon from "./Icon";

const LogoDark = () => {
  return (
    <Link to="/" className="logo logo-dark">
      <Icon/>
      <span className="logo-lg">
        <img src={logo} alt="" height="25" />
      </span>
    </Link>
  );
};

export default LogoDark;
