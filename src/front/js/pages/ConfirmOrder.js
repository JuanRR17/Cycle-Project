import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ItemsTable from "../component/orders/ItemsTable";
import DeliveryForm from "../component/orders/DeliveryForm";
import Checkout from "../component/payment/Checkout";

const ConfirmOrder = (props) => {
  const { store, actions } = useContext(Context);
  const [total, setTotal] = useState(0);
  const [delivery, setDelivery] = useState({});
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    //Check token
    actions.syncTokenFromSessionStore();
    if (!sessionStorage.getItem("token") && !store.token) {
      // if (!store.data || !store.token) {
      actions.logout();
      navigate("/");
    }
    //Get user data
    if (!store.data) {
      actions.getCurrentUserData();
    }
    //Calculate Order Total
    let new_total = 0;
    store.basket.forEach((item) => {
      if (item.quantity === 0) {
        actions.delete_from_basket(item.id);
      } else {
        new_total += item.subtotal;
        setTotal(new_total);
      }
    });
    if (store.basket.length === 0) {
      setTotal(0);
    } else {
      if (!store.user) {
        const items_user = store.basket.map((item) => {
          return item.product.user_id;
        })[0];
        actions.getUserData(items_user);
      }
    }
  });

  useEffect(() => {
    if (store.data) {
      setDelivery({
        address: store.data.address,
        location: store.data.location,
        cp: store.data.cp,
        province: store.data.province,
        country: store.data.country,
        phone: store.data.phone,
        company: store.data.company,
      });
    }
  }, [store.data]);

  const handleConfirm = async () => {
    let errorsFirstCheck;
    if (total === 0) {
      errorsFirstCheck = {
        ...errorsFirstCheck,
        total: "There are no items to order!",
      };
    }
    for (const field in delivery) {
      if (!delivery[field] && field !== "company") {
        errorsFirstCheck = {
          ...errorsFirstCheck,
          [field]: "Please enter a " + field.toUpperCase(),
        };
      }
    }
    if (errorsFirstCheck) {
      setErrors(errorsFirstCheck);
    } else {
      await actions.create_order(delivery, total, store.data.id);
      await actions.getMadeOrders(store.data.id);
      navigate("/profile");
    }
  };
  return (
    <div className="m-3 bg-custom px-5 py-4">
      <h1 className=" text-center mb-4">Confirm Order</h1>
      <div className="accordion" id="accordion">
        {/* ITEMS TABLE */}
        <div className="panel-heading">
          <h2 className="panel-title" id="panelsStayOpen-headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              Items table
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="panel-body  table-responsive">
              <ItemsTable total={total} />
            </div>
          </div>
        </div>
        {/* DELIVERY ADDRESS */}
        <div className="panel-heading">
          <h2 className="panel-title" id="panelsStayOpen-headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTwo"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseTwo"
            >
              Delivery address
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingTwo"
          >
            <div className="panel-body">
              <DeliveryForm
                delivery={delivery}
                errors={errors}
                handleSetDelivery={(value) => setDelivery(value)}
              />
            </div>
          </div>
        </div>
        {/* PAYMENT */}
        <div className="panel-heading">
          <h2 className="panel-title" id="panelsStayOpen-headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseThree"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseThree"
            >
              Payment
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingThree"
          >
            <div className="panel-body">
              <div className="text-center">
                Total: {(Math.round(total * 100) / 100).toFixed(2)} €
              </div>
              <div>
                <Checkout />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-error">
        {errors?.total && store.basket.length === 0 ? errors.total : ""}
        {errors && !errors.total
          ? "Please enter mandatory address details"
          : ""}
      </div>
      <div className="py-2 d-flex gap-2">
        <button className="btn btn-success btn-custom" onClick={handleConfirm}>
          Confirm
        </button>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="btn btn-danger btn-custom"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

ConfirmOrder.propTypes = {};

export default ConfirmOrder;
