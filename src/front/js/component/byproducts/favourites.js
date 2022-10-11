import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import FavouriteLI from "./favouriteLI";

const Favourites = () => {
  const { store, actions } = useContext(Context);
  const ulStyle = {
    width: "max-content",
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-auto-close="outside"
      >
        Favourites{" "}
        <span className="badge bg-secondary">{store.favourites.length}</span>
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="dropdownMenuLink"
        style={ulStyle}
      >
        {store.favourites.length > 0 ? (
          store.favourites.map((fav) => {
            return <FavouriteLI key={fav.id} fav={fav} />;
          })
        ) : (
          <li className="text-center">(empty)</li>
        )}
      </ul>
    </div>
  );
};

export default Favourites;
