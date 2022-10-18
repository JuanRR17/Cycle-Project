import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import BasketItem from "./basketItem";

const ItemsTable = ({ total }) => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div>Items from user: {store.user?.username}</div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Actions</th>
            <th scope="col">By-Product</th>
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
    </>
  );
};

ItemsTable.propTypes = {
  total: PropTypes.number,
};

export default ItemsTable;
