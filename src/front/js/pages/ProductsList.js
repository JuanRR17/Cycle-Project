import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.css";
import ProductCard from "../component/byproducts/ProductCard";
import SearchBar from "../component/search_bar/SearchBar";

const ProductsList = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAllProducts();
  }, []);

  useEffect(() => {
    actions.syncTokenFromSessionStore();
    if (!sessionStorage.getItem("token") && !store.token) {
      // if (!store.data && store.token) {
      actions.logout();
    }
  }, [store.token]);

  return (
    <div className="text-center mt-5">
      <h1>By-Products List</h1>

      {store.all_products ? (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-3 m-auto">
                <SearchBar
                  placeholder="Search By-Products"
                  data={store.all_products}
                />
              </div>
            </div>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center">
                {store.all_products.map((p, idx) => {
                  return <ProductCard key={idx} details={p} />;
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
