import React, { useContext } from "react";
import PropTypes from "prop-types";
import Quantity from "./Quantity";
import DeleteIcon from "../icons/DeleteIcon";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";

const BasketItem = ({ item }) => {
  const { store, actions } = useContext(Context);
  return (
    <tr className="align-middle basket-item">
      <td>
        <span className="text-center">
          <IconContext.Provider value={{ className: "", size: 20 }}>
            <DeleteIcon
              id={item.id}
              handleRemove={(value) => actions.delete_from_basket(value)}
            />
          </IconContext.Provider>
        </span>
      </td>

      <td>
        {" "}
        <Link className="basket-link" to={"/product/" + item.product_id}>
          {item.product.name}
        </Link>
      </td>
      <td>{item.product.type}</td>
      <td>{item.product.location}</td>
      <td className="text-center">
        <Quantity
          quantity={item.quantity}
          stock={item.product.stock}
          handleSetQuantity={(value) => actions.bi_quantity(item.id, value)}
        />
      </td>
      <td className="basket-number">{item.product.stock}</td>
      <td className="basket-number">
        {item.product.price} €/{item.product.unit}
      </td>
      <td className="basket-number">
        {(Math.round(item.subtotal * 100) / 100).toFixed(2)} €
      </td>
    </tr>
  );
};

BasketItem.propTypes = {
  item: PropTypes.object,
};

export default BasketItem;
