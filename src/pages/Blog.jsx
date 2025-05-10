import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/headers/Header';
import Footer from '../components/Footer';
import "../css/BlogPage.css/blogpage.css";
import BlogCard from '../components/cards/BlogCard';
import BlogCTA from '../components/BlogPage.components/BlogCTA';
import useFetch from '../hook/useFetch';

const Blog = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState('Sve');
    const [searchQuery, setSearchQuery] = useState('');
    const { loading, error, data } = useFetch(`http://tvornica-backend.local/wp-json/wp/v2/posts?categories=3&_embed`);

    // Check for preselected category from navigation
    useEffect(() => {
        if (location.state?.preselectedCategory) {
            setActiveCategory(location.state.preselectedCategory);
        }
    }, [location.state]);

    if (loading) return <div className='loading'>Loading...</div>;
    if (error) return <div className='error'>Error: {error}</div>;
    if (!data) return <div className='error'>No data</div>;

    const blogs = data;

    const getAllUniqueTags = () => {
        const allTags = [];
        blogs.forEach(blog => {
            const blogTags = blog._embedded?.['wp:term']?.[1] || [];
            blogTags.forEach(tag => {
                if (!allTags.some(t => t.id === tag.id)) {
                    allTags.push(tag);
                }
            });
        });
        return allTags;
    };

    const uniqueTags = getAllUniqueTags();

    const handleClick = (e) => {
        const category = e.target.innerText;
        setActiveCategory(category);
    };

    const cleanExcerpt = (raw) => {
        const unicodeDecoded = raw.replace(/\\u[\dA-F]{4}/gi, match =>
            String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
        );
        const textarea = document.createElement('textarea');
        textarea.innerHTML = unicodeDecoded;
        const htmlDecoded = textarea.value;
        return htmlDecoded.replace(/<[^>]*>/g, '').trim();
    };

    const stripHtml = (html) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = html;
        return textarea.value.replace(/<[^>]*>/g, '').trim();
    };

    const filteredBlogs = () => {
        let result = blogs;

        if (activeCategory !== 'Sve') {
            result = result.filter(blog => {
                const blogTags = blog._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [];
                return blogTags.includes(activeCategory);
            });
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(blog => {
                const title = stripHtml(blog.title.rendered).toLowerCase();
                const description = stripHtml(blog.excerpt.rendered).toLowerCase();
                return title.includes(query) || description.includes(query);
            });
        }

        return result;
    };

    const sortedBlogs = filteredBlogs().sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <>
            <Header />
            <div className="blog-container">
                <h1>Naš Blog</h1>
                <h3>Sve o vjenčanjima na jednome mjestu</h3>
                <input
                    type="text"
                    placeholder="Pretraži blog"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <h2>Pretražite po kategorijama</h2>
                <div className="blog-categories">
                    <div onClick={handleClick} className={`category ${activeCategory === "Sve" ? "active-cat" : ""}`}>Sve</div>
                    {uniqueTags.map((tag) => (
                        <div
                            key={tag.id}
                            onClick={handleClick}
                            className={`category ${activeCategory === tag.name ? "active-cat" : ""}`}
                        >
                            {tag.name}
                        </div>
                    ))}
                </div>
                <div className="blog-card-container">
                    {sortedBlogs.map((blog) => {
                        const featuredImage = blog._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                        const excerpt = cleanExcerpt(blog.excerpt.rendered);
                        const tags = blog._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [];
                        const date = new Date(blog.date).toLocaleDateString('hr-HR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                        const authorName = blog._embedded?.author?.[0]?.name;

                        return (
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                title={blog.title.rendered}
                                image={featuredImage}
                                date={date}
                                excerpt={excerpt}
                                tags={tags}
                                author={authorName}
                            />
                        );
                    })}
                </div>
                <BlogCTA />
            </div>
            <Footer />
        </>
    );
};

export default Blog;