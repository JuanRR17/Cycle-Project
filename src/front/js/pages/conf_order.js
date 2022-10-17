import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import BasketItem from "../component/orders/basketItem";

const ConfirmOrder = (props) => {
  const { store, actions } = useContext(Context);
  const [total, setTotal] = useState(0);
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
  useEffect(() => {
    let new_total = 0;
    store.basket.forEach((item) => {
      new_total += item.subtotal;
      setTotal(new_total);
    });
  });

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
            <td className="pe-5 text-end" colSpan="7">
              Total
            </td>
            <td className="pe-5 text-end">{total} €</td>
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
