import React, { useState, useRef, useEffect } from 'react';
import "../../css/Homepage.css/Dropdown.css"

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const dropdownItems = [
        { label: "Profile", value: "profile" },
        { label: "Settings", value: "settings" },
        { label: "Messages", value: "messages" },
        { label: "Notifications", value: "notifications" },
        { label: "Logout", value: "logout" }
    ];

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <button
                className="dropdown-toggle"
                onClick={toggleDropdown}
                aria-expanded={isOpen}
            >
                Pretražite naš blog
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>

            {isOpen && (
                <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                    {dropdownItems.map((item) => (
                        <li key={item.value}>
                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    console.log("Selected:", item.value);
                                    setIsOpen(false);
                                }}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;