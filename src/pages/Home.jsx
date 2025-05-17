import TransparentHeader from '../components/headers/TransparentHeader'
import "../css/Homepage.css/Homepage.css"
import HeroSection from '../components/Homepage.components/HeroSection'
import FeaturedBlogs from '../components/Homepage.components/FeaturedBlogs'
import FeaturedBrands from '../components/Homepage.components/FeaturedBrands'
import AboutUsSection from '../components/Homepage.components/AboutUsSection'
import VjencanjaCTA from '../components/Homepage.components/VjencanjaCTA'
import VisitOnFacebook from '../components/Homepage.components/VisitOnFacebook'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Tvornica Vjenčanja | Inspiracije, Savjeti i Ponude za Vjenčanja</title>
                <meta name="description" content="Otkrijte sve za savršeno vjenčanje – od najnovijih blogova i ponuda, do inspiracije i savjeta za organizaciju. Pratite nas za više!" />
                <meta name="keywords" content="vjenčanja, organizacija vjenčanja, savjeti za mladence, blog o vjenčanjima, ponude za vjenčanja" />
                <meta property="og:title" content="Tvornica Vjenčanja | Inspiracije, Savjeti i Ponude za Vjenčanja" />
                <meta property="og:description" content="Otkrijte sve za savršeno vjenčanje – od najnovijih blogova i ponuda, do inspiracije i savjeta za organizaciju." />
                <meta property="og:url" content="https://tvornicavjencanja.hr" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://tvornicavjencanja.hr/wp/wp-content/uploads/2025/05/bride-hero-1024x685.jpg" />
                <link rel="canonical" href="https://tvornicavjencanja.hr" />
            </Helmet>

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