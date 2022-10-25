import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/home.css";
import PropTypes from "prop-types";

const EditUserDataForm = ({ handleSetEdit }) => {
  const { store, actions } = useContext(Context);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");

  const id = store.data.id;
  const data = useRef(store.data);

  const handleConfirm = async () => {
    if (
      await actions.editprofile(
        id,
        username,
        email,
        company,
        phone,
        location,
        password
      )
    )
      handleSetEdit(false);
  };

  const handleCancel = () => {
    actions.clearmessage();
    handleSetEdit(false);
  };

  useEffect(() => {
    console.log("UserDataForm:", data);
    if (store.data) {
      setUsername(data.current.username);
      setEmail(data.current.email);
      setCompany(data.current.company ? data.current.company : "");
      setPhone(data.current.phone ? data.current.phone : "");
      setLocation(data.current.location ? data.current.location : "");
      setPassword(data.current.password ? data.current.password : "");
    }
  }, [data.current]);

  return (
    <>
      {data.current ? (
        <div className="container p-3">
          <div className="row">
            {/* username field */}
            <div className="mb-3 col col-lg-6">
              <label htmlFor="inputUser">Username</label>
              <input
                required
                type="text"
                className="form-control"
                id="inputUser"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* email field */}
            <div className="mb-3 col-md-6">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                required
                type="email"
                className="form-control"
                id="inputEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Company field */}
            <div className="mb-3 col-md-6">
              <label htmlFor="inputCompany" className="form-label">
                Company
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCompany"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            {/* Phone field */}
            <div className="mb-3 col-md-6">
              <label htmlFor="inputPhone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPhone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {/* Location field */}
            <div className="mb-3 col-md-6">
              <label htmlFor="inputLocation" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLocation"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            {/* <div className="row"> */}
            {/* password field */}
            <div className="mb-3 col-lg-6">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                required
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="You can change your password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* </div> */}
          </div>
          {store.message ? <div>{store.message}</div> : null}
          <button
            onClick={handleConfirm}
            className="btn btn-success  btn-custom"
          >
            Confirm
          </button>
          <button onClick={handleCancel} className="btn btn-danger btn-custom">
            Cancel
          </button>
        </div>
      ) : (
        <div>Loading your data...</div>
      )}
    </>
  );
};

EditUserDataForm.propTypes = {
  handleSetEdit: PropTypes.func,
};

export default EditUserDataForm;