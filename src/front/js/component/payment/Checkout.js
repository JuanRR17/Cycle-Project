import React, { useState } from "react";
import PropTypes from "prop-types";
import PayPal from "./PayPal";

const Checkout = ({ ready }) => {
  console.log("ready:", ready);
  const [checkout, setCheckout] = useState(false);
  return (
    <>
      {checkout ? (
        <PayPal />
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
