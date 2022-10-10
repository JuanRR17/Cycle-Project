import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useLocation } from "react-router-dom";

export const Product = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  console.log("location", location);
  const id = location.pathname.split("/").slice(-1);
  useEffect(() => {
    if (store.product == undefined) {
      actions.getProductData(id);
    }
  }, []);
  console.log("product:", store.product);
  return (
    <div className="mt-3">
      {store.product ? (
        <>
          <h1 className="text-center">{store.product.name}</h1>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <img src="..." alt="..." />
                <div className="card-title d-flex justify-content-between">
                  <span>{store.product.price}</span>
                  <span>{store.product.location}</span>
                </div>
              </div>
              <div className="col-6">
                <div>Type: {store.product.type}</div>
                <div>Stock: {store.product.stock}</div>
                <div>Description: {store.product.description}</div>
                <div>Created By: {store.product.user.username}</div>
                <div>Phone: {store.product.user.phone}</div>
                <div>Email: {store.product.user.email}</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        "This product doesn't exist"
      )}
    </div>
  );
};
