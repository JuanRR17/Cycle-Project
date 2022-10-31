import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import FavouriteIcon from "../icons/FavouriteIcon";
import BasketIcon from "../icons/BasketIcon";
import { IconContext } from "react-icons";
import thinkay from "../../../img/thinkay.jpg";
import { MdOutlineLocationOn } from "react-icons/md";
import { RiPinDistanceLine } from "react-icons/ri";
import { makeRequest } from "../../utils/utils";

const ProductCard = ({ details, origin }) => {
  const { store, actions } = useContext(Context);
  const [distance, setDistance] = useState();
  const navigate = useNavigate();

  const url = "/product/" + details.id;

  useEffect(() => {
    if (origin) {
      const url =
        process.env.BACKEND_URL +
        "/api/distance/" +
        origin +
        "/" +
        details.location;

      const calculateDistance = async (url) => {
        const data = await makeRequest(url);
        console.log("data2", data);

        setDistance(data);
      };
      calculateDistance(url);
    }
  }, [origin]);

  const handleClick = () => {
    navigate(url);
  };

  return (
    <div className="product-card card p-1 text-dark bg-gradient border border-success border-3">
      <div className="card-body">
        <div className="card-title d-flex justify-content-between">
          <span className="fw-bolder">{details.name}</span>
          <span>{details.type}</span>
        </div>
        <img
          src={thinkay}
          className="card-img-top img-thumbnail shadow my-2"
          alt={details.name}
        />
        <div className="card-title d-flex justify-content-between">
          <span>
            <MdOutlineLocationOn />
            {details.location}
          </span>
          {store.token ? (
            <span>
              {details.price} €/{details.unit}
            </span>
          ) : (
            ""
          )}
        </div>
        {origin && (
          <div>
            <RiPinDistanceLine /> {distance} km
          </div>
        )}
        <div className="container">
          <div className="row">
            <div className="col">
              {details.stock > 0 ? (
                ""
              ) : (
                <span className="text-error "> Out of Stock</span>
              )}
            </div>
            <div className="col">
              {" "}
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-success btn-custom"
              >
                Details
              </button>
            </div>
            <div className="col">
              <IconContext.Provider
                value={{ className: "shared-class", size: 30 }}
              >
                <span className="d-flex justify-content-between">
                  <FavouriteIcon product={details} />
                  <BasketIcon product={details} />
                </span>
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = { details: PropTypes.object };

export default ProductCard;
