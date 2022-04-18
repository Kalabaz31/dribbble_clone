import React from "react";

import { yz_logo } from "../../assets";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="app__footer">
      <div className="app__footer-header">
        <img src={yz_logo} alt="" />
        <p>
          Dribbble is the world's leading community for creatives to share,
          grow, and get hired.
        </p>
      </div>

      <div className="app__footer-content">
        <p>© 2022 Dribbble. All rights reserved.</p>
        <p>18,037,801 shots dribbbled</p>
      </div>
    </div>
  );
};

export default Footer;
