import React from "react";
import PropTypes from "prop-types";

const ProductCard = (props) => {
  const style = {
    width: "18rem",
  };
  return (
    <div className="card" style={style}>
      <div className="card-body">
        <div className="card-title d-flex justify-content-between">
          <span>Prod Name</span>
          <span>Organic</span>
        </div>
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-title d-flex justify-content-between">
          <span>Price</span>
          <span>Location</span>
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
