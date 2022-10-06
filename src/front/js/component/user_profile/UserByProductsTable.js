import React from "react";
import PropTypes from "prop-types";
import DataTableBase from "./DataTableBase";
import { Link } from "react-router-dom";

const UserByProductsTable = (props) => {
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: false,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "Price ",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },

    {
      name: "Unit",
      selector: (row) => row.unit,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      name: "Orange peels",
      description: "Orange peels",
      location: "Murcia",
      price: 1,
      stock: 200,
      unit: "kg",
      type: "Organic",
    },
    {
      id: 2,
      name: "Scrap",
      description: "Plastic scraps",
      location: "Alicante",
      price: 0.5,
      stock: 400,
      unit: "kg",
      type: "Plastic",
    },
  ];
  return (
    <>
      <button type="button" className="btn btn-success">
        <Link to="/byproduct_form" className="text-decoration-none text-light">
          Add new Byproduct
        </Link>
      </button>
      <DataTableBase title="My Byproducts" columns={columns} data={data} />
    </>
  );
};

UserByProductsTable.propTypes = {};

export default UserByProductsTable;
