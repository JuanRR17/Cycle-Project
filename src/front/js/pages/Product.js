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
  console.log("store:", store);

  useEffect(() => {
    actions.syncTokenFromSessionStore();
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
  }, [store.product]);

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
      <div className="m-auto w-75  bg-warning p-5">
        <button
          type="button"
          className="btn btn-danger btn-custom m-2 float-end"
          onClick={() => navigate("/prod_list")}
        >
          <TiArrowBackOutline /> Back
        </button>
        {store.product ? (
          <>
            <h1 className="text-center fw-bolder mb-4">{product.name}</h1>
            <div className="container-fluid mx-0 text-success">
              <div className="row gap-3">
                <div className="col-lg-8">
                  <img
                    src={thinkay}
                    alt={product.name}
                    className="img-fluid img-thumbnail shadow"
                  />
                </div>
                <div className="row col-lg-4">
                  <div className="col-4 col-lg-12">
                    <label>Type:</label> {product.type}
                  </div>
                  {store.data ? (
                    <>
                      <div className="col-4 col-lg-12">
                        {" "}
                        <label>Location:</label> {product.location}
                      </div>
                      {store.token ? (
                        <div className="col-4 col-lg-12">
                          <label>Price:</label>
                          {product.price} €/{product.unit}
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="col-4 col-lg-12">
                        <label>Stock:</label> {product.stock} {product.unit}
                      </div>
                      {product.user_id === store.data.id ? (
                        <div className="col-4 col-lg-12">Created By You</div>
                      ) : (
                        <>
                          <div className="col-4 col-lg-12">
                            {" "}
                            <label>Created By:</label> {product.user.username}
                          </div>
                          {/* <div>Phone: {product.user.phone}</div>
                        <div>Email: {product.user.email}</div> */}
                        </>
                      )}
                      <div className="col-lg-12">
                        <label>Description:</label>
                      </div>
                      <div>{product.description}</div>
                      {store.token && product.user_id !== store.data.id ? (
                        <>
                          <div className="col-4 col-lg-12">
                            <label>Quantity:</label>
                          </div>
                          <div className="col-4 col-lg-12">
                            <Quantity
                              quantity={quantity}
                              stock={product.stock}
                              handleSetQuantity={(value) => setQuantity(value)}
                            />
                            <span className="ms-1">{product.unit}</span>
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : null}

                  <div className="d-flex gap-3 mt-2">
                    {store.token && product.user_id !== store.data?.id ? (
                      <div>
                        <button
                          type="button"
                          className="btn btn-success lh-sm px-4 py-2 btn-custom"
                          onClick={handleBuy}
                        >
                          Buy
                        </button>
                      </div>
                    ) : null}
                    <span>
                      {store.message ? store.message : ""}
                      <IconContext.Provider
                        value={{ className: "mx-2", size: 30 }}
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
    </div>
  );
};
