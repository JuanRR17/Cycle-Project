import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";

const FavouriteLI = ({ fav }) => {
  const { store, actions } = useContext(Context);
  let product;
  useEffect(() => {
    if (store.user_products == undefined) {
      actions.getUserProducts();
    } else {
      product = store.user_products.filter((up) => {
        return up.id == fav.product_id;
      })[0];
    }
  }, [store.user_products]);
  console.log("store.user_products :", store.user_products);

  //   const product = store.user_products.filter((up) => {
  //     return up.id == fav.product_id;
  //   })[0];

  return (
    <li className="dropdown-item ">
      <Link className="text-decoration-none" to={"/product/" + fav.product_id}>
        {product ? product.name : null}
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
