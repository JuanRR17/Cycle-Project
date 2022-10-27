import React from "react";
import PropTypes from "prop-types";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import { IconContext } from "react-icons";

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
      {stock === 0 ? (
        <div className="text-error">Out of Stock</div>
      ) : (
        <div
          className="btn-group "
          role="group"
          aria-label="Basic mixed styles example"
        >
          <IconContext.Provider
            value={{ className: "text-light py-1", size: 30 }}
          >
            <MdAddCircle
              type="button"
              onClick={() => {
                if (quantity < stock) handleSetQuantity(quantity + 1);
              }}
            />
            <input
              value={quantity}
              onChange={handleChange}
              type="text"
              className="btn border p-0 mx-0 rounded-3 text-light fw-bolder"
              id="btncheck2"
              size={quantity.toString().length}
              placeholder="0"
              max={stock}
              min="0"
            />
            <MdRemoveCircle
              type="button"
              className="text-secondary"
              onClick={() => {
                if (quantity > 0) handleSetQuantity(quantity - 1);
              }}
            />
          </IconContext.Provider>
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
