import React from "react";
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

OrdersTableBase.propTypes = {};

export default OrdersTableBase;
