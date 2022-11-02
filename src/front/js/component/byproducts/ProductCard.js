import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import FavouriteIcon from "../icons/FavouriteIcon";
import BasketIcon from "../icons/BasketIcon";
import { IconContext } from "react-icons";
import thinkay from "../../../img/thinkay.jpg";
import { MdOutlineLocationOn } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { FaEuroSign, FaRecycle } from "react-icons/fa";

const ProductCard = ({ details, origin }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const url = "/product/" + details.id;

  const handleClick = () => {
    navigate(url);
  };

  return (
    <div className="container product-card p-3 text-dark bg-gradient border border-success border-3">
      <div className="d-flex mb-1 justify-content-between">
        <span className="fw-bolder" type="button" onClick={handleClick}>
          {details.name}
        </span>
        <span>
          {" "}
          <IconContext.Provider value={{ className: "shared-class", size: 25 }}>
            <span className="d-flex justify-content-between gap-1">
              <BasketIcon product={details} />
              <FavouriteIcon product={details} />
            </span>
          </IconContext.Provider>
        </span>
      </div>
      <IconContext.Provider value={{ className: "me-1", size: 15 }}>
        <div className="d-flex mb-1 justify-content-between gap-3">
          {/* <div className=" mb-1"> */}
          <div>
            <MdOutlineLocationOn />
            {details.location}
          </div>
          {origin && (
            <>
              {details.distance !== undefined ? (
                <div>
                  <GiPathDistance />
                  {details.distance} km
                </div>
              ) : (
                <div
                  className="spinner-border spinner-border-sm text-success"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </>
          )}
        </div>

        <div className="row">
          <div className="col">
            {" "}
            <img
              src={thinkay}
              className="card-img-top img-thumbnail shadow"
              alt={details.name}
              type="button"
              onClick={handleClick}
            />
          </div>
          <div className="col-7">
            {store.token ? (
              <div>
                <FaEuroSign />
                {details.price} €/{details.unit}
              </div>
            ) : (
              ""
            )}

            <div>
              <FaRecycle />
              {details.type}
            </div>

            <div>
              {details.stock > 0 ? (
                ""
              ) : (
                <span className="text-error "> Out of Stock</span>
              )}
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
};

ProductCard.propTypes = { details: PropTypes.object };

export default ProductCard;
