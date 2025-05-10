import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const RelatedBlogs = ({ image, excerpt, tag, date, readTime, title, id }) => {
    return (
        <article className="blog-card">
            <img
                src={image}
                alt="Wedding planning"
                className="blog-card__image"
            />
            <div className="blog-card__content">
                <div className="tag">{tag}</div>
                <h3 className="blog-card__title">{title}</h3>
                <div className="blog-card__meta">
                    <span className="blog-card__meta-item">
                        <CalendarDays size={16} />
                        {date}
                    </span>
                    <span className="blog-card__meta-item">
                        <Clock size={16} />
                        {readTime.text}
                    </span>
                </div>
                <p className="blog-card__excerpt">
                    {excerpt}
                </p>
                <Link to={`/blog/${id}`} className="blog-card__read-more">
                    Pročitajte više
                    <ArrowRight size={16} />
                </Link>
            </div>
        </article>
    )
}

export default RelatedBlogs