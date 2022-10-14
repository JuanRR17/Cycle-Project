import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Quantity from "./quantity";
import { MdDelete } from "react-icons/md";
import { Context } from "../../store/appContext";

const BasketItem = ({ item }) => {
  const { store, actions } = useContext(Context);

  const [quantity, setQuantity] = useState(0);
  return (
    <tr>
      <td>
        <span
          className="float-end ms-2"
          type="button"
          onClick={() => actions.delete_from_basket(item.id)}
        >
          <MdDelete />
        </span>
      </td>
      <td>{item.product.name}</td>
      <td>{item.product.type}</td>
      <td>{item.product.location}</td>
      <td>{item.product.stock}</td>
      <td>
        <Quantity
          quantity={quantity}
          stock={item.product.stock}
          handleSetQuantity={(value) => setQuantity(value)}
        />
      </td>
      <td>{item.product.price}</td>
      <td>{quantity * item.product.price}</td>
    </tr>
  );
};

BasketItem.propTypes = {};

export default BasketItem;
