import React from 'react'
import "../../css/Homepage.css/Homepage.css"
import Dropdown from './Dropdown'
import useFetch from '../../hook/useFetch'

const HeroSection = () => {

    const apiUrl = import.meta.env.VITE_API_URL;

    const { loading, error, data } = useFetch(`${apiUrl}/posts?categories=3&_embed`);

    const blogs = data;

    const getBlogTags = () => {
        const allTags = [];

        blogs?.forEach(b => {
            const blogTags = b._embedded?.['wp:term']?.[1] || [];

            blogTags?.forEach((tag) => {
                if (!allTags.some(t => t.id === tag.id)) {
                    allTags.push(tag);
                }
            })
        })

        return allTags;
    }

    const blogTags = getBlogTags();

    return (
        <div className="hero-section">
            <h1>Uz Vas pri svakom koraku organizacije vjenčanja i ostalih svečanost</h1>
            <h4>Otkrijte inspiracije, savjete i trendove za vaše savršeno vjenčanje</h4>
            <Dropdown tags={blogTags} />
            <h4>Pogledajte naše najnovije članke o svemu što trebate znati za organizaciju savršenog vjenčanja.</h4>
        </div>
    )
}

export default HeroSection