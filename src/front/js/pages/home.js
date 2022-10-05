import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <div>
        <Link to="signup">Sign Up</Link>
      </div>
      <div>
        <Link to="login">Login</Link>
      </div>
      <div>
        <Link to="profile">Profile</Link>
      </div>
      <button onClick={() => actions.logout()} className="btn btn-danger">
        Log out
      </button>
    </div>
  );
};
