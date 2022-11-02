import React, { useState } from "react";
import PropTypes from "prop-types";
import { ImSearch } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const navigate = useNavigate();

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

  const style = {
    borderRadius: "100px",
    overflow: "hidden",
  };

  const ULstyle = {
    minWidth: "max-content",
  };

  return (
    <div className="dropdown">
      <div
        className="d-flex align-items-center form-control p-0 border-success border-3"
        style={style}
      >
        <input
          className="flex-grow-1 border-0 pe-0 form-control ms-1 m-0 shadow-none"
          type="text"
          placeholder="Search By-Products"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          onChange={handleFilter}
          value={wordEntered}
        />
        <div className="py-2 ps-1 pe-3">
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
          className="dropdown-menu p-0 border-success w-50 mt-0 ms-3 position-absolute"
          aria-labelledby="dropdownMenuButton1"
          style={ULstyle}
        >
          {filteredData.length > 0 ? (
            <>
              <li className="list-group-item list-group-item-action px-3 bg-success bg-opacity-25">
                <span>Name</span> <span className="ps-2 float-end">Price</span>
              </li>
              {filteredData.map((product) => {
                return (
                  <li
                    key={product.id}
                    className="list-group-item list-group-item-action px-3 border-1"
                  >
                    <div
                      className="text-decoration-none"
                      type="button"
                      onClick={() => {
                        const url = "/product/" + product.id;
                        navigate(url);
                        // clearInput();
                        setFilteredData([]);
                        setWordEntered(product.name);
                      }}
                    >
                      <span>{product.name}</span>{" "}
                      <span className="ps-4 float-end">
                        {product.price}€/{product.unit}
                      </span>
                    </div>
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
