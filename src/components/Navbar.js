import React, { Component } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom';
import logo from '../assets/logo.png'

export default class Navbar extends Component {
  render() {
    const handleLogout = () => {
      localStorage.clear();
      window.location.replace("/");
    };
    return (
      <>
        <nav className="navbar">
          <div className="LeftMenu">
            <div className="LogoWrapper">
              <img className="Lo" src={logo} alt="Logo" />
              <p className="BrandName">Kafene</p>
            </div>
            <div id="nav">
              <NavLink className="MenuItem Active" to="/orders">
                Orders
              </NavLink>
              <NavLink className="MenuItem Active" to="/products">
                Products
              </NavLink>
              <NavLink className="MenuItem" to="/users">
                Users
              </NavLink>
            </div>
          </div>
          <Link id="logout" className="MenuItem" onClick={handleLogout}>
            Logout
          </Link>
        </nav>
        <Outlet />
      </>
    );
  }
}
