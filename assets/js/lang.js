const translations = {
  en: {
    title: "Welcome to Digital Gallery",
    subtitle: "Experience the history of the Legislative Assembly",
    rules: "Rules & Guidelines"
  },
  as: {
    title: "ডিজিটেল গ্যালাৰীত স্বাগতম",
    subtitle: "বিধানসভাৰ ইতিহাসৰ অভিজ্ঞতা লাভ কৰক",
    rules: "নিয়ম আৰু নিৰ্দেশনা"
  }
};

const toggle = document.getElementById("languageToggle");
const elements = document.querySelectorAll("[data-key]");

// Load saved language
const savedLang = localStorage.getItem("lang") || "en";
setLanguage(savedLang);
toggle.checked = savedLang === "as";

// Toggle event
toggle.addEventListener("change", () => {
  const lang = toggle.checked ? "as" : "en";
  setLanguage(lang);
  localStorage.setItem("lang", lang);
});

function setLanguage(lang) {
  elements.forEach(el => {
    const key = el.getAttribute("data-key");
    if (translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });
}
