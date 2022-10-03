import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Blog = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>Blog</h1>
    </div>
  );
};
