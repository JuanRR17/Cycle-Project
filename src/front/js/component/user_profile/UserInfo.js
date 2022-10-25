import React from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { BsJournalPlus } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserInfo = ({ data, handleEdit }) => {
  return (
    <div className="page-content page-container" id="page-content">
      <div className="row container d-flex justify-content-center">
        <div className="col-md-12">
          <div className="card user-card-full">
            <div className="row mx-0">
              <div className="col-sm-4 bg-c-lite-green pt-5">
                <div className="card-block text-center text-white">
                  <div className="m-b-25">
                    <img
                      src="https://img.icons8.com/bubbles/100/000000/user.png"
                      className="img-radius"
                      alt="User-Profile-Image"
                    />
                  </div>
                  <h6 className="f-w-600">{data?.username}</h6>
                  <IconContext.Provider value={{ className: "", size: 35 }}>
                    <div>
                      <button onClick={handleEdit} className="btn btn-primary">
                        <FaUserEdit />
                      </button>
                      <button type="button" className="btn btn-success ms-2">
                        <Link
                          to="/byproduct_form"
                          className="text-decoration-none text-light"
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
                  <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                    Information
                  </h6>
                  <div className="row">
                    <div className="col-sm-6">
                      <p className="m-b-10 f-w-600">Email</p>
                      <h6 className="text-muted f-w-400">{data?.email}</h6>
                    </div>
                    <div className="col-sm-6">
                      <p className="m-b-10 f-w-600">Phone</p>
                      <h6 className="text-muted f-w-400">{data?.phone}</h6>
                    </div>
                  </div>
                  <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                    Company
                  </h6>
                  <div className="row">
                    <div className="col-sm-6">
                      <p className="m-b-10 f-w-600">Name</p>
                      <h6 className="text-muted f-w-400">{data?.company}</h6>
                    </div>
                    <div className="col-sm-6">
                      <p className="m-b-10 f-w-600">Location</p>
                      <h6 className="text-muted f-w-400">{data?.location}</h6>
                    </div>
                  </div>
                  <ul className="social-link list-unstyled m-t-40 m-b-10">
                    <li>
                      <a
                        href="#!"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title=""
                        data-original-title="facebook"
                        data-abc="true"
                      >
                        <i
                          className="mdi mdi-facebook feather icon-facebook facebook"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#!"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title=""
                        data-original-title="twitter"
                        data-abc="true"
                      >
                        <i
                          className="mdi mdi-twitter feather icon-twitter twitter"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#!"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title=""
                        data-original-title="instagram"
                        data-abc="true"
                      >
                        <i
                          className="mdi mdi-instagram feather icon-instagram instagram"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

UserInfo.propTypes = {
  data: PropTypes.object,
};

export default UserInfo;
