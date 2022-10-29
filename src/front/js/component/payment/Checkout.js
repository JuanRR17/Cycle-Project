import React, { useState } from "react";
import PropTypes from "prop-types";
import PayPal from "./PayPal";

const Checkout = (props) => {
  const [checkout, setCheckout] = useState(false);
  return (
    <div>
      Hola2
      {/* {checkout ? (
        <PayPal />
      ) : (
        <button
          onClick={() => {
            setCheckout(true);
          }}
        >
          Checkout
        </button>
      )} */}
    </div>
  );
};

Checkout.propTypes = {};

export default Checkout;
