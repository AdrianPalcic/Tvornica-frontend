import React from 'react'

const VjencanjaCTA = () => {
    return (
        <div className="vjencanja-cta-container section-padding">
            <div className="vjencanja-cta-content">
                <h2>Priče sa vjenčanja</h2>
                <p>
                    Pogledajte priče mladih oduševljenih svojim vjenčanjima! Mnogi parovi s ponosom dijele kako su njihovi dani postali nezaboravni zahvaljujući ljubavi, pažljivo odabranim detaljima i posebnom ambijentu – bilo uz more, u vinogradu ili uz kreativne teme. </p>
                <a href='/vjencanja'><button>Pročitajte više</button></a>
            </div>
            <div className="vjencanja-cta-image">
                <img src="/isle-walk.png" alt="Slika mlade i njenog oca kako idu prema oltaru" loading="lazy" />
            </div>
        </div>
    )
}

export default VjencanjaCTA 