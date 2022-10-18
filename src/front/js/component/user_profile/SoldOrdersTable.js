import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import OrdersTableBase from "./OrdersTableBase";
import { Link, useNavigate } from "react-router-dom";

const SoldOrdersTable = (props) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.syncTokenFromSessionStore();
    if (!sessionStorage.getItem("token") || !store.token) {
      actions.logout();
      navigate("/");
    } else {
      if (!store.data) {
        console.log("1");
        actions.getCurrentUserData();
      }
      if (!store.orders_sold && store.data) {
        console.log("2");
        actions.getSoldOrders(store.data.id);
      }
    }
  });
  console.log("store", store);
  console.log("orders_sold:", store.orders_sold);

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Created",
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: false,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
    },
  ];

  return (
    <>
      {store.orders_sold ? (
        <OrdersTableBase
          title="My Sold Orders"
          columns={columns}
          data={store.orders_sold}
        />
      ) : null}
    </>
  );
};

SoldOrdersTable.propTypes = {};

export default SoldOrdersTable;
