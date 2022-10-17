import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import { BsBasket2, BsBasket2Fill } from "react-icons/bs";

const BasketIcon = ({ product }) => {
  const { store, actions } = useContext(Context);

  const basket_prod_ids = store.basket.map((b) => {
    return b.product_id;
  });

  const handleItemInBasket = (elem) => {
    if (!basket_prod_ids.includes(elem.id)) {
      actions.add_to_basket(store.data.id, elem.id);
    } else {
      const getBasketProd = store.basket.filter((b) => {
        return b.product_id == elem.id;
      });
      actions.delete_from_basket(getBasketProd[0].id);
    }
  };

  return (
    <>
      {store.token && product.user_id !== store.data.id ? (
        <span
          type="button"
          onClick={() => handleItemInBasket(product)}
          className="float-end text-danger"
        >
          {basket_prod_ids.includes(product.id) ? (
            <BsBasket2Fill />
          ) : (
            <BsBasket2 />
          )}
        </span>
      ) : null}
    </>
  );
};

BasketIcon.propTypes = {};

export default BasketIcon;
