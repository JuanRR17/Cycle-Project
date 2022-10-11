import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import FavouriteIcon from "./favouriteIcon";

const ProductCard = ({ details }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const url = "/product/" + details.id;

  const handleClick = () => {
    actions.getProductData(details.id);
    navigate(url);
  };

  const style = {
    width: "18rem",
  };
  return (
    <div className="card p-1 m-1" style={style}>
      <div className="card-body">
        <div className="card-title d-flex justify-content-between">
          <span>{details.name}</span>
          <span>{details.type}</span>
        </div>
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-title d-flex justify-content-between">
          <span>{details.price}</span>
          <span>{details.location}</span>
        </div>
        <button type="button" onClick={handleClick} className="btn btn-primary">
          Details
        </button>
        <FavouriteIcon product={details} url={url} />
      </div>
    </div>
  );
};

ProductCard.propTypes = {};

export default ProductCard;
