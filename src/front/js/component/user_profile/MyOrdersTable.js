import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import OrdersTableBase from "./OrdersTableBase";
import { useNavigate } from "react-router-dom";

const MyOrdersTable = ({ orders }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // const token = useMemo(() => store.token, [store.token]);
  // const data = useMemo(() => {
  //   console.log("data use memo", store.data);
  //   store.data;
  // }, [store.data?.id]);

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
  // console.log("store.orders_made", store.orders_made);
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      center: true,
      sortable: true,
    },
    {
      name: "Seller",
      selector: (row) => row.seller_username,
      center: true,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
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
