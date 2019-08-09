import React from 'react'
import Logo from "../img/logo.jpg";

const Header = () => (
    <header>
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="nav-item">
                    <img width="280" src={Logo} alt=""/>
                </div>
            </div>
        </nav>
    </header>
)

export default Header