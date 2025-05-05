import { Calendar, ChevronRight, Tag } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const FeaturedBlogsCard = ({ title, image, excerpt, tags, date }) => {
    return (
        <Link to="/" className="featured-blog-card">
            <img src={image}></img>
            <div className="featured-blog-title">{title}</div>
            <div className="meta">
                <div className="featured-blog-category"> <Tag size={18} />{tags}</div>
                <div className="featured-blog-date"><Calendar size={18} /> {date}</div>
            </div>
            <div className="featured-blog-description">{excerpt}</div>
            <a href="/" className="read-more">Pročitaj više <ChevronRight size={18} /></a>
        </Link>
    )
}

export default FeaturedBlogsCard