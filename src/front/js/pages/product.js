import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useLocation } from "react-router-dom";

export const Product = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  const id = location.pathname.split("/").slice(-1);

  const [quantity, setQuantity] = useState(0);
  console.log("quantity:", quantity);
  useEffect(() => {
    if (store.product == undefined) {
      actions.getProductData(id);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.value > store.product.stock) {
      setQuantity(store.product.stock);
    } else if (e.target.value < 0) {
      setQuantity(0);
    } else {
      setQuantity(e.target.value);
    }
  };

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
                <div>
                  Quantiy:
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => {
                        if (quantity < store.product.stock)
                          setQuantity(quantity + 1);
                      }}
                    >
                      +
                    </button>
                    <input
                      value={quantity}
                      onChange={handleChange}
                      type="text"
                      className="btn btn-outline-primary"
                      id="btncheck2"
                      // autoComplete="off"
                      placeholder="0"
                      max={store.product.stock}
                      min="0"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => {
                        if (quantity > 0) setQuantity(quantity - 1);
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
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
