import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "../../assets/css/Auth.css";
import HomeNavbar from "components/Navbars/HomeNavbar";

const Authentication = () => {
  return (
    <div>
      <HomeNavbar />
      <div className="auth">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />
          <SignIn />
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default Authentication;
