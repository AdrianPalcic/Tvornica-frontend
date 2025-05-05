import React from 'react'
import { Link } from 'react-router-dom'

const FeaturedBrandsCard = ({ title, image }) => {
    return (
        <Link to="/" className="featured-brands-card">
            <img src={image} alt="tvornica" />
            <p className='brand-name'>{title}</p>
        </Link>
    )
}

export default FeaturedBrandsCard