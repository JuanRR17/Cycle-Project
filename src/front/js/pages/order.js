import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import OrderRows from "../component/orders/OrderRows";

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
      // else if(){

      // }
    }
  });
  return (
    <div>
      <h1>Order Details</h1>
      {store.order ? (
        <>
          <div>Order Id: {store.order.id}</div>
          <div>Creation Date: {store.order.created_at}</div>
          <div>Client: {store.order.user_id}</div>
          <div>Seller: {store.order.seller}</div>
          <div>Items</div>
          <OrderRows orderRows={store.order.order_rows} />
          <div>Total: {store.order.total} €</div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

Order.propTypes = {};

export default Order;
