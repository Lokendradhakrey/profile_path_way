import React from "react";
import logoImage from "../assets/images/logo-profile-path-way.png"
import '../assets/css/navbar.css'
import { NavLink } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light fira-sans-style-medium">
        <div className="container">
          <NavLink className="navbar-brand" to={`/`}>
            <img className="logo" src={logoImage} alt="logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"   
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
              <NavLink className="nav-link first-color fs-5" to={`/`}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link first-color fs-5" to={`signIn`}>
                  LogIn
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link first-color fs-5" to={`signUp`}>
                  SignUp
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link first-color fs-5" to={`user-details`}>
                <i class="bi bi-person-circle"></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
