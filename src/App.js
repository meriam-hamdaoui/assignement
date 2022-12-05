import React from "react";
import AdminLayout from "layouts/Admin.js";
import Home from "views/Home";
import Dashboard from "views/Dashboard";
import User from "views/UserProfile";
import TableList from "views/TableList";
import Typography from "views/Typography";
import Icons from "views/Icons";
import Notifications from "views/Notifications";
import Error from "views/Error";
import { Routes, Route } from "react-router-dom";
import Authentication from "components/auth/Authentication";
import Private from "./components/Private";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Authentication />} />
        <Route element={<Private />}>
          <Route path="profile" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="user" element={<User />} />
            <Route path="table" element={<TableList />} />
            <Route path="typography" element={<Typography />} />
            <Route path="icons" element={<Icons />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Route>
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
