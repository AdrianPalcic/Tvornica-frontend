import React, { useState, useEffect } from "react";

const CookiePopup = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem("cookieAccepted");
        if (!accepted) {
            setShow(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieAccepted", "true");
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="cookie-popup">
            <div className="cookie-popup-content">
                <span>
                    Ova stranica koristi kolačiće za spremanje vaših korisničkih postavki.
                    Korištenjem stranice pristajete na upotrebu kolačića.
                </span>
                <button className="cookie-popup-btn" onClick={handleAccept}>
                    Prihvati
                </button>
            </div>
        </div>
    );
};

export default CookiePopup;