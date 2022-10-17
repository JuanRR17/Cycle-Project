import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";

const DeleteIcon = ({ id, handleRemove }) => {
  return (
    <span className="ms-2" type="button" onClick={() => handleRemove(id)}>
      <MdDelete />
    </span>
  );
};

DeleteIcon.propTypes = {};

export default DeleteIcon;
