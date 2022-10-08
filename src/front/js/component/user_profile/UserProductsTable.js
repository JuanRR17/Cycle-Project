import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import DataTableBase from "./DataTableBase";
import { Link, useNavigate } from "react-router-dom";

const UserProductsTable = (props) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  console.log(store.data);
  // const id = store.data.id;

  useEffect(() => {
    if (store.token == undefined) navigate("/");
    if (store.data == undefined) actions.getUserData();
    if (store.user_products == undefined && store.data != undefined)
      actions.getUserProducts(store.data.id);
  }, [store.token, store.data]);

  console.log("store:", store);

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
  // console.log("store.data:", store.user_products);
  return (
    <>
      <button type="button" className="btn btn-success">
        <Link to="/byproduct_form" className="text-decoration-none text-light">
          Add new Byproduct
        </Link>
      </button>
      {store.user_products ? (
        <DataTableBase
          title="My Byproducts"
          columns={columns}
          data={store.user_products}
        />
      ) : null}
    </>
  );
};

UserProductsTable.propTypes = {};

export default UserProductsTable;
