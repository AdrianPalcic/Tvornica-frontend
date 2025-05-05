import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react"
import { Link } from "react-router-dom"

function PonudeBlogCTA() {
    // Sample blog categories
    const categories = [
        { name: "Tutorials", count: 24, icon: BookOpen },
        { name: "Industry News", count: 18, icon: Tag },
        { name: "Case Studies", count: 12, icon: Clock },
    ]

    // Sample featured posts
    const featuredPosts = [
        {
            title: "10 Essential Tips for Modern Web Development",
            excerpt: "Learn the latest techniques and best practices for building modern web applications.",
            image: "/tvornica-naslovna.jpg",
            category: "Tutorials",
        },
        {
            title: "How AI is Transforming Digital Marketing",
            excerpt: "Discover how artificial intelligence is revolutionizing the way brands connect with customers.",
            image: "/tvornica-naslovna.jpg",
            category: "Industry News",
        },
    ]

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
                            {featuredPosts.map((post, index) => (
                                <div key={index} className="ponude-blog-cta-post-card">
                                    <div className="ponude-blog-cta-post-image-container">
                                        <img
                                            src={post.image || "/placeholder.svg"}
                                            alt={post.title}
                                            className="ponude-blog-cta-post-image"
                                        />
                                    </div>
                                    <div className="ponude-blog-cta-post-content">
                                        <div className="ponude-blog-cta-post-category">{post.category}</div>
                                        <h4 className="ponude-blog-cta-post-title">{post.title}</h4>
                                        <p className="ponude-blog-cta-post-excerpt">{post.excerpt}</p>
                                        <div className="ponude-blog-cta-post-link-container">
                                            <Link href="#" className="ponude-blog-cta-post-link">
                                                Pročitajte više
                                                <ArrowRight className="ponude-blog-cta-icon-small" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Categories and CTA */}
                    <div className="ponude-blog-cta-sidebar">
                        <div className="ponude-blog-cta-categories-container">
                            <h3 className="ponude-blog-cta-subtitle">Filtirajte po kategorijama</h3>
                            <div className="ponude-blog-cta-categories-list">
                                {categories.map((category, index) => (
                                    <Link key={index} href="#" className="ponude-blog-cta-category-item">
                                        <div className="ponude-blog-cta-category-name">
                                            <category.icon className="ponude-blog-cta-category-icon" />
                                            <span>{category.name}</span>
                                        </div>
                                        <span className="ponude-blog-cta-category-count">{category.count}</span>
                                    </Link>
                                ))}
                            </div>

                            <div className="ponude-blog-cta-newsletter">
                                <h4 className="ponude-blog-cta-newsletter-title">Nikada ne propustite novosti</h4>
                                <p className="ponude-blog-cta-newsletter-text">
                                    Pridružite se našoj facebook grupi
                                </p>
                                <Link href="#" className="ponude-blog-cta-button">
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