import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { Context } from "../../store/appContext";

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
            return (
              <li key={fav.id} className="dropdown-item ">
                <Link
                  className="text-decoration-none"
                  to={"/product/" + fav.id}
                >
                  {fav.name}
                </Link>
                <span
                  className="float-end ms-2"
                  type="button"
                  onClick={() => actions.delete_favourite(fav.id)}
                >
                  <MdDelete />
                </span>
              </li>
            );
          })
        ) : (
          <li className="text-center">(empty)</li>
        )}
      </ul>
    </div>
  );
};

export default Favourites;
