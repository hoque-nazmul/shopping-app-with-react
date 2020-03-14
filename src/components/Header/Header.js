import React from 'react';
import logo from '../../images/logo.png'
import './Header.css'

const Header = () => {
    return (
        <div className="header">
            <div className="header-content">
                <img src={logo} alt=""/>
                <div className="menu">
                    <nav className="nav">
                        <a href="/shop">Shop</a>
                        <a href="/order">Order Review</a>
                        <a href="/manage">Manage Inventory</a>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Header;