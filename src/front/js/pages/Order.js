import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import OrderRows from "../component/orders/OrderRows";
import BackButton from "../component/buttons/BackButton";
import Checkout from "../component/payment/Checkout";

const Order = (props) => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/").slice(-1);

  useEffect(() => {
    actions.syncTokenFromSessionStore();
    if (!sessionStorage.getItem("token") || !store.token) {
      actions.logout();
      navigate("/");
    } else {
      if (!store.data) {
        actions.getCurrentUserData();
      }
      if (!store.orders_made && store.data) {
        actions.getMadeOrders(store.data.id);
      }
      if (!store.orders_sold && store.data) {
        actions.getSoldOrders(store.data.id);
      }
      if (!store.order || store.order.id != id) {
        actions.getOrderData(id);
      }
    }
  });
  return (
    <div className="m-3 bg-custom px-5 py-4">
      <BackButton route={"/profile"} />
      <h1>Order Details</h1>
      {store.order ? (
        <div className="container-fluid">
          <div className="row gap-2">
            <div className="col mb-2">
              <label className="mb-0">Order Id: </label>{" "}
              <div>{store.order.id}</div>
            </div>
            <div className="col-auto mb-2">
              <label className="mb-0">Creation Date: </label>{" "}
              <div>{store.order.created_at}</div>
            </div>
            <div className="col mb-2">
              <label className="mb-0">Client: </label>{" "}
              <div>{store.order.user_id ?? "User deleted"}</div>
            </div>
            <div className="col mb-2">
              <label className="mb-0">Seller: </label>{" "}
              <div>{store.order.seller_username ?? "User deleted"}</div>
            </div>
          </div>
          <label className="mb-0">Order Items:</label>
          <div className="my-2">
            <OrderRows orderRows={store.order.order_rows} />
          </div>
          <div className=" fw-bolder text-end">
            <div>Hola</div>
            <Checkout />
            Total: {store.order.total} €
          </div>
        </div>
      ) : (
        "This order doesn't exist"
      )}
    </div>
  );
};

Order.propTypes = {};

export default Order;
