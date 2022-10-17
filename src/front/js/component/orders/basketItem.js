import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Quantity from "./quantity";
import DeleteIcon from "../icons/DeleteIcon";
import { Context } from "../../store/appContext";

const BasketItem = ({ item }) => {
  const { store, actions } = useContext(Context);

  console.log("basketItem", item);
  return (
    <tr>
      <td>
        <span className="text-center">
          <DeleteIcon
            id={item.id}
            handleRemove={(value) => actions.delete_favourite(value)}
          />
        </span>
      </td>
      <td>{item.product.name}</td>
      <td>{item.product.type}</td>
      <td>{item.product.location}</td>
      <td className="pe-5 text-end">{item.product.stock}</td>
      <td>
        <Quantity
          quantity={item.quantity}
          stock={item.product.stock}
          handleSetQuantity={(value) =>
            actions.bi_quantity(item.id, value, value * item.product.price)
          }
        />
      </td>
      <td className="pe-5 text-end">
        {item.product.price} €/{item.product.unit}
      </td>
      <td className="pe-5 text-end">{item.subtotal} €</td>
    </tr>
  );
};

BasketItem.propTypes = {};

export default BasketItem;
