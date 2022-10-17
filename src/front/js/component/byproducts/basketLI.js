import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import DeleteIcon from "../icons/deleteIcon";

const BasketLI = ({ item }) => {
  const { store, actions } = useContext(Context);

  return (
    <li className="dropdown-item ">
      <Link className="text-decoration-none" to={"/product/" + item.product_id}>
        {item.product.name}
      </Link>
      <span className="float-end">
        <DeleteIcon
          id={item.id}
          handleRemove={(value) => actions.delete_from_basket(value)}
        />
      </span>
    </li>
  );
};

BasketLI.propTypes = {};

export default BasketLI;
