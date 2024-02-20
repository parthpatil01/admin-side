import React from "react";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top">
      <div className="container-fluid">
        <div className="navbar-brand" href="/">
          Admin Panel
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto me-3 mb-2 mb-lg-0">


            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Manage Profile
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Edit Profile</a></li>
                <li><a className="dropdown-item" href="#">Change Password</a></li>
                <li><div className="dropdown-divider"></div></li>
                <li><a className="dropdown-item" href="#">Logout</a></li>

              </ul>
            </li>

          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Header;
