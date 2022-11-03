import React, { useState, useContext, useEffect, useMemo } from "react";
import { Context } from "../store/appContext";
import Distance from "../component/filters/Distance";
import Filter from "../component/filters/Filter";
import ProductCard from "../component/byproducts/ProductCard";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import PropTypes from "prop-types";

const ProductsList = () => {
  const { store, actions } = useContext(Context);
  const [typeFilter, setTypeFilter] = useState(0);
  const [filteredList, setFilteredList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [distance, setDistance] = useState("");
  const [distanceFilter, setDistanceFilter] = useState(false);
  const [origin, setOrigin] = useState("");
  const [sortBy, setSortBy] = useState(0);
  const [sortByArray, setSortByArray] = useState(["", "Name", "Location"]);

  const token = useMemo(() => store.token, [store.token]);
  const userCheck = useMemo(() => {
    return checked;
  }, [checked]);

  const all_Products = useMemo(() => store.all_products, [store.all_products]);

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
      setSortByArray(["", "Name", "Location", "Distance"]);
    } else {
      actions.getAllProducts();
      if (sortByArray[sortBy] === "Distance") {
        setSortBy(0);
      }
      setSortByArray(["", "Name", "Location"]);
    }
  }, [origin, sortBy]);

  //Filters selected by user
  useEffect(() => {
    let products = all_Products;

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
    if (typeFilter !== 0) {
      products = products.filter((product) => {
        return product.type === store.types[typeFilter];
      });
    }

    //Sort By
    if (sortBy !== 0) {
      const sortedProducts = [].concat(products);
      if (sortByArray[sortBy] === "Distance" && origin) {
        sortedProducts.sort((a, b) => {
          return a.distance - b.distance;
        });
      } else {
        sortedProducts.sort((a, b) => {
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
      }
      setFilteredList(sortedProducts);
    } else {
      setFilteredList(products);
    }
  }, [typeFilter, all_Products, userCheck, distanceFilter, sortBy]);

  const handleUserCheck = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div className=" bg-custom">
      {store.all_products ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 d-flex flex-column gap-2 mb-3">
              {token && (
                <div className="form-check d-flex gap-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={handleUserCheck}
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
              <div className="row align-items-center gap-2">
                <div className="col-6 col-xl-12">
                  <Distance
                    distance={distance}
                    distanceFilter={distanceFilter}
                    handleSetDistance={(value) => setDistance(value)}
                    handleSetDistanceFilter={(value) =>
                      setDistanceFilter(value)
                    }
                    handleSetOrigin={(value) => setOrigin(value)}
                  />
                </div>
                <div className="col-auto col-xl-12">
                  <Filter
                    label="Type"
                    fields={store.types}
                    handleSetFilter={(value) => {
                      setTypeFilter(value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-xl-9">
              {" "}
              <div className="mb-2">
                <label className="form-check-label">
                  Items:{" "}
                  {filteredList ? filteredList.length : all_Products.length} /{" "}
                  {all_Products.length}
                </label>
                <div>
                  <label>
                    <IconContext.Provider value={{ size: 20 }}>
                      <FaSortAmountDownAlt />{" "}
                    </IconContext.Provider>
                  </label>
                  <div className="d-inline-block ms-2">
                    <Filter
                      label="Sort by"
                      fields={sortByArray}
                      handleSetFilter={(value) => {
                        setSortBy(value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap gap-3 justify-content-start">
                {filteredList
                  ? filteredList.map((p, idx) => {
                      return (
                        <ProductCard key={idx} details={p} origin={origin} />
                      );
                    })
                  : store.all_products.map((p, idx) => {
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
