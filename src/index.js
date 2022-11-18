/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Routes,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import Home from "views/Home";
import Dashboard from "views/Dashboard";
import User from "views/UserProfile";
import TableList from "views/TableList";
import Typography from "views/Typography";
import Icons from "views/Icons";
import Notifications from "views/Notifications";

import { Provider } from "react-redux";
import store from "JS/store";
import Authentication from "components/auth/Authentication";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Authentication />} />
        <Route path="admin" element={<AdminLayout />}>
          {/* <Route index element={<AdminLayout />} /> */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user" element={<User />} />
          <Route path="table" element={<TableList />} />
          <Route path="typography" element={<Typography />} />
          <Route path="icons" element={<Icons />} />

          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
