import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";

const FavouriteLI = ({ fav }) => {
  const { store, actions } = useContext(Context);

  useEffect(() => {}, [fav]);

  return (
    <li className="dropdown-item ">
      <Link className="text-decoration-none" to={"/product/" + fav.product_id}>
        {fav.product_id}
      </Link>
      <span
        className="float-end ms-2"
        type="button"
        onClick={() => actions.delete_favourite(fav.id)}
      >
        <MdDelete />
      </span>
    </li>
  );
};

FavouriteLI.propTypes = {};

export default FavouriteLI;
