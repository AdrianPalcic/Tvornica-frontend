import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";

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

            // Remove Google Translate banner
            setTimeout(() => {
                document.querySelector(".goog-te-banner-frame")?.remove();
                document.body.style.top = "0px";
            }, 500);
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

    const toggleDropdown = (event) => {
        event.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    const changeLanguage = (lang) => {
        const select = document.querySelector(".goog-te-combo");
        if (select) {
            select.value = lang;
            select.dispatchEvent(new Event("change"));
        }
        Cookies.set("language", lang, { expires: 30 }); // Save language for 30 days
        setLanguage(lang);
        setIsOpen(false);
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
            <button className="language-dropdown-button" onClick={toggleDropdown}>
                {language.toUpperCase()} ▼
            </button>

            {/* Dropdown menu */}
            <div className={`language-dropdown-menu ${isOpen ? "" : "hidden"}`}>
                <button onClick={() => changeLanguage("en")}>Engleski</button>
                <button onClick={() => changeLanguage("de")}>Njemački</button>
                <button onClick={resetTranslation}>🔄 Hrvatski</button>
            </div>

            {/* Hidden Google Translate */}
            <div id="google_translate_element" style={{ display: "none" }}></div>
        </div>
    );
};

export default LanguageSelector;
