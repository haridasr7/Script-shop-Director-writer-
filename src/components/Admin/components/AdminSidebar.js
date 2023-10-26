import React from "react";
import "./AdminSidebar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AdminSidebar() {
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  const handleActive = (to) => setActiveLink(to);

  return (
    <div>
      <div className="sidebarcomp">
        <div className="sidebarLogo">
          <img className="Logo" src={"./images/Ellipse.png"} alt="" />
        </div>
        <div className="sidebarLinks">
          <Link
            style={{
              textDecoration: "none",
              color: "#2D2D2D",
              background: activeLink === "/AdminHome" ? "#767676" : "none",
              color: activeLink === "/AdminHome" ? "#FFF" : "#2D2D2D",
            }}
            className="Links"
            to="/AdminHome"
            onClick={() => handleActive("/AdminHome")}
          >
            Dashboard
          </Link>
          <Link
            style={{
              textDecoration: "none",
              color: "#2D2D2D",
              background:
                activeLink === "/AdminUserDetails" ? "#767676" : "none",
              color: activeLink === "/AdminUserDetails" ? "#FFF" : "#2D2D2D",
            }}
            className="Links"
            to="/AdminUserDetails"
            onClick={() => handleActive("/AdminUserDetails")}
          >
            User Details
          </Link>
          <Link
            style={{
              textDecoration: "none",
              color: "#2D2D2D",
              background:
                activeLink === "/AdminAllPurchases" ? "#767676" : "none",
              color: activeLink === "/AdminAllPurchases" ? "#FFF" : "#2D2D2D",
            }}
            className="Links"
            to="/AdminAllPurchases"
            onClick={() => handleActive("/AdminAllPurchases")}
          >
            All Purchase
          </Link>
          <Link
            style={{
              textDecoration: "none",
              color: "#2D2D2D",
              background:
                activeLink === "/Admincustomerqueries" ? "#767676" : "none",
              color:
                activeLink === "/Admincustomerqueries" ? "#FFF" : "#2D2D2D",
            }}
            className="Links"
            to="/Admincustomerqueries"
            onClick={() => handleActive("/Admincustomerqueries")}
          >
            Customer Queries
          </Link>

          <Link
            style={{
              textDecoration: "none",
              color: "#2D2D2D",
              background:
                activeLink === "/AdminBlockedUsers" ? "#767676" : "none",
              color: activeLink === "/AdminBlockedUsers" ? "#FFF" : "#2D2D2D",
            }}
            className="Links"
            to="/AdminBlockedUsers"
            onClick={() => handleActive("/AdminBlockedUsers")}
          >
            Blocked Users
          </Link>
        </div>
      </div>
    </div>
  );
}
