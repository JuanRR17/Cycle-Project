import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import "../../../styles/index.css";
import { Context } from "../../store/appContext";
import Checkbox from "@material-ui/core/Checkbox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useNavigate } from "react-router-dom";
import { customStyles } from "../../utils/tables-style";

const _ = require("lodash");
const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

const ProductsTableBase = (props) => {
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
      navigate("/byproduct_form/" + selectedRows[0].id);
    };
    return (
      <div className="py-2 d-flex gap-2">
        <button
          key="delete"
          onClick={handleDelete}
          className="btn btn-danger btn-custom"
        >
          <DeleteIcon />
        </button>
        {selectedRows.length == 1 ? (
          <button
            key="edit"
            onClick={handleEdit}
            className="btn btn-warning btn-custom"
          >
            <EditIcon />
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
        sortIcon={sortIcon}
        striped
        subHeaderAlign="right"
        subHeaderWrap
        {...props}
        customStyles={customStyles}
      />
    </>
  );
};

export default ProductsTableBase;
