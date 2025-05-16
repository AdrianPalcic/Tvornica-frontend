import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';

const DualDropdown = ({
    locations = [],
    categories = [],
    onFilterChange,
    onClear
}) => {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCountyOpen, setIsCountyOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsCountyOpen(false);
                setIsCategoryOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleCountyDropdown = (e) => {
        e.stopPropagation();
        setIsCountyOpen(prev => !prev);
        setIsCategoryOpen(false);
    };

    const toggleCategoryDropdown = (e) => {
        e.stopPropagation();
        setIsCategoryOpen(prev => !prev);
        setIsCountyOpen(false);
    };

    const handleLocationSelect = (name, e) => {
        e.stopPropagation();
        setSelectedLocation(prev => prev === name ? '' : name);
        setIsCountyOpen(false);
    };

    const handleCategorySelect = (name, e) => {
        e.stopPropagation();
        setSelectedCategory(prev => prev === name ? '' : name);
        setIsCategoryOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange({
            location: selectedLocation,
            category: selectedCategory
        });
    };

    const handleClear = (e) => {
        e.preventDefault();
        setSelectedLocation('');
        setSelectedCategory('');
        setIsCountyOpen(false);
        setIsCategoryOpen(false);
        onClear();
    };

    const canSubmit = selectedLocation || selectedCategory;
    const canClear = canSubmit;

    return (
        <div className="dual-dropdown" ref={dropdownRef}>
            <div className="dual-dropdown__wrapper">
                {/* Location Dropdown */}
                <div className="dual-dropdown__field">
                    <button
                        className="dual-dropdown__trigger"
                        onClick={toggleCountyDropdown}
                        aria-expanded={isCountyOpen}
                    >
                        <span>{selectedLocation || 'Odaberite županiju'}</span>
                        <ChevronDown className={`dual-dropdown__icon ${isCountyOpen ? 'dual-dropdown__icon--open' : ''}`} />
                    </button>

                    <div className={`dual-dropdown__options ${isCountyOpen ? 'open' : ''}`}>
                        {locations.map(location => (
                            <div
                                key={location.id}
                                className={`dual-dropdown__option ${location.name === selectedLocation ? 'active' : ''}`}
                                onClick={(e) => handleLocationSelect(location.name, e)}
                                role="button"
                                tabIndex={0}
                            >
                                {location.name}
                                {location.name === selectedLocation && <Check size={16} style={{ marginLeft: 'auto' }} />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="dual-dropdown__divider"></div>

                {/* Category Dropdown */}
                <div className="dual-dropdown__field">
                    <button
                        className="dual-dropdown__trigger"
                        onClick={toggleCategoryDropdown}
                        aria-expanded={isCategoryOpen}
                    >
                        <span>{selectedCategory || 'Odaberite kategoriju'}</span>
                        <ChevronDown className={`dual-dropdown__icon ${isCategoryOpen ? 'dual-dropdown__icon--open' : ''}`} />
                    </button>

                    <div className={`dual-dropdown__options ${isCategoryOpen ? 'open' : ''}`}>
                        {categories.map(item => (
                            <div
                                key={item.id}
                                className={`dual-dropdown__option ${item.name === selectedCategory ? 'active' : ''}`}
                                onClick={(e) => handleCategorySelect(item.name, e)}
                                role="button"
                                tabIndex={0}
                            >
                                {item.name}
                                {item.name === selectedCategory && <Check size={16} style={{ marginLeft: 'auto' }} />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="dual-dropdown__actions">
                <button
                    className="dual-dropdown__clear-btn"
                    onClick={handleClear}
                    disabled={!canClear}
                    type="button"
                >
                    <X size={16} />
                    Očisti
                </button>
                <button
                    className="dual-dropdown__submit-btn"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    type="button"
                >
                    <Check size={16} />
                    Potvrdi odabir
                </button>
            </div>
        </div>
    );
};

export default DualDropdown;