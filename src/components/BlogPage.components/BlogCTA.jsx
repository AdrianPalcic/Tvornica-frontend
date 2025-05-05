import { ChevronRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const BlogCTA = () => {
    return (
        <div className="vjencanja-blog-cta">
            <h2>Zanima vas jos?</h2>
            <p>Pogledajte što mlade kažu o svojim vjenčanjima</p>
            <Link to="/vjencanja" className="cta">Vjenčanja <ChevronRight size={18} /></Link>
        </div>
    )
}

export default BlogCTA