import React from 'react';
import logo from '../images/Logo_Book_App.png';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/home" style={{ marginLeft: '10px' }}>
          <img src={logo} alt="Loogo_Book_App" height="50" style={{ marginRight: '10px' }} />
          <span style={{ fontSize: '24px' }}>BOOKING HOTEL</span>
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active" style={{ marginLeft: '10px' }}>
              <a className="nav-link btn btn-primary" href="/register">Register</a>
            </li>
            <li className="nav-item" style={{ marginRight: '20px' }}>
              <a className="nav-link btn btn-outline-primary" href="/login" style={{marginLeft: '10px'}}>Login</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}