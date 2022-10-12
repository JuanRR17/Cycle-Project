import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";

const FavouriteLI = ({ fav }) => {
  const { store, actions } = useContext(Context);
  const [product, setProduct] = useState();

  useEffect(() => {
    if (store.data == undefined) {
      actions.getCurrentUserData();
    } else {
      if (store.user_products == undefined) {
        actions.getUserProducts(store.data.id);
      } else {
        setProduct(
          store.user_products.filter((up) => {
            return up.id == fav.product_id;
          })[0]
        );
      }
    }
  });

  return (
    <li className="dropdown-item ">
      <Link className="text-decoration-none" to={"/product/" + fav.product_id}>
        {product ? product.name : fav.product_id}
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
