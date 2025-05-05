import React from 'react';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';

const PurpleCTA = () => {
    return (
        <section className="vjencanja-page-cta">
            <div className="vjencanja-page-cta__container">
                <div className="vjencanja-page-cta__card">
                    {/* Decorative elements */}
                    <div className="vjencanja-page-cta__decorative vjencanja-page-cta__decorative--top"></div>
                    <div className="vjencanja-page-cta__decorative vjencanja-page-cta__decorative--bottom"></div>

                    {/* Accent line */}
                    <div className="vjencanja-page-cta__accent-line"></div>

                    <div className="vjencanja-page-cta__content">


                        <h2 className="vjencanja-page-cta__heading">
                            Treba vam inspiracija za vjenčanje? <br /> <span className="vjencanja-page-cta__highlight">Pogledajte naše priče!</span>
                        </h2>

                        <p className="vjencanja-page-cta__description">
                            Pregledajte brojne blogove i iskustva mladenaca koji su koristili naše usluge. <br /> <span className="vjencanja-page-cta__highlight">Inspirirajte se i pronađite savršene vjenčane prodavače!</span>
                        </p>

                        <div className="vjencanja-page-cta__buttons">
                            <a
                                href="7blog"
                                className="vjencanja-page-cta__button vjencanja-page-cta__button--primary"
                            >
                                Blog
                                <ChevronRight className="vjencanja-page-cta__button-icon" />
                            </a>
                            <a
                                href="/ponude"
                                className="vjencanja-page-cta__button vjencanja-page-cta__button--secondary"
                            >
                                Ponude
                                <ChevronRight className="vjencanja-page-cta__button-icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PurpleCTA;