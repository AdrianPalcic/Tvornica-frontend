import React from 'react'
import "../../css/Homepage.css/Homepage.css"
import Dropdown from './Dropdown'

const HeroSection = () => {
    return (
        <div className="hero-section">
            <h1>Uz Vas pri svakom koraku organizacije vjenčanja i ostalih svečanost</h1>
            <h4>Otkrijte inspiracije, savjete i trendove za vaše savršeno vjenčanje</h4>
            <Dropdown />
            <h4>Pogledajte naše najnovije članke o svemu što trebate znati za organizaciju savršenog vjenčanja.</h4>
        </div>
    )
}

export default HeroSection