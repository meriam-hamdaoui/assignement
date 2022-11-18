import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "../../assets/css/Auth.css";

const Authentication = () => {
  return (
    <div className="auth">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <SignUp />
        <SignIn />
      </div>
    </div>
  );
};

export default Authentication;
