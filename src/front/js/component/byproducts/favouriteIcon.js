import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const FavouriteIcon = ({ product }) => {
  const { store, actions } = useContext(Context);

  console.log("store.favourites:", store.favourites);

  const favs_prod_ids = store.favourites.map((f) => {
    return f.product_id;
  });

  const handleItemInFavourites = (elem) => {
    if (!favs_prod_ids.includes(elem.id)) {
      actions.add_favourite(elem.user_id, elem.id);
    } else {
      const getFav = store.favourites.filter((f) => {
        return f.product_id == elem.id;
      });
      console.log("getFav:", getFav);
      actions.delete_favourite(getFav[0].id);
    }
  };

  return (
    <button
      type="button"
      onClick={() => handleItemInFavourites(product)}
      className="float-end btn btn-outline-warning"
    >
      {favs_prod_ids.includes(product.id) ? (
        <AiFillHeart />
      ) : (
        <AiOutlineHeart />
      )}
    </button>
  );
};

FavouriteIcon.propTypes = {};

export default FavouriteIcon;
