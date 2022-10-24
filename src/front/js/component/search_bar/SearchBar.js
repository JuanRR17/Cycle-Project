import React, { useState } from "react";
import PropTypes from "prop-types";
import { ImSearch } from "react-icons/im";
import { Link } from "react-router-dom";

const SearchBar = ({ placeholder, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else setFilteredData(newFilter);
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="dropdown">
      <div className="d-flex align-items-center form-control p-0">
        <input
          className="flex-grow-1 border-0 form-control"
          type="text"
          placeholder={placeholder}
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          onChange={handleFilter}
          value={wordEntered}
        />
        <div className="p-2">
          {wordEntered ? (
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={clearInput}
            ></button>
          ) : (
            <ImSearch />
          )}
        </div>

        <ul
          className="dropdown-menu p-0 border-0"
          aria-labelledby="dropdownMenuButton1"
        >
          {filteredData.length > 0 ? (
            <>
              <li className="list-group-item list-group-item-action p-1">
                <span>Name</span> <span className="ps-2 float-end">Price</span>
              </li>
              {filteredData.map((product) => {
                return (
                  <li
                    key={product.id}
                    className="list-group-item list-group-item-action p-1"
                  >
                    <Link
                      className="text-decoration-none"
                      to={`/product/${product.id}`}
                    >
                      <span>{product.name}</span>{" "}
                      <span className="ps-4 float-end">
                        {product.price}€/{product.unit}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </>
          ) : (
            <li className="list-group-item list-group-item-action p-1">
              No Results{" "}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
