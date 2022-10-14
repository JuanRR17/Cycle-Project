import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Quantity from "../component/orders/quantity";

const ConfirmOrder = (props) => {
  const { store, actions } = useContext(Context);
  const [quantity, setQuantity] = useState(0);

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
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Type</th>
            <th scope="col">Location</th>
            <th scope="col">Quantity</th>
            <th scope="col">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {store.basket
            ? store.basket.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>{item.product.name}</td>
                    <td>{item.product.price}</td>
                    <td>{item.product.type}</td>
                    <td>{item.product.location}</td>
                    <td>
                      <Quantity
                        quantity={quantity}
                        handleSetQuantity={(value) => setQuantity(value)}
                      />
                    </td>
                    <td>{quantity * item.product.price}</td>
                  </tr>
                );
              })
            : "No Items in Basket"}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-end" colSpan="5">
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
