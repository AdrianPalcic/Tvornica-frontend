import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useFetch from '../hook/useFetch';

const Footer = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const { data: blogData } = useFetch(`${apiUrl}/posts?categories=3&_embed`);
    const { data: brandData } = useFetch(`${apiUrl}/posts?categories=7&_embed`);

    const getBlogTags = () => {
        const allTags = [];

        blogData?.forEach(blog => {
            const blogTags = blog._embedded?.['wp:term']?.[1] || [];

            blogTags?.forEach(tag => {
                if (!allTags.some(t => t.id === tag.id)) {
                    allTags.push(tag);
                }
            })
        })

        return allTags;
    }

    const getBrandTags = () => {
        const allTags = [];

        brandData?.forEach(brand => {
            const brandTags = brand._embedded?.['wp:term']?.[1] || [];

            brandTags?.forEach(tag => {
                if (tag.name.startsWith("Kategorija:")) {
                    const tagName = tag.name.replace('Kategorija:', '').trim();
                    if (!allTags.some(t => t.id === tag.id)) {
                        allTags.push({
                            id: tag.id,
                            name: tagName,
                            slug: tag.slug
                        })
                    }
                }
            })
        })

        return allTags;
    }

    const blogTags = getBlogTags();
    const brandTags = getBrandTags();

    const handleNavigate = (tagName) => {
        navigate('/blog', {
            state: { preselectedCategory: tagName }
        });
    }

    const handleNavigateBrand = (tagName) => {
        navigate('/ponude', {
            state: {
                preselectedCategory: tagName
            }
        })
    }

    return (
        <footer>
            <div className="footer-container">
                <div className="logo">
                    <img src="/logo (2).png" alt="Logo" />
                    <h1>Tvornica Vjenčanja</h1>
                    <p>Otkrijte inspiracije, savjete i trendove za vaše savršeno vjenčanje</p>
                </div>
                <div className="footer-links">
                    <Link to="/blog"><h2>Blog</h2></Link>
                    <ul>
                        {
                            blogTags?.map(tag => (
                                <li onClick={() => handleNavigate(tag.name)} key={tag.id}>{tag.name}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="footer-links">
                    <Link to="/ponude"><h2>Ponude</h2></Link>
                    <ul>
                        {
                            brandTags?.map(tag => (
                                <li key={tag.id} onClick={() => handleNavigateBrand(tag.name)}>{tag.name}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="footer-links footer-links-last">
                    <ul>
                        <li><Link to={"/besplatne-stvari"} >Besplatni sadržaj</Link></li>
                        <li><a href="https://facebook.com" target='_blank'>Facebook</a></li>
                        <li><a href="/cookies" target='_blank'>Kolačići</a></li>
                        <li><a href="/pp" target='_blank'>Politika Privatnosti</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 Tvornica Vjenčanja. Sva prava pridržana.</p>
            </div>

        </footer>
    )
}

export default Footer