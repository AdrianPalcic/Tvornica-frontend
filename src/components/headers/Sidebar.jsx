import React, { useEffect, useRef } from 'react';
import "../../css/Sidebar.css";
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import LanguageSelector from '../GoogleTranslate';

const Sidebar = ({ isOpen, closeSidebar }) => {
    const sidebarRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                closeSidebar();
            }
        };

        if (isOpen) {
            document.body.style.overflow = "hidden"; // Prevent body scroll
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, closeSidebar]);

    return (
        <>
            {/* Overlay for click-to-close and dark background */}
            <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={closeSidebar}></div>
            <nav
                ref={sidebarRef}
                className={`sidebar improved-sidebar ${isOpen ? 'open' : ''}`}
                aria-label="Sidebar navigation"
                tabIndex={isOpen ? 0 : -1}
            >
                <button className='close-menu' onClick={closeSidebar} aria-label="Close sidebar">
                    <X size={32} />
                </button>
                <div className="sidebar-header">
                    <img src="/logo (2).png" alt="Site Logo" />
                    <h1>Tvornica Vjenčanja</h1>
                </div>
                <div className="divider"></div>
                <p className="sidebar-desc">Otkrijte inspiracije, savjete i trendove za vaše savršeno vjenčanje</p>
                <ul className="sidebar-nav">
                    <li><NavLink to="/" onClick={closeSidebar}>Naslovna</NavLink></li>
                    <li><NavLink to="/blog" onClick={closeSidebar}>Blog</NavLink></li>
                    <li><NavLink to="/ponude" onClick={closeSidebar}>Ponude</NavLink></li>
                    <li><NavLink to="/vjencanja" onClick={closeSidebar}>Vjenčanja</NavLink></li>
                    <li><NavLink to="/about" onClick={closeSidebar}>O nama</NavLink></li>
                    <li>
                        <NavLink to="/about#contact" onClick={closeSidebar}>
                            <button className="sidebar-contact-btn">Kontakt</button>
                        </NavLink>
                    </li>
                </ul>
                <div className="sidebar-footer">
                    <small>&copy; {new Date().getFullYear()} Tvornica Vjenčanja</small>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
