import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PayPal = ({ total, delivery }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const createOrder = async () => {
    await actions.create_order(delivery, total, store.data.id);
    await actions.getMadeOrders(store.data.id);
    navigate("/profile");
  };

  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Purchse in Thinkay",
                amount: {
                  currency_code: "EUR",
                  value: total,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          createOrder();
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

PayPal.propTypes = {};

export default PayPal;
