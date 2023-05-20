import React from 'react';
import logo from '../images/Logo_Book_App.png';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  function Logout() {
    localStorage.removeItem('currentUser')
    window.location.href = '/login'
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/home" style={{ marginLeft: '10px' }}>
          <img src={logo} alt="Logo_Book_App" height="50" style={{ marginRight: '10px' }} />
          <span style={{ fontSize: '24px' }}>BOOKING HOTEL</span>
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-5">
            {user ? (
              <>
                <li className="nav-item active" style={{ marginLeft: '10px' }}>
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className='fa fa-user mr-3'></i>{user.name}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" href="#">My account</a>
                      <a class="dropdown-item" href="#">My reservations</a>
                      <a class="dropdown-item" href="#">Favorites</a>
                      <a class="dropdown-item" href="#" onClick={Logout}>Log out</a>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item active" style={{ marginLeft: '10px' }}>
                  <a className="nav-link btn btn-primary" href="/register">
                    Register
                  </a>
                </li>
                <li className="nav-item" style={{ marginRight: '20px' }}>
                  <a className="nav-link btn btn-outline-primary" href="/login" style={{ marginLeft: '10px' }}>
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
