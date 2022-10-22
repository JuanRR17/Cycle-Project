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
    actions.syncTokenFromSessionStore();
    if (!sessionStorage.getItem("token") || !store.token) {
      actions.logout();
      navigate("/");
    }
    if (!store.data) {
      actions.getCurrentUserData();
    }
  });

  return (
    <div className="container mt-5 ">
      {/* <h1 className="bg-light">User Profile</h1> */}
      <div className="row d-flex justify-content-center bg-dark bg-opacity-75">
        <div className="col-5">
          <div className="" style={{width: "12rem"}}>
            <img src="https://media.glassdoor.com/sqll/1818874/4geeks-academy-squarelogo-1507911028237.png" className="card-img-top" alt="..."/>
          </div>
          <div className="">
          <UserProductsTable />
          </div>
      <div className="d-flex aligns-items-center"> 
      
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Delete Profile
        </button>
        <div>
        <button onClick={() => actions.logout()} className="btn btn-danger">
          Log out
        </button>
        </div>
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
    
      <div className="col-7 bg-warning p-3 bg-opacity-50">
        {edit ? (
            <UserDataForm handleSetEdit={(value) => setEdit(value)} />
        ) : (
          <>
            <button onClick={handleEditProfile} className="btn btn-primary">
              Edit Profile
            </button>
            <UserInfo data={store.data} />
          </>
        )}
      </div>
      </div>
    </div>
  );
};

Profile.propTypes = {};

export default Profile;
