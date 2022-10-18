import React, { useContext } from "react";
import PropTypes from "prop-types";
import Quantity from "./quantity";
import DeleteIcon from "../icons/deleteIcon";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

const BasketItem = ({ item }) => {
  const { store, actions } = useContext(Context);
  return (
    <tr>
      <td>
        <span className="text-center">
          <DeleteIcon
            id={item.id}
            handleRemove={(value) => actions.delete_from_basket(value)}
          />
        </span>
      </td>

      <td>
        {" "}
        <Link
          className="text-decoration-none"
          to={"/product/" + item.product_id}
        >
          {item.product.name}
        </Link>
      </td>
      <td>{item.product.type}</td>
      <td>{item.product.location}</td>
      <td className="pe-5 text-end">{item.product.stock}</td>
      <td>
        <Quantity
          quantity={item.quantity}
          stock={item.product.stock}
          handleSetQuantity={(value) => actions.bi_quantity(item.id, value)}
        />
      </td>
      <td className="pe-5 text-end">
        {item.product.price} €/{item.product.unit}
      </td>
      <td className="pe-5 text-end">{item.subtotal} €</td>
    </tr>
  );
};

BasketItem.propTypes = {
  item: PropTypes.object,
};

export default BasketItem;
