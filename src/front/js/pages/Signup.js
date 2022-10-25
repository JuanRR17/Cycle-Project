import React from "react";
import "../../styles/home.css";
import UserForm from "../component/user_profile/UserForm";

export const SignUp = () => {
  return (
    <div className="m-auto w-75 bg-custom p-3">
      <UserForm edit={false} />
    </div>
  );
};
