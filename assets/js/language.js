// Sanskaar ERP - Bilingual Localization Engine (English & Nepali)
window.SanskaarLanguage = (function() {
  let currentLang = localStorage.getItem('sanskaar_lang') || 'en';

  function init() {
    applyLanguage(currentLang);
  }

  function getLang() {
    return currentLang;
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'ne') return;
    currentLang = lang;
    localStorage.setItem('sanskaar_lang', lang);
    applyLanguage(lang);
    window.dispatchEvent(new CustomEvent('sanskaar:languageChanged', { detail: { lang } }));
  }

  function t(key, fallback = '') {
    const dict = window.SANSKAAR_TRANSLATIONS && window.SANSKAAR_TRANSLATIONS[currentLang];
    if (dict && dict[key] !== undefined) {
      return dict[key];
    }
    // Fallback to English if missing in Nepali
    if (window.SANSKAAR_TRANSLATIONS && window.SANSKAAR_TRANSLATIONS.en && window.SANSKAAR_TRANSLATIONS.en[key] !== undefined) {
      return window.SANSKAAR_TRANSLATIONS.en[key];
    }
    return fallback || key;
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        const translated = t(key);
        if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'search' || el.type === 'email')) {
          el.placeholder = translated;
        } else {
          el.textContent = translated;
        }
      }
    });

    // Update active button state in language switcher
    const btnEn = document.getElementById('btn-lang-en');
    const btnNe = document.getElementById('btn-lang-ne');
    if (btnEn && btnNe) {
      if (lang === 'en') {
        btnEn.className = 'px-2 py-0.5 rounded text-[11px] font-bold bg-[#E8752F] text-white shadow-2xs';
        btnNe.className = 'px-2 py-0.5 rounded text-[11px] font-semibold text-slate-500 hover:text-slate-900';
      } else {
        btnNe.className = 'px-2 py-0.5 rounded text-[11px] font-bold bg-[#E8752F] text-white shadow-2xs';
        btnEn.className = 'px-2 py-0.5 rounded text-[11px] font-semibold text-slate-500 hover:text-slate-900';
      }
    }
  }

  return {
    init,
    getLang,
    setLang,
    t,
    applyLanguage
  };
})();

// Auto-run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.SanskaarLanguage.init();
});
