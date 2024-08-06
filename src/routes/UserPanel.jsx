import React from "react";
import logoImage from "../assets/images/logo-profile-path-way.png";
import { NavLink } from "react-router-dom";

function UserPanel() {
  return (
    <>
      <div className="sigin-header text-center fs-1 bg-light">
        <NavLink to={`/`}>
          <img src={logoImage} alt="logo" style={{ width: "200px" }} />
        </NavLink>
      </div>
    </>
  );
}

export default UserPanel;
