import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Profile = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>Profile</h1>
    </div>
  );
};
