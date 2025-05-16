import { ChevronRight, Clock, Tag } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const FeaturedBlogsCard = ({ title, image, excerpt, tags, date, id, readTime }) => {
    return (
        <Link to={`/blog/${id}`} className="featured-blog-card">
            <img loading="lazy" src={image}></img>
            <div className="featured-blog-title">{title}</div>
            <div className="meta">
                <div className="featured-blog-category"> <Tag size={18} />{tags}</div>
                <div className="featured-blog-date"><Clock size={18} /> {readTime.text}</div>
            </div>
            <div className="featured-blog-description">{excerpt}</div>
            <a href="/" className="read-more">Pročitaj više <ChevronRight size={18} /></a>
        </Link>
    )
}

export default FeaturedBlogsCard