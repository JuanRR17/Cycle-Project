import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import BasketIcon from "./basketIcon";

const FavouriteLI = ({ fav }) => {
  const { store, actions } = useContext(Context);
  console.log("fav:", fav);
  return (
    <li className="dropdown-item ">
      <Link className="text-decoration-none" to={"/product/" + fav.product_id}>
        {fav.product.name}
      </Link>
      <span
        className="float-end ms-2"
        type="button"
        onClick={() => actions.delete_favourite(fav.id)}
      >
        <MdDelete />
      </span>
      <BasketIcon product={fav.product} />
    </li>
  );
};

FavouriteLI.propTypes = {};

export default FavouriteLI;
