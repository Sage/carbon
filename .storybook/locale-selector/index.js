import React from "react";

import I18nProvider from "../../src/components/i18n-provider";
import enGB from "../../src/locales/en-gb";

export const withLocaleSelector = (Story, context) => {
  const selectedLocale =
    [enGB].find(({ locale }) => locale() === context.globals.locale) || enGB;

  return (
    <I18nProvider locale={selectedLocale}>
      <Story {...context} />
    </I18nProvider>
  );
};
