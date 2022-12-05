import React from "react";
import { isAuth } from "./helpers/authantication";
import { Outlet, Navigate } from "react-router-dom";

const Private = () => {
  return isAuth() ? <Outlet /> : <Navigate to="/*" />;
};

export default Private;
