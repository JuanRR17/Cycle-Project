import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import ProductCard from "../component/byproducts/productCard";

export const List = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAllProducts();
  }, []);

  useEffect(() => {
    actions.syncTokenFromSessionStore();
    if (!store.data && store.token) {
      actions.logout();
    }
  });

  return (
    <div className="text-center mt-5">
      <h1>By-Products List</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {store.all_products
          ? store.all_products.map((p, idx) => {
              return <ProductCard key={idx} details={p} />;
            })
          : "No By-Products to show"}
      </div>
    </div>
  );
};
