import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import BasketItem from "../component/orders/basketItem";

const ConfirmOrder = (props) => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    actions.syncTokenFromSessionStore();
    if (!sessionStorage.getItem("token") || !store.token) {
      actions.logout();
      navigate("/");
    }
    if (!store.data) {
      actions.getCurrentUserData();
    }
  });

  console.log("confirm order basket:", store.basket);
  return (
    <div>
      <div>Confirm Order</div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Actions</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Location</th>
            <th scope="col">Stock</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {store.basket
            ? store.basket.map((part, idx) => {
                return <BasketItem key={idx} item={part} />;
              })
            : "No Items in Basket"}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-end" colSpan="6">
              Total
            </td>
            <td>@mdo</td>
          </tr>
        </tfoot>
      </table>
      <button className="btn btn-success">Confirm</button>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="btn btn-danger"
      >
        Cancel
      </button>
    </div>
  );
};

ConfirmOrder.propTypes = {};

export default ConfirmOrder;
