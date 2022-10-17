import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Quantity from "./quantity";
import DeleteIcon from "../icons/DeleteIcon";
import { Context } from "../../store/appContext";

const BasketItem = ({ item }) => {
  const { store, actions } = useContext(Context);
  const [quantity, setQuantity] = useState(0);
  // const [subtotal, setSubtotal] = useState(0);

  // const subtotal = quantity * item.product.price;
  // console.log("item:", item);
  // item.subtotal = subtotal;

  // useEffect(() => {
  //   if (quantity !== item.quantity)
  //     actions.bi_quantity(item.id, item.quantity, item.quantity * item.product.price);
  // }, [quantity]);

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
      <td>{item.product.stock}</td>
      <td>
        <Quantity
          quantity={item.quantity}
          stock={item.product.stock}
          handleSetQuantity={(value) =>
            actions.bi_quantity(item.id, value, value * item.product.price)
          }
        />
      </td>
      <td>{item.product.price}</td>
      <td>{item.subtotal}</td>
    </tr>
  );
};

BasketItem.propTypes = {};

export default BasketItem;
