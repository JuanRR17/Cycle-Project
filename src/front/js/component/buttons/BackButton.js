import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";

const BackButton = ({ route }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="btn btn-danger btn-custom m-2 me-auto"
      onClick={() => navigate(route)}
    >
      <TiArrowBackOutline /> Back
    </button>
  );
};

BackButton.propTypes = {};

export default BackButton;
