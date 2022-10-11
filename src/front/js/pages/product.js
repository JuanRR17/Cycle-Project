import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useLocation, useNavigate } from "react-router-dom";
import Quantity from "../component/orders/quantity";
import { TiArrowBackOutline } from "react-icons/ti";
import FavouriteIcon from "../component/byproducts/favouriteIcon";

export const Product = () => {
  const { store, actions } = useContext(Context);
  const [quantity, setQuantity] = useState(0);
  const [user, setUser] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/").slice(-1);

  useEffect(() => {
    if (store.product == undefined) {
      actions.getProductData(id);
    }
  }, []);

  const handleBuy = () => {
    navigate("/confirm_order");
  };
  console.log("store.data:", store.data);

  return (
    <div className="mt-3">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate(-1)}
      >
        <TiArrowBackOutline /> Back
      </button>

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
                <Quantity
                  quantity={quantity}
                  handleSetQuantity={(value) => setQuantity(value)}
                />
                <div>
                  <FavouriteIcon product={store.product} url={location} />
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleBuy}
                  >
                    Buy
                  </button>
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
