import React from "react";
import PropTypes from "prop-types";

const ProductCard = ({ details }) => {
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
        <a href="#" className="btn btn-primary">
          Details
        </a>
      </div>
    </div>
  );
};

ProductCard.propTypes = {};

export default ProductCard;
