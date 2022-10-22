import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import ProductsTableBase from "./ProductsTableBase";
import { useNavigate } from "react-router-dom";

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
      center: true,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      center: true,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
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
      name: "Stock",
      selector: (row) => row.stock,
      right: true,
      sortable: true,
    },

    {
      name: "Unit",
      selector: (row) => row.unit,
      center: true,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      center: true,
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
