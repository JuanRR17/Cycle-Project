import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { Context } from "../../store/appContext";

const DeleteIcon = ({ id, handleRemove }) => {
  const { store, actions } = useContext(Context);

  return (
    <span className="ms-2" type="button" onClick={() => handleRemove(id)}>
      <MdDelete />
    </span>
  );
};

DeleteIcon.propTypes = {};

export default DeleteIcon;
