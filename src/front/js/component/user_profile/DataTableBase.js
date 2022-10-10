import React, { useState, useCallback, useMemo, useContext } from "react";
import { Context } from "../../store/appContext";
import DataTable from "react-data-table-component";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";

import Button from "@material-ui/core/Button";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useNavigate } from "react-router-dom";

const _ = require("lodash");
const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

const DataTableBase = (props) => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(props.data);
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.name
          )}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        setData(_.difference(data, selectedRows));
        selectedRows.forEach((p) => {
          actions.delete_product(p.id);
        });
      }
    };
    const handleEdit = () => {
      actions.toggle_update();
      actions.setSingleProduct(selectedRows[0]);
      navigate("/byproduct_form");
    };
    return (
      <div>
        <button key="delete" onClick={handleDelete} className="btn btn-danger">
          <DeleteIcon />
          Delete
        </button>
        {selectedRows.length == 1 ? (
          <button key="edit" onClick={handleEdit} className="btn btn-warning">
            <EditIcon />
            Edit
          </button>
        ) : null}
      </div>
    );
  }, [data, selectedRows, toggleCleared]);
  return (
    <>
      <DataTable
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        direction="auto"
        highlightOnHover
        pagination
        responsive
        selectableRows
        selectableRowsComponent={Checkbox}
        selectableRowsComponentProps={selectProps}
        selectableRowsHighlight
        selectableRowsNoSelectAll
        selectableRowsRadio="radio"
        //   selectableRowsSingle
        sortIcon={sortIcon}
        striped
        subHeaderAlign="right"
        subHeaderWrap
        {...props}
      />
    </>
  );
};

DataTableBase.propTypes = {};

export default DataTableBase;
