import React from "react";
import '../assets/css/signIn.css'
import logoImage from "../assets/images/logo-profile-path-way.png"
import { NavLink } from "react-router-dom";

function SignIn() {
  return (
    <>
    <div className="sigin-header text-center fs-1 bg-light">
      <NavLink to={`/`}>
      <img src={logoImage} alt="logo" style={{width:"200px"}} />
      </NavLink>
    </div>
      <form className="signIn-form bg-light">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          SignIn
        </button>
      </form>
    </>
  );
}

export default SignIn;
