import React from "react";
import PropTypes from "prop-types";
import { ImSearch } from "react-icons/im";

const SearchBar = ({ placeholder, data }) => {
  const test = [1, 2, 3];
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
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a class="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
