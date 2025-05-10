import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import TransparentHeader from "../components/headers/TransparentHeader";
import AboutFullSection from "../components/Onama.components/AboutFullSection";
import ContactForm from "../components/Onama.components/ContactForm";
import StoNudimo from "../components/Onama.components/StoNudimo";
import "../css/OnamaPage.css/Onama.css";
import { useEffect } from "react";

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