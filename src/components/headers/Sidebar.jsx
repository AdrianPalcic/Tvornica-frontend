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
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, closeSidebar]);

    return (
        <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`}>
            <X className='close-menu' onClick={closeSidebar} />
            <img src="/logo (2).png" alt="Site Logo" />
            <h1>Tvornica Vjenčanja</h1>
            <div className="divider"></div>
            <p>Otkrijte inspiracije, savjete i trendove za vaše savršeno vjenčanje</p>

            <ul>
                <li><NavLink to="/">Naslovna</NavLink></li>
                <li><NavLink to="/blog">Blog</NavLink></li>
                <li><NavLink to="/ponude">Ponude</NavLink></li>
                <li><NavLink to="/vjencanja">Vjenčanja</NavLink></li>
                <li><NavLink to="/about">O nama</NavLink></li>
                <LanguageSelector />
                <li><NavLink to="/about#contact"><button>Kontakt</button></NavLink></li>
            </ul>
        </div>
    );
};

export default Sidebar;
