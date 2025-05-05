import React from 'react'
import FeaturedBlogsCard from '../cards/FeaturedBlogsCard'
import { ChevronRight } from 'lucide-react'
import useFetch from '../../hook/useFetch'
const FeaturedBlogs = () => {
    const API_URL = import.meta.env.VITE_API_URL

    const { loading, error, data } = useFetch(`http://tvornica-backend.local//wp-json/wp/v2/posts?categories=3&_embed`)

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

    return (
        <div className="section-padding featured-blogs">
            <h1>Najnovije</h1>
            <h3>Iz našeg bloga</h3>
            <div className="featured-blog-card-container">
                {sortedPosts.map((post) => {
                    // Check if wp:featuredmedia is available for the post
                    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;




                    // Strip HTML tags from excerpt
                    const excerpt = cleanExcerpt(post.excerpt.rendered);
                    const tags = post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [];
                    const date = new Date(post.date).toLocaleDateString('hr-HR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    return (
                        <FeaturedBlogsCard
                            key={post.id}
                            title={post.title.rendered}
                            image={featuredImage}
                            date={date}
                            excerpt={excerpt}
                            tags={tags}
                        />
                    );
                })}
            </div>
            <button className='see-more'>Pogledajte više <ChevronRight size={18} /></button>
        </div>
    )
}

export default FeaturedBlogs