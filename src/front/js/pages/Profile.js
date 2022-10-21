import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";
import UserDataForm from "../component/user_profile/UserDataForm";
import UserInfo from "../component/user_profile/UserInfo";
import UserProductsTable from "../component/user_profile/UserProductsTable";
import PropTypes from "prop-types";
import MyOrdersTable from "../component/user_profile/MyOrdersTable";
import SoldOrdersTable from "../component/user_profile/SoldOrdersTable";
import { IconContext } from "react-icons";
import { BsJournalPlus } from "react-icons/bs";

const Profile = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const handleEditProfile = () => {
    setEdit(true);
  };

  useEffect(() => {
    actions.syncTokenFromSessionStore();

    if (!sessionStorage.getItem("token") || !store.token) {
      // if (!store.data && store.token) {
      actions.logout();
      navigate("/");
    }
    if (!store.data) {
      actions.getCurrentUserData();
    }
  });

  return (
    <div className="mt-5 container">
      <h1 className="text-center">User Profile</h1>
      <div className="m-auto w-75 bg-warning p-3">
        {edit ? (
          <div>
            <UserDataForm handleSetEdit={(value) => setEdit(value)} />
          </div>
        ) : (
          <>
            <UserInfo data={store.data} />
            <button onClick={handleEditProfile} className="btn btn-primary">
              Edit Profile
            </button>
          </>
        )}
      </div>
      {/* <div>
        <button onClick={() => actions.logout()} className="btn btn-danger">
          Log out
        </button>
      </div> */}
      <button type="button" className="btn btn-success">
        <Link to="/byproduct_form" className="text-decoration-none text-light">
          <IconContext.Provider value={{ className: "", size: 35 }}>
            <BsJournalPlus />
          </IconContext.Provider>
        </Link>
      </button>
      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              My By-Products
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">
              <UserProductsTable />
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTwo"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseTwo"
            >
              My Made Orders
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingTwo"
          >
            <div className="accordion-body">
              <MyOrdersTable />
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseThree"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseThree"
            >
              My Sold Orders
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingThree"
          >
            <div className="accordion-body">
              <SoldOrdersTable />
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Delete Profile
        </button>

        {/* <Modal> */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Delete Profile
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete your Profile?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => actions.delete_profile(store.data.id)}
                >
                  Yes, Remove my Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {};

export default Profile;
