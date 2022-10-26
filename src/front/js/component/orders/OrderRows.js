import React from "react";
import DataTable from "react-data-table-component";

const OrderRows = ({ orderRows }) => {
  const columns = [
    {
      name: "Product",
      selector: (row) => row.prod_name,
      center: true,
      sortable: false,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      center: true,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => `${row.price} €`,
      right: true,
      sortable: true,
      sortFunction: (a, b) => {
        return a.price - b.price;
      },
    },
    {
      name: "Subtotal",
      selector: (row) => `${row.subtotal} €`,
      right: true,
      sortable: true,
      sortFunction: (a, b) => {
        return a.subtotal - b.subtotal;
      },
    },
  ];

  return (
    <>
      {orderRows ? (
        <DataTable
          // title="My Made Orders"
          columns={columns}
          data={orderRows}
        />
      ) : null}
    </>
  );
};

OrderRows.propTypes = {};

export default OrderRows;
