import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import OrdersTableBase from "./OrdersTableBase";
import { useNavigate } from "react-router-dom";

const MyOrdersTable = (props) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.syncTokenFromSessionStore();
    if (!sessionStorage.getItem("token") || !store.token) {
      actions.logout();
      navigate("/");
    } else {
      if (!store.data) {
        actions.getCurrentUserData();
      }
      if (!store.orders_made && store.data) {
        actions.getMadeOrders(store.data.id);
      }
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
      name: "Seller",
      selector: (row) => row.seller,
      center: true,
      sortable: true,
    },
    {
      name: "Created",
      selector: (row) => row.created_at,
      center: true,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      center: true,
      sortable: false,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      center: true,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => `${row.total} €`,
      right: true,
      sortable: true,
      sortFunction: (a, b) => {
        return a.total - b.total;
      },
    },
  ];

  return (
    <>
      {store.orders_made ? (
        <OrdersTableBase
          title="My Made Orders"
          columns={columns}
          data={store.orders_made}
        />
      ) : null}
    </>
  );
};

MyOrdersTable.propTypes = {};

export default MyOrdersTable;
