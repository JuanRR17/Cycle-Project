import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";

const Quantity = ({ quantity, handleSetQuantity }) => {
  const { store, actions } = useContext(Context);

  const handleChange = (e) => {
    if (e.target.value > store.product.stock) {
      handleSetQuantity(store.product.stock);
    } else if (e.target.value < 0) {
      handleSetQuantity(0);
    } else {
      handleSetQuantity(e.target.value);
    }
  };
  return (
    <div>
      Quantiy:
      <div
        className="btn-group "
        role="group"
        aria-label="Basic mixed styles example"
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            if (quantity < store.product.stock) handleSetQuantity(quantity + 1);
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
          max={store.product.stock}
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
    </div>
  );
};

Quantity.propTypes = {};

export default Quantity;
