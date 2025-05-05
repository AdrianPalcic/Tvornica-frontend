import { useState, useEffect, useMemo } from "react";
import PonudeCard from "../components/cards/PonudeCard";
import Header from "../components/headers/Header";
import DualDropdown from "../components/Ponude.components/DualDropdown";
import "../css/PonudePage.css/Ponude.css";
import PonudeBlogCTA from "../components/Ponude.components/PonudeBlogCTA";
import Footer from '../components/Footer';
import useFetch from '../hook/useFetch';

const Ponude = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { loading, error, data } = useFetch(`http://tvornica-backend.local/wp-json/wp/v2/posts?categories=7&_embed`)

    const [isLoading, setIsLoading] = useState(false);
    const [visibleCards, setVisibleCards] = useState(9);
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        location: '',
        category: '',
    })

    const sortedBrands = useMemo(() => {
        if (!data) return [];
        return [...data].sort((a, b) => {
            new Date(b.date) - new Date(a.date)
        })
    }, [data]);

    useEffect(() => {
        if (!sortedBrands.length) return;

        const locationTags = [];
        const categoryTags = [];

        sortedBrands.forEach(brand => {
            const brandTags = brand._embedded?.['wp:term']?.[1] || [];

            brandTags.forEach(tag => {
                if (tag.name?.startsWith('Lokacija:')) {
                    const locationName = tag.name.replace('Lokacija:', '').trim();
                    if (!locationTags.some(loc => loc.id === tag.id)) {
                        locationTags.push({
                            id: tag.id,
                            name: locationName,
                            slug: tag.slug,
                        });
                    }
                } else if (tag.name?.startsWith('Kategorija:')) {
                    const categoryName = tag.name.replace('Kategorija:', '').trim();
                    if (!categoryTags.some(cat => cat.id === tag.id)) {
                        categoryTags.push({
                            id: tag.id,
                            name: categoryName,
                            slug: tag.slug,
                        });
                    }
                }
            });
        });

        setLocations(locationTags);
        setCategories(categoryTags);
        setVisibleCards(Math.min(9, sortedBrands.length));
    }, [sortedBrands]);

    const filteredBrands = useMemo(() => {
        return sortedBrands.filter((brand) => {
            const brandTags = brand._embedded?.['wp:term']?.[1] || [];

            const brandLocations = brandTags
                .filter(tag => tag.name?.startsWith('Lokacija:'))
                .map(tag => tag.name.replace('Lokacija:', '').trim());

            const brandCategories = brandTags
                .filter(tag => tag.name?.startsWith('Kategorija:'))
                .map(tag => tag.name.replace('Kategorija:', "").trim());

            //Apply filters
            const locationMatch = !filters.location || brandLocations.includes(filters.location);
            const categoryMatch = !filters.category || brandCategories.includes(filters.category);

            return locationMatch && categoryMatch;

        })
    }, [sortedBrands, filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setVisibleCards(9); // Reset to first page when filters change
    };

    const handleClearFilters = () => {
        setFilters({ location: '', category: '' });
    };

    const handleShowMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            setVisibleCards(prev => prev + 9); // Load 9 more items
            setIsLoading(false);
        }, 500);
    };

    if (loading) return <div className='loading'>Loading...</div>;
    if (error) return <div className='error'>Error: {error}</div>;
    if (!data) return <div className='error'>No data</div>;

    return (
        <>
            <Header />
            <div className="ponude-container">
                <h1>Naše Ponude</h1>
                <h3>Za vaše savršeno vjenčanje</h3>
                <DualDropdown
                    locations={locations}
                    categories={categories}
                    onFilterChange={handleFilterChange}
                    onClear={handleClearFilters}
                />

                <div className="ponude-card">
                    <div className="ponude-card__container">
                        {filteredBrands.slice(0, visibleCards).map((brand) => (
                            <PonudeCard
                                key={brand.id}
                                title={brand.title.rendered}
                                image={brand._embedded?.['wp:featuredmedia']?.[0]?.source_url}
                            />
                        ))}
                    </div>
                </div>

                {visibleCards < filteredBrands.length && (
                    <button
                        className="ponude-card__load-more"
                        onClick={handleShowMore}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Učitavanje...' : 'Učitaj još'}
                    </button>
                )}
                <PonudeBlogCTA />
            </div>
            <Footer />
        </>
    );
};

export default Ponude;