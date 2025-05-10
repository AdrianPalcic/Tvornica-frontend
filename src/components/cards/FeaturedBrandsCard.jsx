import React from 'react'
import { Link } from 'react-router-dom'

const FeaturedBrandsCard = ({ title, image, id }) => {
    return (
        <Link to={`/ponude/${id}`} className="featured-brands-card">
            <img src={image} alt="tvornica" />
            <p className='brand-name'>{title}</p>
        </Link>
    )
}

export default FeaturedBrandsCard