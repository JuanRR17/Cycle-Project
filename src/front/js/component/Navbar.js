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
      className="navbar navbar-expand-sm navbar-light bg-light nav-tabs sticky-top"
      style={{ background: "linear-gradient(to left, orange, yellow)" }}
    >
      <div className="container">
        <Link className="nav-item nav-link" to="/">
          Logo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <Link className="nav-item nav-link" to="/">
              <span>Home</span>
            </Link>
            <Link className="nav-item nav-link" to="/prod_list">
              <span>Products</span>
            </Link>
            <Link className="nav-item nav-link" to="/blog">
              <span>Blog</span>
            </Link>
            {store.token && store.data ? (
              <>
                <Link className="nav-item nav-link" to="profile">
                  <span>{store.data.username}</span>
                </Link>
                <Favourites />
                <Basket />
                <IconContext.Provider value={{ className: "", size: 35 }}>
                  <div>
                    <FaPowerOff
                      onClick={() => actions.logout()}
                      className="btn btn-danger p-2 m-1"
                    />
                  </div>
                </IconContext.Provider>
              </>
            ) : (
              <>
                <Link className="nav-item nav-link" to="signup">
                  <span>Sign Up</span>
                </Link>
                <Link className="nav-item nav-link" to="login">
                  <span>Login</span>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
