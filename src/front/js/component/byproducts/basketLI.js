import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";

const BasketLI = ({ item }) => {
  const { store, actions } = useContext(Context);

  return (
    <li className="dropdown-item ">
      <Link className="text-decoration-none" to={"/product/" + item.product_id}>
        {item.product.name}
      </Link>
      <span
        className="float-end ms-2"
        type="button"
        onClick={() => actions.delete_from_basket(item.id)}
      >
        <MdDelete />
      </span>
    </li>
  );
};

BasketLI.propTypes = {};

export default BasketLI;
