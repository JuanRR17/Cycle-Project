import React from "react";
import PropTypes from "prop-types";
import { ImSearch } from "react-icons/im";
import { Link } from "react-router-dom";

const SearchBar = ({ placeholder, data }) => {
  const LIstyle = {};
  return (
    <div className="dropdown">
      <div className="form-control me-2 d-flex">
        <div>
          <ImSearch />
        </div>
        <input
          className="border-0 flex-grow-1"
          type="text"
          placeholder={placeholder}
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
        />
        <ul
          className="dropdown-menu p-0 border-0"
          aria-labelledby="dropdownMenuButton1"
        >
          {data.map((product) => {
            return (
              <li
                key={product.id}
                className="list-group-item list-group-item-action p-1"
              >
                <Link
                  className="text-decoration-none"
                  to={`/product/${product.id}`}
                >
                  {product.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
