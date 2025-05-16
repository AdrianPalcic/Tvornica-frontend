import React from 'react'
import { Link } from 'react-router-dom'

const PonudeCard = ({ title, image, id }) => {
    return (
        <Link to={`/ponude/${id}`} class="ponude-card__item">
            <img src={image} alt="Venue image" class="ponude-card__image" loading='lazy' />
            <p class="ponude-card__name">{title}</p>
        </Link>
    )
}

export default PonudeCard