import React from "react";
import PropTypes from "prop-types";

const Prof = (props) => {
  return (
    <div className="card bg-light shadow">
      <div className="card-header bg-white border-0">
        <div className="row align-items-center">
          <div className="col-8">
            <h3 className="mb-0">My account</h3>
          </div>
          <div className="col-4 text-right">
            <a href="#!" className="btn btn-sm btn-primary">
              Settings
            </a>
          </div>
        </div>
      </div>
      <div className="card-body">
        <h6 className="heading-small text-muted mb-4">User information</h6>
        <div className="pl-lg-4">
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group focused">
                <label className="form-control-label" for="input-username">
                  Username
                </label>
                <input
                  type="text"
                  id="input-username"
                  className="form-control form-control-alternative"
                  placeholder="Username"
                  value="lucky.jesse"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-control-label" for="input-email">
                  Email address
                </label>
                <input
                  type="email"
                  id="input-email"
                  className="form-control form-control-alternative"
                  placeholder="jesse@example.com"
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        {/* <!-- Address --> */}
        <h6 className="heading-small text-muted mb-4">Contact information</h6>
        <div className="pl-lg-4">
          <div className="row">
            <div className="col-lg-4">
              <div className="form-group focused">
                <label className="form-control-label" for="input-city">
                  City
                </label>
                <input
                  type="text"
                  id="input-city"
                  className="form-control form-control-alternative"
                  placeholder="City"
                  value="New York"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group focused">
                <label className="form-control-label" for="input-country">
                  Country
                </label>
                <input
                  type="text"
                  id="input-country"
                  className="form-control form-control-alternative"
                  placeholder="Country"
                  value="United States"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <label className="form-control-label" for="input-country">
                  Postal code
                </label>
                <input
                  type="number"
                  id="input-postal-code"
                  className="form-control form-control-alternative"
                  placeholder="Postal code"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Prof.propTypes = {};

export default Prof;
