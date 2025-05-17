import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import TransparentHeader from "../components/headers/TransparentHeader";
import AboutFullSection from "../components/Onama.components/AboutFullSection";
import ContactForm from "../components/Onama.components/ContactForm";
import StoNudimo from "../components/Onama.components/StoNudimo";
import "../css/OnamaPage.css/Onama.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const About = () => {

    const location = useLocation();

    useEffect(() => {
        if (location.hash === '#contact') {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                // Small timeout to ensure DOM is ready
                setTimeout(() => {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    return (
        <>
            <Helmet>
                <title>O Nama | Tvornica Vjenčanja - Vaš vodič za savršeno vjenčanje</title>
                <meta
                    name="description"
                    content="Saznajte tko stoji iza Tvornice Vjenčanja. Naša strast je pomoći vam da ostvarite vjenčanje iz snova — uz stručne savjete, inspiraciju i podršku na svakom koraku."
                />
                <meta
                    name="keywords"
                    content="o nama, organizacija vjenčanja, planiranje vjenčanja, tvornica vjenčanja, savjeti za vjenčanja, kontakt vjenčanja"
                />
                <meta property="og:title" content="O Nama | Tvornica Vjenčanja" />
                <meta
                    property="og:description"
                    content="Upoznajte tim iza Tvornice Vjenčanja i saznajte kako vam možemo pomoći organizirati savršeno vjenčanje."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tvornicavjencanja.hr/about" />
                <meta property="og:image" content="https://tvornicavjencanja.hr/wp/wp-content/uploads/2025/05/bride-hero-1024x685.jpg" />
                <link rel="canonical" href="https://tvornicavjencanja.hr/about" />
            </Helmet>

            <TransparentHeader />
            <div className="onama-hero">
                <h1>Vaš vodič do <span>Savršenog</span> Vjenčanja</h1>
                <h2>Savjeti, Trendovi i Inspiracija za Vaš Poseban Dan</h2>
            </div>
            <div className="onama-container">
                <AboutFullSection />
                <StoNudimo />
                <ContactForm />
            </div>
            <Footer />
        </>
    )
}

export default About