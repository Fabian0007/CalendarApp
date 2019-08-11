import React from 'react';
import Logo from '../img/logo.png';

const Header = () => (
  <header>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="nav-item">
          <img width="40" src={Logo} alt="" />
          <span>Calendar</span>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
