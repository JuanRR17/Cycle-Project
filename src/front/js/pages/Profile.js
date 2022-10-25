import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import UserInfo from "../component/user_profile/UserInfo";
import UserProductsTable from "../component/user_profile/UserProductsTable";
import PropTypes from "prop-types";
import MyOrdersTable from "../component/user_profile/MyOrdersTable";
import SoldOrdersTable from "../component/user_profile/SoldOrdersTable";
import { IconContext } from "react-icons";
import { FaUserSlash } from "react-icons/fa";
import UserForm from "../component/user_profile/UserForm";

const Profile = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const token = useMemo(() => store.token, [store.token]);
  const data = useMemo(() => {
    console.log("data use memo", store.data);
    store.data;
  }, [store.data?.id]);
  // const orders_made = useMemo(() => {
  //   console.log("orders use memo", store.orders_made);
  //   store.orders_made;
  // }, [store.orders_made]);
  // const orders_made = useRef(store.orders_made);

  const handleEditProfile = () => {
    setEdit(true);
  };
  console.log("profile store", store);
  useEffect(() => {
    actions.syncTokenFromSessionStore();
    console.log("useEffect token", token);

    if (!sessionStorage.getItem("token")) {
      // if (!store.data && store.token) {
      actions.logout();
      navigate("/");
    }
    console.log("store.data:", data);
    // console.log("orders_made:", orders_made);
    if (!data) {
      actions.getCurrentUserData();
    }
    // if (!orders_made && data) {
    //   console.log("orders_made");
    //   actions.getMadeOrders(data.id);
    // }
  }, [
    token,
    data,
    // , orders_made
  ]);

  return (
    <div className="mt-5 container">
      <div className="row bg-custom p-5 justify-content-center">
        {edit ? (
          <UserForm edit={true} handleSetEdit={(value) => setEdit(value)} />
        ) : (
          <UserInfo data={store.data} handleEdit={handleEditProfile} />
        )}

        <div className="accordion p-0" id="accordionPanelsStayOpenExample">
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
                <UserProductsTable products={store.data?.products} />
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
                <MyOrdersTable
                // orders={store.orders_made}
                />
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
        <div className="text-center pt-3">
          {/* Button trigger modal */}

          <button
            type="button"
            className="btn btn-danger btn-custom"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <IconContext.Provider value={{ className: "", size: 35 }}>
              <FaUserSlash />
            </IconContext.Provider>
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
                <div className="modal-header justify-content-center">
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
                <div className="modal-footer justify-content-center">
                  <button
                    type="button"
                    className="btn btn-danger btn-custom"
                    data-bs-dismiss="modal"
                    onClick={() => actions.delete_profile(store.data.id)}
                  >
                    Yes, Remove my Profile
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-custom"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
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
