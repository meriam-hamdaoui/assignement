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
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { isAuth } from "../helpers/authantication";

const Sidebar = ({ color, image }) => {
  const { user, token } = isAuth("user", "token");
  return (
    token && (
      <div className="sidebar" data-image={image} data-color={color}>
        <div
          className="sidebar-background"
          style={{
            backgroundImage: "url(" + image + ")",
          }}
        />
        <div className="sidebar-wrapper">
          <div className="logo d-flex align-items-center justify-content-start">
            <a
              href="https://www.creative-tim.com?ref=lbd-sidebar"
              className="simple-text logo-mini mx-1"
            >
              <div className="logo-img">
                <img src={require("assets/img/reactlogo.png")} alt="..." />
              </div>
            </a>
            <a className="simple-text" href="/">
              Home
            </a>
          </div>
          <Nav>
            <NavLink
              to={`/profile/${user.id}/dashboard`}
              className="nav-link"
              activeclassname="active"
              style={{
                fontSize: "20px",
                display: "flex",
              }}
            >
              <i className="nc-icon nc-chart-pie-35"></i>
              <p style={{ fontSize: "14px", marginLeft: "1rem" }}>Dashboard</p>
            </NavLink>

            <NavLink
              to={`/profile/${user.id}/user`}
              className="nav-link"
              activeclassname="active"
              style={{
                fontSize: "20px",
                display: "flex",
              }}
            >
              <i className="nc-icon nc-circle-09"></i>
              <p style={{ fontSize: "14px", marginLeft: "1rem" }}>
                User Profile
              </p>
            </NavLink>

            <Nav.Link
              href={`/profile/${user.id}/table`}
              className="nav-link"
              activeclassname="active"
              style={{
                fontSize: "20px",
                display: "flex",
              }}
            >
              <i className="nc-icon nc-notes"></i>
              <p style={{ fontSize: "14px", marginLeft: "1rem" }}>Table List</p>
            </Nav.Link>

            <Nav.Link
              href={`/profile/${user.id}/typography`}
              className="nav-link"
              activeclassname="active"
              style={{
                fontSize: "20px",
                display: "flex",
              }}
            >
              <i className="nc-icon nc-paper-2"></i>
              <p style={{ fontSize: "14px", marginLeft: "1rem" }}>Typography</p>
            </Nav.Link>

            <Nav.Link
              href={`/profile/${user.id}/icons`}
              className="nav-link"
              activeclassname="active"
              style={{
                fontSize: "20px",
                display: "flex",
              }}
            >
              <i className="nc-icon nc-atom"></i>
              <p style={{ fontSize: "14px", marginLeft: "1rem" }}>Icons</p>
            </Nav.Link>

            <Nav.Link
              href={`/profile/${user.id}/notifications`}
              className="nav-link"
              activeclassname="active"
              style={{
                fontSize: "20px",
                display: "flex",
              }}
            >
              <i className="nc-icon nc-bell-55"></i>
              <p style={{ fontSize: "14px", marginLeft: "1rem" }}>
                Notifications
              </p>
            </Nav.Link>
          </Nav>
        </div>
      </div>
    )
  );
};

export default Sidebar;
