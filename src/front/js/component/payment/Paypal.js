import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import PropTypes from "prop-types";

const Paypal = ({ total }) => {
  const client = {
    sandbox:
      "AbcRtVOKupxw7Gdh8EW0eyU2fw2TV6ZUg8hp_R36BllKe-UcQKkIGPQrDqXdGWqqpkOh6TTjos5yGNI1",
  };
  return (
    <PaypalExpressBtn
      //   env={env}
      client={client}
      currency={"EUR"}
      total={total}
      //   onError={onError}
      //   onSuccess={onSuccess}
      //   onCancel={onCancel}
    />
  );
};

Paypal.propTypes = {};

export default Paypal;
