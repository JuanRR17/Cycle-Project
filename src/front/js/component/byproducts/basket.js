import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import BasketLI from "./basketLI";

const Basket = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const ulStyle = {
    width: "max-content",
  };

  useEffect(() => {
    actions.getCurrentUserData();
  }, []);

  const handleBuy = () => {
    navigate("/confirm_order");
  };

  return (
    <>
      {store.token ? (
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
          >
            <Link
              to="/confirm_order"
              className="text-light text-decoration-none"
            >
              Basket
            </Link>
            <span className="badge bg-secondary">{store.basket.length}</span>
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuLink"
            style={ulStyle}
          >
            {store.basket.length > 0 ? (
              store.basket.map((item) => {
                return <BasketLI key={item.id} item={item} />;
              })
            ) : (
              <li className="text-center">(empty)</li>
            )}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default Basket;
