import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Pen } from 'lucide-react'

const BlogCard = ({ title, image, date, tags, excerpt, readTime, id }) => {


    return (
        <Link to={`/blog/${id}`} className="blog-card">
            <img src={image} alt="Blog Post" className="blog-image" />
            <div className="blog-content">
                <div className="blog-cat-label">{tags}</div>
                <h2 className="blog-title">{title}</h2>
                <p className="blog-description">{excerpt}</p>
                <div className="meta-tags">
                    <div className="meta-tag"><Calendar size={18} /> {date}</div>
                    <div className="meta-tag"><Clock size={18} /> {readTime} </div>
                </div>
                <button className="read-more-button">Pročitaj više</button>
            </div>
        </Link>
    )
}

export default BlogCard