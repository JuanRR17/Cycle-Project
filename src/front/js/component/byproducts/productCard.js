import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import FavouriteIcon from "./favouriteIcon";
import BasketIcon from "./basketIcon";

const ProductCard = ({ details }) => {
  const navigate = useNavigate();

  const url = "/product/" + details.id;

  const handleClick = () => {
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
        <FavouriteIcon product={details} />
        <BasketIcon product={details} />
      </div>
    </div>
  );
};

ProductCard.propTypes = {};

export default ProductCard;
