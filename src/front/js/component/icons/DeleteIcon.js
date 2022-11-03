import React from "react";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";

const DeleteIcon = ({ id, handleRemove }) => {
  return (
    <span className="ms-2 icon" type="button" onClick={() => handleRemove(id)}>
      <MdDelete />
    </span>
  );
};

DeleteIcon.propTypes = {
  id: PropTypes.number.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default DeleteIcon;
