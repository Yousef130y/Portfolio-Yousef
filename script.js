document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const savedLang = localStorage.getItem("lang") || urlParams.get("lng") || "en"; // Get language from localStorage, URL, or default to "en"

    document.getElementById("lang-selector").value = savedLang; // Set the dropdown value

    function changeLanguage(language) {
        // Update the URL without reloading the page
        const newUrl = window.location.pathname + `?lng=${language}`;
        window.history.pushState({}, "", newUrl);

        // Set language in localStorage
        localStorage.setItem("lang", language);

        // Set HTML lang and direction
        document.documentElement.lang = language;
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

        // Load translations from JSON file
        fetch(`locales/${language}.json`)
            .then(response => response.json())
            .then(translations => {
                document.querySelectorAll("[data-i18n]").forEach(element => {
                    const key = element.getAttribute("data-i18n");
                    if (translations[key]) {
                        element.textContent = translations[key];
                    }
                });
            })
            .catch(error => console.error("Error loading translations:", error));
    }

    // Load the selected language on page load
    changeLanguage(savedLang);

    // Listen for language selector changes
    document.getElementById("lang-selector").addEventListener("change", function () {
        changeLanguage(this.value);
    });
});
