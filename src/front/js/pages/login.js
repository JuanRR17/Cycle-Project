import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    await actions.login(email, password);
    await actions.get_user_favourites();
  };

  const handleCancel = () => {
    navigate("/");
  };

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      navigate("/profile");
  }, [store.token]);

  useEffect(() => {
    actions.clearmessage();
  }, []);

  return (
    <div className="m-auto w-50">
      <h1>Login</h1>
      <div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
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
          <label htmlFor="exampleInputPassword1" className="form-label">
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
        {store.message && <div>{store.message}</div>}
        <button
          // type="submit"
          className="btn btn-success"
          onClick={handleLogin}
        >
          Login
        </button>
        <button onClick={handleCancel} className="btn btn-danger">
          Cancel
        </button>
      </div>
    </div>
  );
};
