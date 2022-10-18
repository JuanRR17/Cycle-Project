import React from "react";
import PropTypes from "prop-types";

const Quantity = ({ quantity, stock, handleSetQuantity }) => {
  const handleChange = (e) => {
    if (e.target.value && !isNaN(e.target.value)) {
      if (e.target.value > stock) {
        handleSetQuantity(stock);
      } else if (e.target.value < 0) {
        handleSetQuantity(1);
      } else {
        handleSetQuantity(+e.target.value);
      }
    } else {
      handleSetQuantity(1);
    }
  };
  return (
    <>
      {stock == 0 ? (
        <div className="text-danger">Out of Stock</div>
      ) : (
        <div
          className="btn-group "
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (quantity < stock) handleSetQuantity(quantity + 1);
            }}
          >
            +
          </button>
          <input
            value={quantity}
            onChange={handleChange}
            type="text"
            className="btn border"
            id="btncheck2"
            // autoComplete="off"
            placeholder="0"
            max={stock}
            min="0"
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (quantity > 0) handleSetQuantity(quantity - 1);
            }}
          >
            -
          </button>
        </div>
      )}
    </>
  );
};

Quantity.propTypes = {
  quantity: PropTypes.number,
  stock: PropTypes.number,
  handleSetQuantity: PropTypes.func,
};

export default Quantity;
