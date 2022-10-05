import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const UserInfo = ({ data }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div>
      <div>Username: {data?.username}</div>
      <div>Email: {data?.email}</div>
      <div>Company: {data?.company}</div>
      <div>Phone: {data?.phone}</div>
      <div>Location: {data?.location}</div>
    </div>
  );
};

UserInfo.propTypes = {};

export default UserInfo;
