import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const FavouriteIcon = ({ product, url }) => {
  const { store, actions } = useContext(Context);
  const handleItemInFavourites = (elem) => {
    if (!store.favourites.includes(elem)) {
      actions.add_favourite(elem);
    } else {
      actions.delete_favourite(elem.id);
    }
  };
  console.log("favourites:", store.favourites);
  console.log("product:", product);
  return (
    <button
      type="button"
      onClick={() => handleItemInFavourites(product)}
      className="float-end btn btn-outline-warning"
    >
      {store.favourites.includes(product) ? (
        <AiFillHeart />
      ) : (
        <AiOutlineHeart />
      )}
    </button>
  );
};

FavouriteIcon.propTypes = {};

export default FavouriteIcon;
