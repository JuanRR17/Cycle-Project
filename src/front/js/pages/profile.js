import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import UserDataForm from "../component/user_profile/UserDataForm";
import UserInfo from "../component/user_profile/UserInfo";
import UserProductsTable from "../component/user_profile/UserProductsTable";
import PropTypes from "prop-types";

const Profile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const handleEditProfile = () => {
    setEdit(true);
  };

  useEffect(() => {
    if (sessionStorage.getItem("token") == undefined) {
      navigate("/");
      actions.logout();
    }
    if (store.data == undefined) actions.getUserData();
  });

  return (
    <div className="mt-5">
      <h1>User Profile</h1>
      <div className="m-auto w-75 bg-warning p-3">
        {edit ? (
          <div>
            <UserDataForm handleSetEdit={(value) => setEdit(value)} />
          </div>
        ) : (
          <>
            <button onClick={handleEditProfile} className="btn btn-primary">
              Edit Profile
            </button>
            <UserInfo data={store.data} />
          </>
        )}
      </div>
      <div>
        <button onClick={() => actions.logout()} className="btn btn-danger">
          Log out
        </button>
      </div>
      <UserProductsTable />
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
