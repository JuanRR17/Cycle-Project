import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import UserDataForm from "../component/user_profile/UserDataForm";
import UserInfo from "../component/user_profile/UserInfo";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  console.log("edit", edit);

  const handleEditProfile = () => {
    setEdit(true);
  };

  useEffect(() => {
    if (store.token == undefined) navigate("/");
  }, [store.token, store.data]);
  // console.log("token in private", store.token);
  // console.log("data", store.data);

  return (
    <div className="mt-5">
      <h1>User Profile</h1>
      <div className="m-auto w-75 bg-warning p-3">
        {edit ? (
          <div>
            <UserDataForm handleSetEdit={(value) => setEdit(value)} />
          </div>
        ) : (
          <>
            <UserInfo data={store.data} />
            <button onClick={handleEditProfile} className="btn btn-primary">
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};
