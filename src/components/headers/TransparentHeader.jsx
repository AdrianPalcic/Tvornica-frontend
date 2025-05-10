import React from 'react';
import "../../css/transparent-header.css";
import { NavLink } from 'react-router-dom';

const TransparentHeader = () => {
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <img src='/logo (2).png' alt="Logo" className="logo" />
            </div>
            <div className="navbar-links">
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    Naslovna
                </NavLink>
                <NavLink
                    to="/ponude"
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    Ponude
                </NavLink>
                <NavLink
                    to="/blog"
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    Blog
                </NavLink>
                <NavLink
                    to="/vjencanja"
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    Vjencanja
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    O nama
                </NavLink>
                <NavLink
                    to="/about#contact"
                    className={({ isActive }) => isActive ? 'active' : ''}
                    onClick={(e) => {
                        if (window.location.pathname === '/about') {
                            e.preventDefault();
                            const contactSection = document.getElementById('contact');
                            if (contactSection) {
                                contactSection.scrollIntoView({ behavior: 'smooth' });
                                // Update URL without page reload
                                window.history.pushState({}, '', '#contact');
                            }
                        }
                    }}
                >
                    Kontakt
                </NavLink>
            </div>
        </div>
    );
};

export default TransparentHeader;