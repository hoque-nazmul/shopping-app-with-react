import React from 'react';
import './Header.css'
import logo from '../../images/logo.png'
import { useAuth } from '../Login/useAuth';

const Header = () => {
    const auth = useAuth();
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <div className="header-content">
                
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
                                auth.user ? <a style={{ padding: '5px 12px' }} className="btn btn-danger signout" href="/login">Sign Out</a>  : <a href="/login">Sign in</a>
                            }
                        </span>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Header;