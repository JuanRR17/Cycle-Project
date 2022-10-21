import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Favourites from "./byproducts/Favourites";
import { Context } from "../store/appContext";
import Basket from "./byproducts/Basket";
import { IconContext } from "react-icons";
import { FaPowerOff } from "react-icons/fa";

const Navbar = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    // if (!sessionStorage.getItem("token") || !store.token) {
    if (!store.data && store.token) {
      actions.getCurrentUserData();
    }
  });

  return (
    <nav
      className="navbar nav-tabs navbar-expand-sm navbar-light bg-warning px-5 sticky-top"
      style={{ background: "linear-gradient(to left, orange, yellow)" }}
    >
      <Link to="/">Logo</Link>
      <button
        className="navbar-toggler "
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
        className="collapse navbar-collapse d-flex flex-row-reverse text-center"
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
              <Link to="profile">
                <span className="nav-item nav-link">{store.data.username}</span>
              </Link>
              <Favourites />
              <Basket />
              {/* <button
                onClick={() => actions.logout()}
                className="btn btn-danger p-1 m-1"
              > */}
              <IconContext.Provider value={{ className: "", size: 35 }}>
                <div>
                  <FaPowerOff
                    onClick={() => actions.logout()}
                    className="btn btn-danger p-2 m-1"
                  />
                </div>
              </IconContext.Provider>

              {/* </button> */}
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

Navbar.propTypes = {};

export default Navbar;
