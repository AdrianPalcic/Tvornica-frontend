import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="logo">
                    <img src="/logo (2).png" alt="Logo" />
                    <h1>Tvornica Vjenčanja</h1>
                    <p>Otkrijte inspiracije, savjete i trendove za vaše savršeno vjenčanje</p>
                </div>
                <div className="footer-links">
                    <h2>Blog</h2>
                    <ul>
                        <li><a href="#">O nama</a></li>
                        <li><a href="#">Kontakt</a></li>
                        <li><a href="#">Usluge</a></li>
                        <li><a href="#">Cjenik</a></li>
                    </ul>
                </div>
                <div className="footer-links">
                    <h2>Ponude</h2>
                    <ul>
                        <li><a href="#">O nama</a></li>
                        <li><a href="#">Kontakt</a></li>
                        <li><a href="#">Usluge</a></li>
                        <li><a href="#">Cjenik</a></li>
                    </ul>
                </div>
                <div className="footer-links footer-links-last">
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 Tvornica Vjenčanja. Sva prava pridržana.</p>
            </div>

        </footer>
    )
}

export default Footer