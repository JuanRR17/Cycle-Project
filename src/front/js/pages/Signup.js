import React, { useState, useContext, useEffect, useMemo } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const { store, actions } = useContext(Context);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState();
  const [message, setMessage] = useState(store.message);

  // const message = useMemo(() => store.message, [store.message]);
  useEffect(() => {
    actions.clearmessage();
  }, []);

  const handleSubmit = async () => {
    let select_errors;
    if (!username) {
      select_errors = { ...select_errors, username: "Enter a Username" };
    }
    if (!email) {
      select_errors = { ...select_errors, email: "Enter an email" };
    }
    if (!password) {
      select_errors = { ...select_errors, password: "Enter a password" };
    }

    //Check if any error exists
    // console.log("select_errors", select_errors);
    if (select_errors) {
      setErrors(select_errors);
      actions.clearmessage();
      return;
    } else if (errors) {
      setErrors("");
    }

    if (await actions.signup(username, email, password)) {
      navigate("/login");
    }
  };

  const handleCancel = () => {
    actions.clearmessage();
    navigate("/");
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
            {errors?.username ? (
              <div className="text-danger">{errors?.username}</div>
            ) : null}
            {store.message && store.message.split(" ")[1] === "username" ? (
              <div className="text-danger">{store.message}</div>
            ) : null}
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
            {errors?.email ? (
              <div className="text-danger">{errors?.email}</div>
            ) : null}
            {store.message && store.message.split(" ")[1] === "email" ? (
              <div className="text-danger">{store.message}</div>
            ) : null}
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
            {errors?.password ? (
              <div className="text-danger">{errors?.password}</div>
            ) : null}
          </div>
        </div>
        {/* {store.message ? <div>{store.message}</div> : null} */}
        <div className="py-2 d-flex gap-2">
          <button
            // type="submit"
            className="btn btn-success btn-custom"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <button onClick={handleCancel} className="btn btn-danger btn-custom">
            Cancel
          </button>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};
