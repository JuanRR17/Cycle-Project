import React from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { BsJournalPlus } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserInfo = ({ data, handleEdit }) => {
  return (
    <div className="d-flex justify-content-center px-0">
      <div className="col-md-12">
        <div className="card user-card-full">
          <div className="row mx-0">
            <div className="col-sm-4 bg-c-lite-green">
              <div className=" py-4 text-center text-white">
                <div className="mb-2">
                  <img
                    src="https://img.icons8.com/bubbles/100/000000/user.png"
                    className="img-radius"
                    alt="User-Profile-Image"
                  />
                </div>
                <h4 className="m-3 fw-bolder">{data?.username}</h4>
                <IconContext.Provider value={{ className: "p-1", size: 30 }}>
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    <button
                      onClick={handleEdit}
                      className="btn btn-primary btn-custom"
                    >
                      <FaUserEdit />
                    </button>
                    <button
                      type="button"
                      className="btn btn-success btn-custom"
                    >
                      <Link
                        to="/byproduct_form"
                        className="text-decoration-none text-light shadow"
                      >
                        <BsJournalPlus />
                      </Link>
                    </button>
                  </div>
                </IconContext.Provider>
                <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="card-block">
                <h4 className="mb-3 p-b-5 b-b-default f-w-600">
                  Account Information
                </h4>
                <div className="row">
                  <div className="col-sm-6">
                    <p className="mb-2 fw-bolder">Email</p>
                    <h6 className="text-muted f-w-400">{data?.email}</h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-2 fw-bolder">Phone</p>
                    <h6 className="text-muted f-w-400">{data?.phone}</h6>
                  </div>
                </div>
                <h6 className="mb-3 m-t-40 p-b-5 b-b-default f-w-600">
                  Company
                </h6>
                <div className="row">
                  <div className="col-sm-6">
                    <p className="mb-2 fw-bolder">Name</p>
                    <h6 className="text-muted f-w-400">{data?.company}</h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-2 fw-bolder">Location</p>
                    <h6 className="text-muted f-w-400">{data?.location}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  data: PropTypes.object,
};

export default UserInfo;
