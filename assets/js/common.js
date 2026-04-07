document.addEventListener("DOMContentLoaded", () => {
  const langEnBtn = document.getElementById("langEn");
  const langAsBtn = document.getElementById("langAs");

  // Detect saved language or default EN
  const savedLang = localStorage.getItem("lang") || "en";
  applyLanguage(savedLang);

  langEnBtn.addEventListener("click", () => {
    applyLanguage("en");
  });

  langAsBtn.addEventListener("click", () => {
    applyLanguage("as");
  });

  function applyLanguage(lang) {
    localStorage.setItem("lang", lang);

    // Toggle active button
    langEnBtn.classList.toggle("active", lang === "en");
    langAsBtn.classList.toggle("active", lang === "as");

    // Elements with data-en / data-as
    document.querySelectorAll("[data-en]").forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Input placeholders
    document.querySelectorAll("input[placeholder]").forEach(input => {
      const en = input.getAttribute("data-en");
      const as = input.getAttribute("data-as");
      if (en && as) {
        input.placeholder = lang === "en" ? en : as;
      }
    });

    // Select options
    document.querySelectorAll("select option").forEach(option => {
      const en = option.getAttribute("data-en");
      const as = option.getAttribute("data-as");
      if (en && as) {
        option.textContent = lang === "en" ? en : as;
      }
    });

    // Legends
    document.querySelectorAll("legend[data-en]").forEach(legend => {
      legend.textContent = legend.getAttribute(`data-${lang}`);
    });
  }
});
