(function () {
  const translations = {
    en: {
      // Nav
      "nav.home": "Home",
      "nav.about": "About Us",
      "nav.services": "Services",
      "nav.news": "News",
      "nav.contact": "Contact",
      "nav.gallery": "Gallery",
      "nav.donate": "Donate",

      // Home
      "home.title": "Welcome to Fanos Lehulu Charity Organization",

      // Contact
      "contact.title": "Contact Us",
      "contact.header": "Send us a Message",
      "contact.name": "Name *",
      "contact.email": "Email *",
      "contact.subject": "Subject",
      "contact.message": "Message *",
      "contact.send": "Send Message",

      // Donate
      "donate.title": "Support Our Cause",
      "donate.section_info": "Make a Donation",
      "donate.bank_accounts": "Bank Accounts",
      "donate.header": "Donate and Attach Bank Statement",
      "donate.full_name": "Full Name *",
      "donate.email": "Email *",
      "donate.amount": "Amount (ETB) *",
      "donate.method": "Donation Method *",
      "donate.attachment": "Bank Statement Attachment (PDF/JPG/PNG) *",
      "donate.cancel": "Cancel",
      "donate.no_file": "No file selected",
      "donate.privacy": "Max 5MB. We keep your information private.",
      "donate.submit": "Submit Donation"
    },
    am: {
      // Nav
      "nav.home": "መነሻ",
      "nav.about": "ስለ እኛ",
      "nav.services": "አገልግሎቶች",
      "nav.news": "ዜና",
      "nav.contact": "አግኙን",
      "nav.gallery": "ማስታወሻ",
      "nav.donate": "መዋጮ",

      // Home
      "home.title": "ወደ ፋኖስ ለሁሉ የበጎ አድራጎት ድርጅት እንኳን በደህና መጡ",

      // Contact
      "contact.title": "አግኙን",
      "contact.header": "መልዕክት ይላኩልን",
      "contact.name": "ስም *",
      "contact.email": "ኢሜይል *",
      "contact.subject": "ርዕስ",
      "contact.message": "መልዕክት *",
      "contact.send": "መልዕክት ላክ",

      // Donate
      "donate.title": "ለጉዳያችን ድጋፍ ያድርጉ",
      "donate.section_info": "መዋጮ ፈጽሙ",
      "donate.bank_accounts": "የባንክ ሂሳቦች",
      "donate.header": "መዋጮ አድርጉ እና የባንክ መግለጫ አባሪ አያዩ",
      "donate.full_name": "ሙሉ ስም *",
      "donate.email": "ኢሜይል *",
      "donate.amount": "መጠን (ብር) *",
      "donate.method": "የመዋጮ ዘዴ *",
      "donate.attachment": "የባንክ መግለጫ አባሪ (PDF/JPG/PNG) *",
      "donate.cancel": "ሰርዝ",
      "donate.no_file": "ምንም ፋይል አልተመረጠም",
      "donate.privacy": "ከ5MB በታች፣ መረጃዎን በግል እናያዝ",
      "donate.submit": "መዋጮ ላክ"
    }
  };

  const html = document.documentElement;
  const LS_KEY = 'site_lang';

  function applyLang(lang) {
    const dict = translations[lang] || translations.en;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // placeholders (if used)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });

    html.setAttribute('lang', lang);
    try { localStorage.setItem(LS_KEY, lang); } catch {}
  }

  function init() {
    const select = document.getElementById('lang-switcher');
    // Determine initial
    let initial = 'en';
    try {
      initial = localStorage.getItem(LS_KEY) || html.getAttribute('lang') || 'en';
    } catch {}

    if (select) select.value = initial;
    applyLang(initial);

    if (select) {
      select.addEventListener('change', function () {
        applyLang(select.value);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
