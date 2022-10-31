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
    } else {
      setFilteredList(all_Products);
    }
  }, [origin]);

  console.log("all_Products:", all_Products);

  //Filters selected by user
  useEffect(() => {
    let products = [];
    //Filter by user by-products
    if (userCheck) {
      products = all_Products.filter((product) => {
        return product.user_id !== store.data.id;
      });
    } else {
      products = all_Products;
    }
    // Filter by Distance
    if (distanceFilter) {
      products = products.filter((product) => {
        return product.distance <= distance;
      });
    }
    // Filter by Type
    if (+filter !== 0) {
      const filterByTypeList = products.filter((product) => {
        return product.type === store.types[filter];
      });
      setFilteredList(filterByTypeList);
    } else {
      setFilteredList(products);
    }
  }, [filter, all_Products, userCheck, distanceFilter]);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <div className=" bg-custom">
      {store.all_products ? (
        <>
          <div className="container-fluid">
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
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Hide your By-Products
                </label>
              </div>
            )}
            <div className="row justify-content-center gap-2">
              <div className="col-sm-9 col-lg-4">
                <Distance
                  distance={distance}
                  distanceFilter={distanceFilter}
                  handleSetDistance={(value) => setDistance(value)}
                  handleSetDistanceFilter={(value) => setDistanceFilter(value)}
                  handleSetOrigin={(value) => setOrigin(value)}
                />
              </div>
              <div className="col-sm-9 col-lg-4">
                <SearchBar
                  placeholder="Search By-Products"
                  data={store.all_products}
                />
              </div>
              <div className="col-sm-9 col-lg-2">
                <Filter
                  label="Type"
                  fields={store.types}
                  handleSetFilter={(value) => {
                    setFilter(value);
                  }}
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {filteredList &&
                  filteredList.map((p, idx) => {
                    return (
                      <ProductCard
                        key={idx}
                        details={p}
                        distanceFilter={distanceFilter}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      ) : (
        "No By-Products to show"
      )}
    </div>
  );
};

ProductsList.propTypes = {};

export default ProductsList;
