import React from "react";
import PropTypes from "prop-types";

const UserInfo = ({ data }) => {
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

UserInfo.propTypes = {
  data: PropTypes.object,
};

export default UserInfo;
