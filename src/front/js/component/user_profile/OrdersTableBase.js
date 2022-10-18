import React from "react";
import PropTypes from "prop-types";
import DataTable from "react-data-table-component";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
const sortIcon = <ArrowDownward />;

const OrdersTableBase = (props) => {
  return (
    <>
      <DataTable
        direction="auto"
        highlightOnHover
        pagination
        responsive
        sortIcon={sortIcon}
        striped
        subHeaderAlign="right"
        subHeaderWrap
        {...props}
      />
    </>
  );
};

OrdersTableBase.propTypes = {
  props: PropTypes.object,
};

export default OrdersTableBase;
