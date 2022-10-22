import React, { useState, useContext, useEffect, useMemo } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useLocation, useNavigate } from "react-router-dom";
import Quantity from "../component/orders/Quantity";
import { TiArrowBackOutline } from "react-icons/ti";
import FavouriteIcon from "../component/icons/FavouriteIcon";
import BasketIcon from "../component/icons/BasketIcon";
import { IconContext } from "react-icons";
import thinkay from "../../img/thinkay.jpg";

export const Product = () => {
  const { store, actions } = useContext(Context);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();
  const id = useMemo(() => location.pathname.split("/").slice(-1), [location]);

  // const id = location.pathname.split("/").slice(-1);

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
  }, [id]);

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
              <div className="col-sm-8">
                <img
                  // src={require(store.product.image?.path).default}
                  src={require("../../img/thinkay.jpg").default}
                  // src={thinkay}
                  alt={product.name}
                  className="img-fluid img-thumbnail"
                />
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
              <div className="col-sm-4">
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
                    Quantity:{" "}
                    <Quantity
                      quantity={quantity}
                      stock={product.stock}
                      handleSetQuantity={(value) => setQuantity(value)}
                    />{" "}
                    {product.unit}
                  </>
                ) : null}

                <div className="mt-2">
                  {store.token && product.user_id !== store.data?.id ? (
                    <button
                      type="button"
                      className="btn btn-warning lh-sm px-4 py-2"
                      onClick={handleBuy}
                    >
                      Buy
                    </button>
                  ) : null}
                  <span className="ms-4">
                    {store.message ? store.message : ""}
                    <IconContext.Provider
                      value={{ className: "mx-2", size: 25 }}
                    >
                      <>
                        <FavouriteIcon product={product} />
                        <BasketIcon product={product} />
                      </>
                    </IconContext.Provider>
                  </span>
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
