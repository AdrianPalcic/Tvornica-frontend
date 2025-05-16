import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../../css/Header.css";
import "../../css/Sidebar.css"
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import LanguageSelector from '../GoogleTranslate';


const Header = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <>
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
                        to="/ponude"
                        className={({ isActive }) => isActive ? 'nav-link-header active' : 'nav-link-header'}
                    >
                        Ponude
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
                        Vjenčanja
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => isActive ? 'nav-link-header active' : 'nav-link-header'}
                    >
                        O nama
                    </NavLink>
                    <LanguageSelector />
                    <NavLink
                        to="/about/#contact"
                        className={({ isActive }) => isActive ? 'nav-link-header active' : 'nav-link-header'}
                    >
                        Kontakt
                    </NavLink>
                </div>
                <Menu className='menu-open' onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            </div>
            {isSidebarOpen ? <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} /> : ""}
        </>
    );
};

export default Header;