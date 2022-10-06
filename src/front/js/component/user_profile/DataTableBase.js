import React, { useState, useCallback, useMemo } from "react";
import DataTable from "react-data-table-component";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";

import ArrowDownward from "@material-ui/icons/ArrowDownward";

const _ = require("lodash");
const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

const DataTableBase = (props) => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(props.data);
  console.log("data", data);
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
      }
    };

    return (
      <>
        <button
          key="delete"
          onClick={handleDelete}
          style={{ backgroundColor: "red" }}
          // icon
        >
          Delete
        </button>
        {selectedRows.length == 1 ? (
          <button
            key="edit"
            onClick={handleDelete}
            style={{ backgroundColor: "blue" }}
            // icon
          >
            Edit
          </button>
        ) : null}
      </>
    );
  }, [data, selectedRows, toggleCleared]);
  return (
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
  );
};

DataTableBase.propTypes = {};

export default DataTableBase;
