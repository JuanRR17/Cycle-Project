import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useLocation, useNavigate } from "react-router-dom";
import Quantity from "../component/orders/quantity";
import { TiArrowBackOutline } from "react-icons/ti";
import FavouriteIcon from "../component/icons/favouriteIcon";
import BasketIcon from "../component/icons/basketIcon";
import { IconContext } from "react-icons";

export const Product = () => {
  const { store, actions } = useContext(Context);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/").slice(-1);

  useEffect(() => {
    actions.syncTokenFromSessionStore();
    console.log("store:", store);
    if (!store.data) {
      actions.getCurrentUserData();
    } else if (!store.user) {
      const items_user = store.basket.map((item) => {
        return item.product.user_id;
      })[0];
      actions.getUserData(items_user);
    }
    if (!store.product || store.product.id != id) {
      actions.getProductData(id);
    }
    if (store.basket.length === 0) {
      actions.clearProductData();
    }
    actions.clearmessage();
  }, []);

  useEffect(() => {
    if (!store.product || store.product.id != id) {
      actions.getProductData(id);
    }
  }, [store.token]);

  const product = store.product;

  const handleBuy = () => {
    if (actions.check_user(product.user) && actions.check_qty(quantity)) {
      actions.check_basket_add(quantity);
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
                  <span>{product.location}</span>
                  {store.token ? (
                    <span>
                      {product.price} €/{product.unit}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-6">
                <div>Type: {product.type}</div>
                {store.data ? (
                  <>
                    <div>
                      Stock: {product.stock} {product.unit}
                    </div>
                    {product.user_id === store.data.id ? (
                      <div>Created By You</div>
                    ) : (
                      <>
                        <div>Created By {product.user.username}</div>
                        {/* <div>Phone: {product.user.phone}</div>
                        <div>Email: {product.user.email}</div> */}
                      </>
                    )}
                    <div>Description:</div>
                    <div>{product.description}</div>
                    Quantiy:{" "}
                    <Quantity
                      quantity={quantity}
                      stock={product.stock}
                      handleSetQuantity={(value) => setQuantity(value)}
                    />{" "}
                    {product.unit}
                  </>
                ) : null}

                <div>
                  <IconContext.Provider
                    value={{ className: "shared-class", size: 25 }}
                  >
                    <>
                      <FavouriteIcon product={product} />
                      <BasketIcon product={product} />
                    </>
                  </IconContext.Provider>

                  {store.token && product.user_id !== store.data?.id ? (
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={handleBuy}
                    >
                      Buy
                    </button>
                  ) : null}
                  <div className="text-danger">
                    {store.message ? store.message : ""}
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
