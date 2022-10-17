import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import BasketIcon from "./basketIcon";
import DeleteIcon from "../icons/DeleteIcon";

const FavouriteLI = ({ fav }) => {
  const { store, actions } = useContext(Context);
  return (
    <li className="dropdown-item ">
      <Link className="text-decoration-none" to={"/product/" + fav.product_id}>
        {fav.product.name}
      </Link>
      <span className="float-end">
        <DeleteIcon
          id={fav.id}
          handleRemove={(value) => actions.delete_favourite(value)}
        />
      </span>
      <BasketIcon product={fav.product} />
    </li>
  );
};

FavouriteLI.propTypes = {};

export default FavouriteLI;
