import { useEffect } from "react";

function useNukeGoogleTranslateBar() {
    useEffect(() => {
        // Function to nuke all Google Translate stuff
        const removeGoogleTranslateElements = () => {
            // Remove classic Google Translate elements
            const skipTranslate = document.querySelector(".skiptranslate");
            if (skipTranslate) skipTranslate.style.display = "none";

            const googleFrame = document.querySelector("iframe.goog-te-banner-frame");
            if (googleFrame) googleFrame.style.display = "none";

            const googleWidget = document.querySelector(".goog-te-gadget");
            if (googleWidget) googleWidget.style.display = "none";

            document.documentElement.classList.remove("translated-ltr", "translated-rtl");

            // Remove any top-level Google Translate table
            document.querySelectorAll('table').forEach(table => {
                const hasGoogleLogo = !!table.querySelector('img[alt="Google Translate"]');
                const hasGoogleClass = table.className && table.className.includes('VIpgJd-ZVi9od-ORHb');
                if (hasGoogleLogo || hasGoogleClass) {
                    table.remove();
                }
            });

            // Clean up body style
            document.body.style.backgroundImage = "none";
            document.body.style.top = "0px";
        };

        // Timed removal: every 300ms for 5 seconds
        let tries = 0;
        const interval = setInterval(() => {
            removeGoogleTranslateElements();
            tries++;
            if (tries > 16) clearInterval(interval); // ~5 seconds
        }, 300);

        // Mutation observer for any future insertions
        const observer = new MutationObserver(removeGoogleTranslateElements);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            clearInterval(interval);
            observer.disconnect();
        };
    }, []);
}

export default useNukeGoogleTranslateBar;
