import React from "react";
import { NavLink as Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <aside className="main-sidebar nav-pills sidebar-dark-primary sidebar-no-expand elevation-1">
        <Link to="/" className="brand-link">
          <img
            src="/assets/dist/img/AdminLTELogo.png"
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
              <li className="nav-header">MAIN MENU</li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="nav-icon fas fa-home"></i>
                  <p>หน้าแรก</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/pettycash" className="nav-link">
                <i className="nav-icon fas fa-wallet"></i>
                  <p>เงินสดย่อย</p>
                </Link>
              </li>
              <li className="nav-header">ADMIN MENU</li>
              <li className="nav-item">
                <Link to="/finance" className="nav-link">
                  <i className="nav-icon fas fa-hand-holding-usd"></i>
                  <p>เจ้าหน้าที่การเงิน</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/account" className="nav-link">
                  <i className="nav-icon fas fa-calculator"></i>
                  <p>เจ้าหน้าที่บัญชี</p>
                </Link>
              </li>
              {/* <li className="nav-header">TEST MENU</li>
              <li className="nav-item">
                <Link to="/test" className="nav-link">
                  <i className="nav-icon fas fa-vial"></i>
                  <p>Test One</p>
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
