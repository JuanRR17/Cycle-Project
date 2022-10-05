import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("handleSubmit");
    if (await actions.signup(username, email, password)) {
      console.log("User created");
      navigate("/login");
    }
  };

  return (
    <div className="m-auto w-75 bg-warning p-3">
      <h1>Create Profile</h1>
      {/* <form className="container"> */}
      <div className="container">
        <div className="row">
          {/* username field */}
          <div className="mb-3 col col-lg-6">
            <label htmlFor="inputUser" className="form-label">
              Username *
            </label>
            <input
              required
              type="text"
              className="form-control"
              id="inputUser"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* email field */}
          <div className="mb-3 col-md-6">
            <label htmlFor="inputEmail" className="form-label">
              Email *
            </label>
            <input
              required
              type="email"
              className="form-control"
              id="inputEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Company field */}
          <div className="mb-3 col-md-6">
            <label htmlFor="inputCompany" className="form-label">
              Company
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCompany"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          {/* Phone field */}
          <div className="mb-3 col-md-6">
            <label htmlFor="inputPhone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPhone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {/* Location field */}
          <div className="mb-3 col-md-6">
            <label htmlFor="inputLocation" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="inputLocation"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          {/* password field */}
          <div className="mb-3 col-lg-6">
            <label htmlFor="inputPassword" className="form-label">
              Password *
            </label>
            <input
              required
              type="password"
              className="form-control"
              id="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {store.message ? <div>{store.message}</div> : null}
        <button
          // type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
        {/* </form> */}
      </div>
    </div>
  );
};
