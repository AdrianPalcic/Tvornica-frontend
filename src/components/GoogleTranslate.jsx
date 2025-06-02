import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";

// Utility function: removes the Google Translate banner and top offset
function nukeGoogleBanner() {
    // Remove the banner iframe and its parent, if exists
    const bannerFrame = document.querySelector('iframe.goog-te-banner-frame');
    if (bannerFrame) {
        if (bannerFrame.parentNode) bannerFrame.parentNode.remove();
        else bannerFrame.remove();
    }
    // Remove any weird top offset on the body
    document.body.style.top = "0px";
    // Remove elements with ids containing 'goog-' (extra cleanup)
    document.querySelectorAll('[id*="goog-"]').forEach(el => {
        el.style.display = 'none';
    });
}

const LanguageSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [language, setLanguage] = useState("hr"); // Default to Croatian

    useEffect(() => {
        // Load Google Translate script if not already loaded
        if (!document.querySelector("#google-translate-script")) {
            const script = document.createElement("script");
            script.id = "google-translate-script";
            script.src =
                "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        }

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                { pageLanguage: "hr", autoDisplay: false },
                "google_translate_element"
            );

            // Try nuking the banner every 200ms for 4 seconds on init
            let tries = 0;
            const interval = setInterval(() => {
                nukeGoogleBanner();
                tries++;
                if (tries > 20) clearInterval(interval);
            }, 200);
        };

        // Retrieve stored language preference
        const savedLanguage = Cookies.get("language");
        if (savedLanguage) {
            setLanguage(savedLanguage);
            setTimeout(() => changeLanguage(savedLanguage), 500); // Apply stored language
        }

        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Whenever the language is changed, nuke the banner for a few seconds
    const changeLanguage = (lang) => {
        const select = document.querySelector(".goog-te-combo");
        if (select) {
            select.value = lang;
            select.dispatchEvent(new Event("change"));
        }
        Cookies.set("language", lang, { expires: 30 }); // Save language for 30 days
        setLanguage(lang);
        setIsOpen(false);

        // Nuke banner after language change
        let tries = 0;
        const interval = setInterval(() => {
            nukeGoogleBanner();
            tries++;
            if (tries > 20) clearInterval(interval);
        }, 200);
    };

    const resetTranslation = () => {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        Cookies.remove("language");
        setLanguage("hr");
        window.location.reload();
        setIsOpen(false);
    };

    return (
        <div className="language-selector" ref={dropdownRef}>
            <button className="language-dropdown-button" onClick={e => { e.stopPropagation(); setIsOpen(prev => !prev); }}>
                {language.toUpperCase()} ▼
            </button>

            {/* Dropdown menu */}
            <div className={`language-dropdown-menu ${isOpen ? "" : "hidden"}`}>
                <button onClick={() => changeLanguage("en")}>Engleski</button>
                <button onClick={() => changeLanguage("de")}>Njemački</button>
                <button onClick={resetTranslation}>🔄 Hrvatski</button>
            </div>

            {/* Hidden Google Translate element */}
            <div id="google_translate_element" style={{ display: "none" }}></div>
        </div>
    );
};

export default LanguageSelector;
