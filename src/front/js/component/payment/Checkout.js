import React, { useState } from "react";
import PropTypes from "prop-types";

const Checkout = (props) => {
  const [checkout, setCheckout] = useState(false);
  return (
    <>
      {checkout ? (
        <Paypal />
      ) : (
        <button
          onClick={() => {
            setCheckout(true);
          }}
        >
          Checkout
        </button>
      )}
    </>
  );
};

Checkout.propTypes = {};

export default Checkout;
