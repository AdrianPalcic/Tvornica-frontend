import React from 'react'
import TransparentHeader from '../components/headers/TransparentHeader'
import Header from '../components/headers/Header'
import "../css/Homepage.css/Homepage.css"
import HeroSection from '../components/Homepage.components/HeroSection'
import FeaturedBlogs from '../components/Homepage.components/FeaturedBlogs'
import FeaturedBrands from '../components/Homepage.components/FeaturedBrands'
import AboutUsSection from '../components/Homepage.components/AboutUsSection'
import VjencanjaCTA from '../components/Homepage.components/VjencanjaCTA'
import VisitOnFacebook from '../components/Homepage.components/VisitOnFacebook'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <>
            <TransparentHeader />
            <HeroSection />
            <div className="home-container">
                <FeaturedBlogs />
                <VjencanjaCTA />
                <FeaturedBrands />
                <AboutUsSection />
                <VisitOnFacebook />
            </div>
            <Footer />
        </>
    )
}

export default Home