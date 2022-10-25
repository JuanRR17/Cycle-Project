import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { Context } from "../store/appContext";
import "../../styles/home.css";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    await actions.login(email, password);
  };

  const handleCancel = () => {
    navigate("/");
  };

  useEffect(() => {
    if (store.token && store.token != "") navigate("/profile");
  }, [store.token]);

  useEffect(() => {
    actions.clearmessage();
  }, []);

  return (
    <div className="m-auto bg-warning px-5 py-4 shadow rounded-3 bg-gradient">
      <h1 className="text-light fw-bolder text-center">Login</h1>

      <div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label text-success fw-bolder "
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label text-success fw-bolder"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {store.message && (
          <span className="text-danger fw-bolder">{store.message}</span>
        )}
        <div className="py-2 d-flex gap-2">
          <button
            // type="submit"
            className="btn btn-success btn-custom"
            onClick={handleLogin}
          >
            Login
          </button>
          <button onClick={handleCancel} className="btn btn-danger btn-custom ">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
