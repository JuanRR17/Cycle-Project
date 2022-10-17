import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useLocation, useNavigate } from "react-router-dom";
import Quantity from "../component/orders/quantity";
import { TiArrowBackOutline } from "react-icons/ti";
import FavouriteIcon from "../component/icons/favouriteIcon";
import BasketIcon from "../component/icons/basketIcon";

export const Product = () => {
  const { store, actions } = useContext(Context);
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/").slice(-1);

  useEffect(() => {
    if (store.product == undefined || store.product.id != id) {
      actions.getProductData(id);
    }
  }, []);

  const product = store.product;
  const basket_prods_ids = store.basket.map((item) => {
    return item.product.id;
  });

  const handleBuy = () => {
    if (quantity === 0) {
      setErrors("Please select a quantity bigger than 0");
    } else {
      if (basket_prods_ids.includes(product.id)) {
        const basket_item = store.basket.filter((bi) => {
          return bi.product.id === product.id;
        })[0];
        const id = basket_item.id;
        const total_qty = basket_item.quantity + quantity;
        actions.bi_quantity(id, total_qty);
      } else {
        actions.add_to_basket(store.data.id, product.id, quantity);
      }
      navigate("/confirm_order");
    }
  };

  return (
    <div className="mt-3">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate("/prod_list")}
      >
        <TiArrowBackOutline /> Back
      </button>

      {store.product ? (
        <>
          <h1 className="text-center">{product.name}</h1>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <img alt={product.name} />
                <div className="card-title d-flex justify-content-between">
                  <span>
                    {product.price}/{product.unit}
                  </span>
                  <span>{product.location}</span>
                </div>
              </div>
              <div className="col-6">
                <div>Type: {product.type}</div>
                <div>Stock: {product.stock}</div>
                <div>Description: {product.description}</div>
                <div>Created By: {product.user.username}</div>
                <div>Phone: {product.user.phone}</div>
                <div>Email: {product.user.email}</div>
                Quantiy:{" "}
                <Quantity
                  quantity={quantity}
                  stock={product.stock}
                  handleSetQuantity={(value) => setQuantity(value)}
                />{" "}
                {product.unit}
                <div>
                  <FavouriteIcon product={product} />
                  <BasketIcon product={product} />
                  {store.token ? (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleBuy}
                    >
                      Buy
                    </button>
                  ) : null}
                  <div className="text-danger">{errors}</div>
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
