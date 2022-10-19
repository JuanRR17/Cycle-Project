import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import BasketLI from "./basketLI";
import { BsCart, BsFillCartFill } from "react-icons/bs";

const Basket = () => {
  const { store, actions } = useContext(Context);

  const ulStyle = {
    width: "max-content",
  };

  useEffect(() => {
    if (!store.basket) actions.getCurrentUserData();
  }, []);

  return (
    <>
      {store.token ? (
        <div className="dropdown">
          <button
            className="btn btn-success dropdown-toggle p-1 m-1"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
          >
            <span className="pe-1">
              {store.basket.length === 0 ? <BsCart /> : <BsFillCartFill />}
            </span>

            <span className="badge">{store.basket.length}</span>
            <span className=""></span>
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuLink"
            style={ulStyle}
          >
            {store.basket.length > 0 ? (
              <>
                <li className="text-center">
                  <Link to="/confirm_order" className="text-decoration-none">
                    Go To Basket
                  </Link>
                </li>
                {store.basket.map((item) => {
                  return <BasketLI key={item.id} item={item} />;
                })}
              </>
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
