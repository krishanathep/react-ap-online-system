import React, { useState, useEffect } from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import logo from "/assets/dist/img/AdminLTELogo.png";

export default function Sidebar() {
  const navigate = useNavigate();
  const profile = useAuthUser();

  const [adminRule, setAdminRule] = useState(false);
  const [userRule, setUserRule] = useState(false);
  const [afRule, setAfRule] = useState(false);
  const [apRule, setApRule] = useState(false);

  const getRule = async () => {
    if (profile().rule === "USER") {
      setUserRule(true);
      return;
    }
    if (profile().rule === "ADMIN") {
      setAdminRule(true);
      return;
    }
    if (profile().rule === "AF") {
      setAfRule(true);
      return;
    }
    if (profile().rule === "AP") {
      setApRule(true);
      return;
    }
  };

  useEffect(() => {
    getRule();
  },[]);

  return (
    <>
      <aside className="main-sidebar nav-pills sidebar-dark-primary sidebar-no-expand elevation-1">
        <Link to="/" className="brand-link">
          <img
            src={logo}
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-1"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">AP SYSTEM</span>
        </Link>
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {userRule ? (
                <>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      <i className="nav-icon fas fa-home"></i>
                      <p>DASHBOARD</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/pettycash" className="nav-link">
                      <i className="nav-icon fab fa-bitcoin"></i>
                      <p>PETTY CASH</p>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                    <i className="nav-icon fa fa-book"></i>
                      <p>USER MANUAL</p>
                    </Link>
                  </li> */}
                </>
              ) : (
                ""
              )}
              {adminRule ? (
                <>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      <i className="nav-icon fas fa-home"></i>
                      <p>DASHBOARD</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/pettycash" className="nav-link">
                      <i className="nav-icon fab fa-bitcoin"></i>
                      <p>PETTY CASH</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/finance" className="nav-link">
                      <i className="nav-icon fas fa-piggy-bank"></i>
                      <p>FINANCE</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/account" className="nav-link">
                      <i className="nav-icon fas fa-calculator"></i>
                      <p>ACCOUNTING</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/report" className="nav-link">
                      <i className="nav-icon fas fa-chart-pie"></i>
                      <p>REPORT</p>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link to="/test" className="nav-link">
                      <i className="nav-icon fas fa-chart-pie"></i>
                      <p>TEST FUNCTION</p>
                    </Link>
                  </li> */}
                </>
              ) : (
                ""
              )}
              {afRule ? (
                <>
                 <li className="nav-item">
                    <Link to="/" className="nav-link">
                      <i className="nav-icon fas fa-home"></i>
                      <p>DASHBOARD</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/account" className="nav-link">
                      <i className="nav-icon fas fa-calculator"></i>
                      <p>ACCOUNTING</p>
                    </Link>
                  </li>
                </>
              ) : ('')}
              {apRule ? (
                <>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      <i className="nav-icon fas fa-home"></i>
                      <p>DASHBOARD</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/finance" className="nav-link">
                      <i className="nav-icon fas fa-piggy-bank"></i>
                      <p>FINANCE</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/report" className="nav-link">
                      <i className="nav-icon fas fa-chart-pie"></i>
                      <p>REPORT</p>
                    </Link>
                  </li>
                </>
              ) : ('')}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
