import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import UserByProductsTable from "../component/user_profile/UserByProductsTable";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-left mt-5">
      {store.token ? (
        <>
          <div>
            <Link to="profile">Profile</Link>
          </div>
          <button onClick={() => actions.logout()} className="btn btn-danger">
            Log out
          </button>
        </>
      ) : (
        <>
          <div>
            <Link to="signup">Sign Up</Link>
          </div>
          <div>
            <Link to="login">Login</Link>
          </div>
        </>
      )}
      <UserByProductsTable />
    </div>
  );
};
