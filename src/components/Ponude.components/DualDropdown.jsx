import React, { useState } from 'react';
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


    const handleSubmit = () => {
        onFilterChange({
            location: selectedLocation,
            category: selectedCategory
        });

    };

    const handleClear = () => {
        setSelectedLocation('');
        setSelectedCategory('');
        setIsCountyOpen(false);
        setIsCategoryOpen(false);
        onClear();
    };

    const canSubmit = selectedLocation || selectedCategory;
    const canClear = selectedLocation || selectedCategory;

    return (
        <div className="dual-dropdown">
            <div className="dual-dropdown__wrapper">
                {/* County dropdown */}
                <div className="dual-dropdown__field">
                    <button
                        className="dual-dropdown__trigger"
                        onClick={() => {
                            setIsCountyOpen(!isCountyOpen);
                            setIsCategoryOpen(false);
                        }}
                    >
                        <span>{selectedLocation || 'Odaberite županiju'}</span>
                        <ChevronDown className={`dual-dropdown__icon ${isCountyOpen ? 'dual-dropdown__icon--open' : ''}`} />
                    </button>

                    {isCountyOpen && (
                        <div className="dual-dropdown__options">
                            {locations.map((location) => (
                                <div
                                    key={location.id}
                                    className="dual-dropdown__option"
                                    onClick={() => {
                                        setSelectedLocation(location.name);
                                        setIsCountyOpen(false);
                                    }}
                                >
                                    {location.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                {/* Divider - hidden on mobile */}
                <div className="dual-dropdown__divider"></div>

                {/* Category dropdown */}
                <div className="dual-dropdown__field">
                    <button
                        className="dual-dropdown__trigger"
                        onClick={() => {
                            setIsCategoryOpen(!isCategoryOpen);
                            setIsCountyOpen(false);
                        }}
                    >
                        <span>{selectedCategory || 'Odaberite kategoriju'}</span>
                        <ChevronDown className={`dual-dropdown__icon ${isCategoryOpen ? 'dual-dropdown__icon--open' : ''}`} />
                    </button>

                    {isCategoryOpen && (
                        <div className="dual-dropdown__options">
                            {categories.map((item) => (
                                <div
                                    key={item}
                                    className="dual-dropdown__option"
                                    onClick={() => {
                                        setCategory(item);
                                        setIsCategoryOpen(false);
                                    }}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Action buttons */}
            <div className="dual-dropdown__actions">
                <button
                    className="dual-dropdown__clear-btn"
                    onClick={handleClear}
                    disabled={!canClear}
                >
                    <X size={16} />
                    Očisti
                </button>
                <button
                    className="dual-dropdown__submit-btn"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                >
                    <Check size={16} />
                    Potvrdi odabir
                </button>
            </div>
        </div>
    );
};

export default DualDropdown;