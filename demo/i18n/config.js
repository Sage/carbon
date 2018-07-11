import I18n from 'i18n-js';

const setupI18n = () => {
  I18n.fallbacks = true; // Show english if the translation does not exist
  const match = window.location.href.match(/locale=(.[^&]*)/);
  const locale = match ? match[1] : 'en';
  I18n.locale = locale; // Allow testing locales e.g. http://localhost:8080/components/date-input?locale=fr
};

export default setupI18n;
