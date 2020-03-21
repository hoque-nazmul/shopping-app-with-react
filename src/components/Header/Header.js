import React from 'react';
import './Header.css'
import logo from '../../images/logo.png'
import { useAuth } from '../Login/useAuth';


const Header = () => {
    const auth = useAuth();
    return (
        <div className="header">
            <div className="header-content">
                <img src={logo} alt=""/>
                <div className="menu">
                    <nav className="nav">
                        <a href="/shop">Shop</a>
                        <a href="/review">Order Review</a>
                        <a href="/inventory">Manage Inventory</a>
                        <span style={{ marginLeft: 'auto', paddingTop: '10px' }}>
                            {
                                auth.user && <span style={{ color: 'yellow' }}>Welcome {auth.user.name}</span> 
                            }
                            {
                                auth.user ? <a className="btn btn-danger" href="/login">Sign Out</a>  : <a href="/login">Sign in</a>
                            }
                        </span>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Header;