import I18n from 'i18n-js';

export default (errorCount, warningCount) => {
  let translations = {
    'en': {
      errors:              errorCount   > 1 ? `There are ${ errorCount } errors`     : `There is ${ errorCount } error`,
      warnings:            warningCount > 1 ? `There are ${ warningCount } warnings` : `There is ${ warningCount } warning`,
      errors_and_warnings: warningCount > 1 ? `and ${ warningCount } warnings`       : `and ${ warningCount } warning`
    },
    default: {
      errors:              errorCount   > 1 ? `There are ${ errorCount } errors`     : `There is ${ errorCount } error`,
      warnings:            warningCount > 1 ? `There are ${ warningCount } warnings` : `There is ${ warningCount } warning`,
      errors_and_warnings: warningCount > 1 ? `and ${ warningCount } warnings`       : `and ${ warningCount } warning`
    }
  };

  let key = (typeof translations[I18n.locale] === 'undefined') ? 'default' : I18n.locale;

  return translations[key];
};
