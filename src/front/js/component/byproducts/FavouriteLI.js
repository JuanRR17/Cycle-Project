import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import BasketIcon from "../icons/BasketIcon";
import DeleteIcon from "../icons/DeleteIcon";

const FavouriteLI = ({ fav }) => {
  const { store, actions } = useContext(Context);
  // console.log("fav:", fav);
  return (
    <li className="dropdown-item list-group-item">
      <Link
        className="text-decoration-none pe-2 text-danger"
        to={"/product/" + fav.product_id}
      >
        {fav.product.name}
      </Link>
      <span className="float-end">
        <BasketIcon product={fav.product} />
        <DeleteIcon
          id={fav.id}
          handleRemove={(value) => actions.delete_favourite(value)}
        />
      </span>
    </li>
  );
};

FavouriteLI.propTypes = {
  fav: PropTypes.object,
};

export default FavouriteLI;
