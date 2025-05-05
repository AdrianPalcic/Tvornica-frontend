import React from 'react';
import { NavLink } from 'react-router-dom';
import "../../css/Header.css";

const Header = () => {
    return (
        <div className="navbar-header">
            <div className="navbar-logo-header">
                <img src='/logo (2).png' alt="Logo" className="logo-header" />
            </div>
            <div className="navbar-links-header">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => isActive ? 'nav-link-header active' : 'nav-link-header'}
                >
                    Naslovna
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => isActive ? 'nav-link-header active' : 'nav-link-header'}
                >
                    O nama
                </NavLink>
                <NavLink
                    to="/blog"
                    className={({ isActive }) => isActive ? 'nav-link-header active' : 'nav-link-header'}
                >
                    Blog
                </NavLink>
                <NavLink
                    to="/vjencanja"
                    className={({ isActive }) => isActive ? 'nav-link-header active' : 'nav-link-header'}
                >
                    Vjencanja
                </NavLink>
                <NavLink
                    to="/ponude"
                    className={({ isActive }) => isActive ? 'nav-link-header active' : 'nav-link-header'}
                >
                    Ponude
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) => isActive ? 'nav-link-header active' : 'nav-link-header'}
                >
                    Kontakt
                </NavLink>
            </div>
        </div>
    );
};

export default Header;