import React from "react";
import iconmenu from "../assets/icon-menu.svg";
import logo from "../assets/Logo.svg";
import notification from "../assets/notification.png";
import globe from "../assets/icon-globe.png";
import setting from "../assets/setting.png";
import profileimage from "../assets/profile-img.png";

const Toolbar = ({ openSidebar }) => {
  return (
    <div className="toolbar">
      <img className="logo1" src={logo} />
      <div className="burger" onClick={openSidebar}>
        <img src={iconmenu} />
      </div>
      <div>
        <input className="input1" placeholder="search" type="search" />
      </div>
      <div className="righticons">
        <img src={notification} />
        <img src={globe} />
        <img src={setting} />
        <img src={profileimage} />
      </div>
      <div className="righttext">
        <p>
          <b>Charlie Howard</b>
        </p>
        <p>Frontend Developer</p>
      </div>
    </div>
  );
};

export default Toolbar;
