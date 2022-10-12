import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import DataTableBase from "./DataTableBase";
import { Link, useNavigate } from "react-router-dom";

const UserProductsTable = (props) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token") == undefined) navigate("/");
    if (store.data == undefined) {
      console.log("user products table");
      actions.getCurrentUserData();
    }
    if (store.user_products == undefined && store.data != undefined)
      actions.getUserProducts(store.data.id);
  }, [store.token, store.data]);

  useEffect(() => {
    if (store.data != undefined && store.update) {
      actions.getUserProducts(store.data.id);
      actions.toggle_update();
    }
  });

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

  return (
    <>
      <button type="button" className="btn btn-success">
        <Link to="/byproduct_form" className="text-decoration-none text-light">
          Add New By-Product
        </Link>
      </button>
      {store.user_products ? (
        <DataTableBase
          title="My By-Products"
          columns={columns}
          data={store.user_products}
        />
      ) : null}
    </>
  );
};

UserProductsTable.propTypes = {};

export default UserProductsTable;
