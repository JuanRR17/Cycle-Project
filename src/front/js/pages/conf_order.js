import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ItemsTable from "../component/orders/itemsTable";
import DeliveryForm from "../component/orders/delivery_form";

const ConfirmOrder = (props) => {
  const { store, actions } = useContext(Context);
  const [total, setTotal] = useState(0);
  const [delivery, setDelivery] = useState({});
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    //Check token
    actions.syncTokenFromSessionStore();
    if (!sessionStorage.getItem("token") || !store.token) {
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

  const handleConfirm = () => {
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
      // console.log(`${field}: ${delivery[field]}`);
    }
    if (errorsFirstCheck) {
      console.log("errorsFirstCheck:", errorsFirstCheck);
      setErrors(errorsFirstCheck);
    } else {
      actions.create_order(delivery, total, store.data.id);
    }
  };

  console.log("errors:", errors);

  return (
    <div>
      <div>Confirm Order</div>
      <div className="accordion" id="accordionExample">
        {/* ITEMS TABLE */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Items table
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <ItemsTable total={total} />
            </div>
          </div>
        </div>
        {/* DELIVERY ADDRESS */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Delivery address
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <DeliveryForm
                delivery={delivery}
                errors={errors}
                handleSetDelivery={(value) => setDelivery(value)}
              />
            </div>
          </div>
        </div>
        {/* PAYMENT */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Payment
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="text-center"> Total: {total} €</div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-success" onClick={handleConfirm}>
        Confirm
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="btn btn-danger"
      >
        Cancel
      </button>
      {errors?.total && store.basket.length === 0 ? (
        <div>{errors?.total}</div>
      ) : (
        ""
      )}
    </div>
  );
};

ConfirmOrder.propTypes = {};

export default ConfirmOrder;
