import { ChevronRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const VjencanjaCard = ({ title, image, date, excerpt }) => {
    return (
        <div>
            <div className="vjencanja-card">
                <div className="vjencanja-card-top">
                    <img src={image} alt="Slika mlade" className="vjencanja-card-image" />
                    <div className="vjencanja-meta">
                        <h2>{title}</h2>
                        <p>{date}</p>
                    </div>
                </div>
                <div className="vjencanja-card-bottom">
                    <p>{excerpt}</p>
                </div>
                <div className="underline"></div>
                <Link to="/" className="vjencanja-card-button">Pročitaj cijelu priču <ChevronRight size={18} /></Link>
            </div>
        </div>
    )
}

export default VjencanjaCard