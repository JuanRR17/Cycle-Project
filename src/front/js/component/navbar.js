import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Favourites from "./byproducts/favourites";
import { Context } from "../store/appContext";
import Basket from "./byproducts/basket";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.data == undefined && store.token != undefined) {
      actions.getCurrentUserData();
    }
  });

  return (
    <nav
      className="navbar nav-tabs navbar-expand-lg navbar-light bg-warning px-5"
      style={{ background: "linear-gradient(to left, orange, yellow)" }}
    >
      <Link to="/">Logo</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse d-flex flex-row-reverse"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <Link to="/">
            <span className="nav-item nav-link">Home</span>
          </Link>
          <Link to="/prod_list">
            <span className="nav-item nav-link">Products</span>
          </Link>
          <Link to="/blog">
            <span className="nav-item nav-link">Blog</span>
          </Link>
          {store.token && store.data ? (
            <>
              <Favourites />
              <Basket />
              <Link to="profile">
                <span className="nav-item nav-link">{store.data.username}</span>
              </Link>
              <button
                onClick={() => actions.logout()}
                className="btn btn-danger"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="signup">
                <span className="nav-item nav-link">Sign Up</span>
              </Link>
              <Link to="login">
                <span className="nav-item nav-link">Login</span>
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
