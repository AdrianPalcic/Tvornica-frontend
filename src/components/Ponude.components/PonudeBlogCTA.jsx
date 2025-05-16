import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import useFetch from "../../hook/useFetch";
import { useMemo } from "react";

function PonudeBlogCTA() {

    const apiUrl = import.meta.env.VITE_API_URL;
    const { loading, error, data } = useFetch(`${apiUrl}/posts?categories=3&_embed`);
    const navigate = useNavigate();



    const sortedBlogs = useMemo(() => {
        if (!data) return [];
        return [...data].sort((a, b) => {
            new Date(b.date) - new Date(a.date);
        })
    }, [data]);


    const getBlogTags = () => {
        const tags = [];

        sortedBlogs.forEach((blog) => {
            const blogTags = blog._embedded?.['wp:term']?.[1] || [];
            blogTags.forEach((tag) => {
                if (!tags.some(t => t.id === tag.id)) {
                    tags.push(tag);
                }
            })
        })

        return tags.slice(0, 3);
    }

    const blogTags = getBlogTags();

    const cleanExcerpt = (raw) => {
        const unicodeDecoded = raw.replace(/\\u[\dA-F]{4}/gi, match =>
            String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
        );
        const textarea = document.createElement('textarea');
        textarea.innerHTML = unicodeDecoded;
        const htmlDecoded = textarea.value;
        return htmlDecoded.replace(/<[^>]*>/g, '').trim();
    };

    const handleNavigate = (tagName) => {
        navigate('/blog', {
            state: { preselectedCategory: tagName }
        });
    }






    return (
        <section className="ponude-blog-cta-section">
            <div className="ponude-blog-cta-container">
                <div className="ponude-blog-cta-header">
                    <h2 className="ponude-blog-cta-title">
                        Pročitajte naše najnovije <span className="ponude-blog-cta-highlight">Blogove</span>
                    </h2>
                    <p className="ponude-blog-cta-description">
                        Uzmite inspiraciju iz naših članaka i vodiča. Bilo da ste u potrazi za savjetima ili najnovijim vijestima iz industrije, imamo nešto za svakoga.
                    </p>
                </div>

                <div className="ponude-blog-cta-grid">
                    {/* Featured Posts */}
                    <div className="ponude-blog-cta-featured">
                        <h3 className="ponude-blog-cta-subtitle">Istaknuti članci</h3>
                        <div className="ponude-blog-cta-posts-grid">
                            {sortedBlogs.slice(0, 2).map((post, index) => {

                                const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                                const excerpt = cleanExcerpt(post.excerpt.rendered);
                                const tags = post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [];
                                const date = new Date(post.date).toLocaleDateString('hr-HR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                });

                                return (

                                    <div key={index} className="ponude-blog-cta-post-card">
                                        <div className="ponude-blog-cta-post-image-container">
                                            <img
                                                src={featuredImage || "/placeholder.svg"}
                                                alt={post.title.rendered}
                                                className="ponude-blog-cta-post-image"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="ponude-blog-cta-post-content">
                                            <div className="ponude-blog-cta-post-category">{tags}</div>
                                            <h4 className="ponude-blog-cta-post-title">{post.title.rendered}</h4>
                                            <p className="ponude-blog-cta-post-excerpt">{excerpt}</p>
                                            <div className="ponude-blog-cta-post-link-container">
                                                <Link to={`/blog/${post.id}`} className="ponude-blog-cta-post-link">
                                                    Pročitajte više
                                                    <ArrowRight className="ponude-blog-cta-icon-small" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )

                            })}
                        </div>
                    </div>

                    {/* Categories and CTA */}
                    <div className="ponude-blog-cta-sidebar">
                        <div className="ponude-blog-cta-categories-container">
                            <h3 className="ponude-blog-cta-subtitle">Filtirajte po kategorijama</h3>
                            <div className="ponude-blog-cta-categories-list">
                                {blogTags.map((tag, index) => (
                                    <div key={index} onClick={() => handleNavigate(tag.name)} className="ponude-blog-cta-category-item">
                                        <div className="ponude-blog-cta-category-name">
                                            <span>{tag.name}</span>
                                        </div>
                                        <span className="ponude-blog-cta-category-count">{tag.count}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="ponude-blog-cta-newsletter">
                                <h4 className="ponude-blog-cta-newsletter-title">Nikada ne propustite novosti</h4>
                                <p className="ponude-blog-cta-newsletter-text">
                                    Pridružite se našoj facebook grupi
                                </p>
                                <Link href="/blog" className="ponude-blog-cta-button">
                                    Pregledajte sve blogove
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PonudeBlogCTA        