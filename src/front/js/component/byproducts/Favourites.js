import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import FavouriteLI from "./FavouriteLI";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Favourites = () => {
  const { store, actions } = useContext(Context);
  const ulStyle = {
    width: "max-content",
  };

  useEffect(() => {
    actions.getCurrentUserData();
  }, []);

  return (
    <>
      {store.token ? (
        <div className="dropdown">
          <button
            className="btn btn-primary p-1 m-1"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
          >
            {store.favourites.length === 0 ? <AiOutlineStar /> : <AiFillStar />}{" "}
            <span className="badge p-1">{store.favourites.length}</span>
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end p-0 border-0"
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
      ) : null}
    </>
  );
};

export default Favourites;
