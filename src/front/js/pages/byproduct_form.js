import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/home.css";
import PropTypes from "prop-types";

const ByProductForm = (props) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const url = useLocation();
  const id = url.pathname.split("/").slice(-1);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(0);
  const [unit, setUnit] = useState(0);
  const [stock, setStock] = useState("");

  const types = store.types;
  const units = store.units;
  let user_id;

  useEffect(() => {
    actions.syncTokenFromSessionStore();
    if (!sessionStorage.getItem("token") || !store.token) {
      actions.logout();
      navigate("/");
    } else if (store.data == undefined) {
      actions.getCurrentUserData();
    } else {
      user_id = store.data.id;
    }
    if (!isNaN(id)) {
      if (store.product == undefined || store.product.id != id) {
        actions.getProductData(id);
      }
    }
  });

  console.log("store.product:", store.product);
  useEffect(() => {
    if (!isNaN(id) && store.product != undefined) {
      setName(store.product.name);
      setLocation(store.product.location);
      setPrice(store.product.price);
      setDescription(store.product.description);
      setType(store.types.indexOf(store.product.type));
      setUnit(store.units.indexOf(store.product.unit));
      setStock(store.product.stock);
    }
  }, [store.product]);

  const handleConfirm = async () => {
    if (isNaN(id)) {
      if (
        await actions.new_product(
          user_id,
          name,
          stock,
          type,
          price,
          unit,
          location,
          description
        )
      )
        navigate("/profile");
    } else {
      if (
        await actions.edit_product(
          store.product.id,
          user_id,
          name,
          stock,
          store.types[type],
          price,
          store.units[unit],
          location,
          description
        )
      )
        navigate("/profile");
    }
  };

  const handleCancel = () => {
    actions.clearmessage();
    navigate("/profile");
  };

  return (
    <div className="mt-5">
      <div className="m-auto w-75 bg-warning p-3">
        <h1>
          {store.product ? "Edit " : "Add "}
          {/* Add/Edit  */}
          Byproduct
        </h1>
        <div className="container">
          <div className="row">
            {/* Name field */}
            <div className="mb-3 col col-lg-6">
              <label htmlFor="inputUser" className="form-label">
                Name*
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="inputUser"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            {/* Price field */}
            <div className="mb-3 col-md-6">
              <label htmlFor="inputPrice" className="form-label">
                Price*
              </label>
              <input
                required
                type="number"
                className="form-control"
                placeholder="€"
                id="inputPrice"
                value={price ?? 0}
                min="0"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            {/* Unit field */}
            <div className="mb-3 col-md-6">
              <label htmlFor="inputUnit" className="form-label">
                Units*
              </label>
              <select
                name="select"
                className="form-select"
                id="inputType"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                {units.map((u, idx) => {
                  return (
                    <option key={idx} value={idx}>
                      {u}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* Stock field */}
            <div className="mb-3 col-md-6">
              <label htmlFor="inputStock" className="form-label">
                Stock*
              </label>
              <input
                required
                type="number"
                className="form-control"
                placeholder={unit}
                id="inputStock"
                value={stock ?? 0}
                min="0"
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            {/* Type field */}
            <div className="mb-3 col-md-6">
              <label htmlFor="inputType" className="form-label">
                Type*
              </label>
              <select
                name="select"
                className="form-select"
                id="inputType"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {types.map((t, idx) => {
                  return (
                    <option key={idx} value={idx}>
                      {t}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* Description field */}
            <div className="mb-3 col-12">
              <label htmlFor="inputDescription" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                className="form-control"
                id="inputDescription"
                value={description ?? ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="row">
              {/* Image field */}
              <div className="mb-3 col-lg-6">
                <label htmlFor="inputImage" className="form-label">
                  Insert image
                </label>
                <input type="file" className="form-control" id="inputImage" />
              </div>
            </div>
          </div>
          {store.message ? <div>{store.message}</div> : null}
          <button onClick={handleConfirm} className="btn btn-success">
            Confirm
          </button>
          <button onClick={handleCancel} className="btn btn-danger">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

ByProductForm.propTypes = {};

export default ByProductForm;
