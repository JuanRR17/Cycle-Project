import React, { useState, useContext, useEffect, useMemo } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.css";
import ProductCard from "../component/byproducts/ProductCard";
import SearchBar from "../component/search_bar/SearchBar";
import Filter from "../component/filters/Filter";
import Distance from "../component/filters/Distance";

const ProductsList = () => {
  const { store, actions } = useContext(Context);
  const [filter, setFilter] = useState(0);
  const [filteredList, setFilteredList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [distance, setDistance] = useState("");
  const [distanceFilter, setDistanceFilter] = useState(false);
  const [origin, setOrigin] = useState("");
  const [sortBy, setSortBy] = useState(0);

  const token = useMemo(() => store.token, [store.token]);
  const userCheck = useMemo(() => {
    return checked;
  }, [checked]);

  const all_Products = useMemo(() => store.all_products, [store.all_products]);

  const sortByArray = [
    "",
    // "Distance",
    "Name",
    "Location",
  ];

  //Check user is logon
  useEffect(() => {
    actions.syncTokenFromSessionStore();
    if (!sessionStorage.getItem("token") && !token) {
      actions.logout();
    }
  }, [token]);

  //Get Products List
  useEffect(() => {
    actions.getAllProducts();
  }, []);

  //Calculate products distance
  useEffect(() => {
    if (origin) {
      actions.getAllProducts(origin);
    } else {
      actions.getAllProducts();
    }
  }, [origin]);

  //Filters selected by user
  useEffect(() => {
    let products = all_Products;
    // setFilteredList(all_Products);

    //Filter by user by-products
    if (userCheck) {
      products = products.filter((product) => {
        return product.user_id !== store.data.id;
      });
    }

    // Filter by Distance
    if (distanceFilter) {
      products = products.filter((product) => {
        return product.distance <= distance;
      });
    }
    // Filter by Type
    if (+filter !== 0) {
      products = products.filter((product) => {
        return product.type === store.types[filter];
      });
    }

    //Sort By
    if (+sortBy !== 0) {
      products.sort((a, b) => {
        const nameA = a[sortByArray[sortBy].toLowerCase()].toLowerCase(); // ignore upper and lowercase
        const nameB = b[sortByArray[sortBy].toLowerCase()].toLowerCase(); // ignore upper and lowercase

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      console.log("products", products);
    }
    setFilteredList(products);
  }, [filter, all_Products, userCheck, distanceFilter, sortBy]);

  // useEffect(() => {
  //   //Sort By
  //   if (+sortBy !== 0) {
  //     filteredList.map((a) => {
  //       console.log(
  //         "a[sortByArray[sortBy]]",
  //         a[sortByArray[sortBy].toLowerCase()]
  //       );
  //     });
  //     const sortByList = filteredList.sort((a, b) => {
  //       const nameA = a[sortByArray[sortBy].toLowerCase()].toLowerCase(); // ignore upper and lowercase
  //       const nameB = b[sortByArray[sortBy].toLowerCase()].toLowerCase(); // ignore upper and lowercase

  //       if (nameA < nameB) {
  //         return -1;
  //       }
  //       if (nameA > nameB) {
  //         return 1;
  //       }

  //       // names must be equal
  //       return 0;
  //     });
  //     console.log("sortByList", sortByList);

  //     setFilteredList(sortByList);
  //   }
  // }, [sortBy]);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div className=" bg-custom">
      {store.all_products ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 d-flex flex-column gap-2 mb-3">
              {token && (
                <div className="form-check d-flex gap-2 justify-content-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={handleChange}
                    checked={checked}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Hide your By-Products
                  </label>
                </div>
              )}
              <label className="form-check-label mb-0">Distance Filter:</label>
              <Distance
                distance={distance}
                distanceFilter={distanceFilter}
                handleSetDistance={(value) => setDistance(value)}
                handleSetDistanceFilter={(value) => setDistanceFilter(value)}
                handleSetOrigin={(value) => setOrigin(value)}
              />
              <div>
                <Filter
                  label="Type"
                  fields={store.types}
                  handleSetFilter={(value) => {
                    setFilter(value);
                  }}
                />
              </div>
            </div>

            <div className="col-lg-9">
              {" "}
              <label className="form-check-label ms-3">
                Items:{" "}
                {filteredList ? filteredList.length : all_Products.length} /{" "}
                {all_Products.length}
              </label>
              <Filter
                label="Sort by"
                fields={sortByArray}
                handleSetFilter={(value) => {
                  setSortBy(value);
                }}
              />
              <div className="d-flex flex-wrap gap-3">
                {filteredList &&
                  filteredList.map((p, idx) => {
                    return (
                      <ProductCard key={idx} details={p} origin={origin} />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        "No By-Products to show"
      )}
    </div>
  );
};

ProductsList.propTypes = {};

export default ProductsList;
