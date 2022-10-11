import React from "react";
import { Link } from "react-router-dom";
import Favourites from "./byproducts/favourites";

export const Navbar = () => {
  return (
    <nav className="navbar nav-tabs navbar-expand-lg navbar-light bg-warning px-5" style= {{background: "linear-gradient(to left, orange, yellow)"}}>
<Link to="/">Logo</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNav">
    <ul className="navbar-nav">
    <Link to="/">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      </li>
      </Link>
      <Link to="/product/:id">
      <li className="nav-item">
        <a className="nav-link" href="#">Products</a>
      </li>
      </Link>
      <Link to="/blog">
      <li className="nav-item">
        <a className="nav-link" href="#">Blog</a>
      </li>
      </Link>
      <Link to="/login">
      <li className="nav-item">
        <a className="nav-link" href="#">Login</a>
      </li>
      </Link>
    </ul>
  </div>
</nav> );
};

  