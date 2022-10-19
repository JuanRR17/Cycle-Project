import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import FavouriteIcon from "../icons/favouriteIcon";
import BasketIcon from "../icons/basketIcon";
import { IconContext } from "react-icons";

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
        <img className="card-img-top" alt={details.name} />
        <div className="card-title d-flex justify-content-between">
          <span>{details.price}</span>
          <span>{details.location}</span>
        </div>
        <button type="button" onClick={handleClick} className="btn btn-primary">
          Details
        </button>
        <IconContext.Provider value={{ className: "shared-class", size: 25 }}>
          <>
            <FavouriteIcon product={details} />
            <BasketIcon product={details} />
          </>
        </IconContext.Provider>
      </div>
    </div>
  );
};

ProductCard.propTypes = { details: PropTypes.object };

export default ProductCard;
