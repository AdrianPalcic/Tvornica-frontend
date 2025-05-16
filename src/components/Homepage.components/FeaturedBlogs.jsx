import React from 'react'
import FeaturedBlogsCard from '../cards/FeaturedBlogsCard'
import { ChevronRight } from 'lucide-react'
import useFetch from '../../hook/useFetch'
const FeaturedBlogs = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { loading, error, data } = useFetch(`${apiUrl}/posts?categories=3&_embed`);


    if (loading) return <div className='loading'>Loading...</div>
    if (error) return <div className='error'>Error: {error}</div>
    if (!data) return <div className='error'>No data</div>

    const posts = data;
    const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

    const cleanExcerpt = (raw) => {
        // 1. Decode Unicode (like \u003C)
        const unicodeDecoded = raw.replace(/\\u[\dA-F]{4}/gi, match =>
            String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
        );

        // 2. Decode HTML entities (like &hellip;)
        const textarea = document.createElement('textarea');
        textarea.innerHTML = unicodeDecoded;
        const htmlDecoded = textarea.value;

        // 3. Strip HTML tags
        return htmlDecoded.replace(/<[^>]*>/g, '').trim();
    };

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
        <div className="section-padding featured-blogs">
            <h1>Najnovije</h1>
            <h3>Iz našeg bloga</h3>
            <div className="featured-blog-card-container">
                {sortedPosts.map((post) => {
                    // Check if wp:featuredmedia is available for the post
                    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;




                    // Strip HTML tags from excerpt
                    const excerpt = cleanExcerpt(post.excerpt.rendered.slice(0, 100) + "...");
                    const tags = post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [];
                    const date = new Date(post.date).toLocaleDateString('hr-HR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    const blogContent = cleanExcerpt(post.content.rendered);
                    const readingTime = calculateReadTime(blogContent);

                    return (
                        <FeaturedBlogsCard
                            key={post.id}
                            id={post.id}
                            title={post.title.rendered}
                            image={featuredImage}
                            date={date}
                            excerpt={excerpt}
                            tags={tags}
                            readTime={readingTime}
                        />
                    );
                })}
            </div>
            <a href="/blog"><button className='see-more'>Pogledajte više <ChevronRight size={18} /></button></a>
        </div >
    )
}

export default FeaturedBlogs