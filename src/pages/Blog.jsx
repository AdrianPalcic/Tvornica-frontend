import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/headers/Header';
import Footer from '../components/Footer';
import "../css/BlogPage.css/blogpage.css";
import BlogCard from '../components/cards/BlogCard';
import BlogCTA from '../components/BlogPage.components/BlogCTA';
import useFetch from '../hook/useFetch';
import { Helmet } from 'react-helmet';

const Blog = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState('Sve');
    const [searchQuery, setSearchQuery] = useState('');
    const { loading, error, data } = useFetch(`${apiUrl}/posts?categories=3&_embed`);

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

    /**
* Calculates estimated read time for WordPress blog content
* @param {string} htmlContent - The rendered HTML content from WordPress
* @param {number} [wordsPerMinute=200] - Average reading speed (words per minute)
* @param {number} [imageReadTime=12] - Seconds added per image (default 12s per Medium's formula)
* @returns {Object} - Returns {minutes, seconds, totalSeconds, text}
*/
    function calculateReadTime(htmlContent, wordsPerMinute = 200, imageReadTime = 12) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        const texT = tempDiv.textContent || '';
        const wordCount = texT.trim().split(/\s+/).length;

        const imageCount = tempDiv.querySelectorAll('img').length;

        const wordsTime = (wordCount / wordsPerMinute) * 60;
        const imagesTime = imageCount * imageReadTime;
        const totalSeconds = wordsTime + imagesTime;

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.round(totalSeconds % 60);

        const roundedMinutes = minutes < 1 ? 1 : minutes; // Nikad ne moze bit 0 minuta
        const textSuffix = roundedMinutes === 1 ? 'min read' : 'min read';
        const text = `${roundedMinutes} ${textSuffix}`;

        return {
            minutes: roundedMinutes,
            seconds,
            totalSeconds,
            text,
            wordCount,
            imageCount
        };
    }

    return (
        <>
            <Helmet>
                <title>Blog | Tvornica Vjenčanja</title>
                <meta name="description" content="Pročitajte najnovije blogove o organizaciji vjenčanja, savjetima, trendovima i iskustvima mladenaca. Saznajte sve na jednom mjestu!" />
                <meta name="keywords" content="blog o vjenčanjima, organizacija vjenčanja, savjeti za mladence, trendovi vjenčanja, vjenčani blog" />
                <meta property="og:title" content="Blog | Tvornica Vjenčanja" />
                <meta property="og:description" content="Inspiracije, savjeti i priče o vjenčanjima — pročitajte naš blog i pronađite ideje za vaš dan iz snova." />
                <meta property="og:url" content="https://tvornicavjencanja.hr/blog" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://tvornicavjencanja.hr/wp/wp-content/uploads/2025/05/bride-hero-1024x685.jpg" />
                <link rel="canonical" href="https://tvornicavjencanja.hr/blog" />
            </Helmet>

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
                        const readingTime = calculateReadTime(blog?.content?.rendered);


                        return (
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                title={blog.title.rendered}
                                image={featuredImage}
                                date={date}
                                excerpt={excerpt}
                                tags={tags}
                                readTime={readingTime.text}
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