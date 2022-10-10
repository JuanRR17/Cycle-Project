import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import ProductCard from "../component/byproducts/productCard";

export const List = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>By-Products List</h1>
      <ProductCard />
    </div>
  );
};
