import React, { useState, useContext, useEffect, useMemo } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.css";
import ProductCard from "../component/byproducts/ProductCard";
import SearchBar from "../component/search_bar/SearchBar";
import Filter from "../component/filters/Filter";

const ProductsList = () => {
  const { store, actions } = useContext(Context);
  const [filter, setFilter] = useState(0);
  const [filteredList, setFilteredList] = useState([]);

  const token = useMemo(() => store.token, [store.token]);

  const all_Products = useMemo(() => store.all_products, [store.all_products]);

  useEffect(() => {
    actions.getAllProducts();
  }, []);

  useEffect(() => {
    setFilteredList(all_Products);
  }, [all_Products]);

  useEffect(() => {
    if (+filter !== 0) {
      const filterByTypeList = all_Products.filter((product) => {
        return product.type === store.types[filter];
      });

      setFilteredList(filterByTypeList);
    } else {
      setFilteredList(all_Products);
    }
  }, [filter, all_Products]);

  useEffect(() => {
    actions.syncTokenFromSessionStore();
    if (!sessionStorage.getItem("token") && !token) {
      actions.logout();
    }
  }, [token]);

  return (
    <div className=" bg-custom">
      {store.all_products ? (
        <>
          <div className="container-fluid">
            <div className="row d-flex justify-content-center mx-5 my-3 gap-2">
              <div className="col-md-4 d-flex justify-content-end">
                <Filter
                  label="Type"
                  fields={store.types}
                  handleSetFilter={(value) => {
                    setFilter(value);
                  }}
                />
              </div>
              <div className="col-md-4">
                <SearchBar
                  placeholder="Search By-Products"
                  data={store.all_products}
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {filteredList &&
                  filteredList.map((p, idx) => {
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
