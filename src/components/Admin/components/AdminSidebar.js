import React from "react";
import "./AdminSidebar.css";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div>
      <div className="sidebarcomp">
        <div className="sidebarLogo">
          <img className="Logo" src={"./images/Ellipse.png"} alt="" />
        </div>
        <div className="sidebarLinks">
          <Link
            style={{ textDecoration: "none", color: "#2D2D2D" }}
            className="Links"
            to="/AdminHome"
          >
            Dashboard
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#2D2D2D" }}
            className="Links"
          >
            User Details
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#2D2D2D" }}
            className="Links"
          >
            Purchase History
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#2D2D2D" }}
            className="Links"
          >
            Customer Queries
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#2D2D2D" }}
            className="Links"
          >
            Add a Feature
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#2D2D2D" }}
            className="Links"
          >
            Blocked Users
          </Link>
        </div>
      </div>
    </div>
  );
}
