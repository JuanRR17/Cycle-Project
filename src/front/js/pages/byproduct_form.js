import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import PropTypes from "prop-types";

const ByProductForm = ({ handleSetEdit }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  // const handleConfirm = () => {
  const handleConfirm = async () => {
    if (
      await actions.editprofile(name, email, company, phone, location, password)
    )
      handleSetEdit(false);
  };

  const handleCancel = () => {
    actions.clearmessage();
    handleSetEdit(false);
  };

  useEffect(() => {
    if (store.data != undefined) {
      setName(store.data.name);
      setLocation(store.data.location);
      setPrice(store.data.price);
      setDescription(store.data.description ? store.data.description : "");
      setType(store.data.type);
    }
  }, [store.data]);

  return (
    <div className="mt-5">
      <div className="m-auto w-75 bg-warning p-3">
        <h1>Add/Edit Byproduct</h1>
        {store.data ? (
          <div className="container">
            <div className="row">
              {/* Name field */}
              <div className="mb-3 col col-lg-6">
                <label htmlFor="inputUser" className="form-label">
                  Name
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
                  Location
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="inputLocation"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              {/* Price field */}
              <div className="mb-3 col-md-6">
                <label htmlFor="inputPrice" className="form-label">
                  Price
                </label>
                <input
                  required
                  type="number"
                  className="form-control"
                  placeholder="€"
                  id="inputPrice"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="inputType" className="form-label">
                  Type
                </label>
                <select
                  name="select"
                  className="form-select"
                  id="inputType"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="value1">Value 1</option>
                  <option value="value2" selected>
                    Value 2
                  </option>
                  <option value="value3">Value 3</option>
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
                  value={description}
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
        ) : (
          <div>Loading your data...</div>
        )}
      </div>
    </div>
  );
};

ByProductForm.propTypes = {};

export default ByProductForm;