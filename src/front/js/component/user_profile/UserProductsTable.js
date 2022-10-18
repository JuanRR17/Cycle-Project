import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import ProductsTableBase from "./ProductsTableBase";
import { Link, useNavigate } from "react-router-dom";

const UserProductsTable = (props) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.syncTokenFromSessionStore();
    if (!sessionStorage.getItem("token") || !store.token) {
      actions.logout();
      navigate("/");
    } else if (!store.data) {
      actions.getCurrentUserData();
    }

    if (store.update) {
      actions.getCurrentUserData();
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
      {store.data ? (
        <ProductsTableBase
          title="My By-Products"
          columns={columns}
          data={store.data.products}
        />
      ) : null}
    </>
  );
};

UserProductsTable.propTypes = {};

export default UserProductsTable;
