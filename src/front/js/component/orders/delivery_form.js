import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const DeliveryForm = (props) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const url = useLocation();
  const id = url.pathname.split("/").slice(-1);

  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [province, setProvince] = useState("");
  const [cp, setCp] = useState("");
  const [country, setCountry] = useState("");

  let user_id;

  useEffect(() => {
    actions.syncTokenFromSessionStore();
    if (!sessionStorage.getItem("token") || !store.token) {
      actions.logout();
      navigate("/");
    } else if (!store.data) {
      actions.getCurrentUserData();
    } else {
      user_id = store.data.id;
    }
    if (!isNaN(id)) {
      if (!store.product || store.product.id != id) {
        actions.getProductData(id);
      }
    }
  });

  useEffect(() => {
    if (!isNaN(id) && store.product) {
      setAddress(store.product.address);
      setLocation(store.product.location);
      setCp(store.product.cp);
      setProvince(store.product.province);
      setCountry(store.product.country);
    }
  }, [store.product]);

  return (
    <div className="mt-5">
      <div className="m-auto w-75 bg-warning p-3">
        <div className="container">
          <div className="row">
            {/* Address field */}
            <div className="mb-3 col col-lg-6">
              <label htmlFor="inputAddress" className="form-label">
                Address*
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="inputAddress"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            {/* Location field */}
            <div className="mb-3 col-md-6">
              <label htmlFor="inputLocation" className="form-label">
                Location*
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="inputLocation"
                value={location ?? ""}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            {/* CP field */}
            <div className="mb-3 col-md-6">
              <label htmlFor="inputCp" className="form-label">
                CP*
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="inputCp"
                value={cp ?? 0}
                min="0"
                onChange={(e) => setCp(e.target.value)}
              />
            </div>
            {/* Province field */}
            <div className="mb-3 col col-lg-6">
              <label htmlFor="inputProvince" className="form-label">
                Province*
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="inputProvince"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>
            {/* Country field */}
            <div className="mb-3 col col-lg-6">
              <label htmlFor="inputCountry" className="form-label">
                Country*
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="inputCountry"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DeliveryForm.propTypes = {};

export default DeliveryForm;
