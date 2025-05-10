import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/Homepage.css/Dropdown.css"

const Dropdown = ({ tags }) => {
    const navigate = useNavigate();
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

    const handleTagSelect = (tagName) => {
        setIsOpen(false);
        navigate('/blog', {
            state: { preselectedCategory: tagName }
        });
    };

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <button
                className="dropdown-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                Pretražite naš blog
                <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>

            {isOpen && (
                <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                    {tags.map((tag) => (
                        <li key={tag.id}>
                            <button
                                className="dropdown-item"
                                onClick={() => handleTagSelect(tag.name)}
                            >
                                {tag.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;