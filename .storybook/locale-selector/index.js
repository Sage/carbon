import React from "react";

import I18nProvider from "../../src/components/i18n-provider";
import enGB from "../../src/locales/en-gb";
import plPL from "../../src/locales/__internal__/pl-pl";

export const withLocaleSelector = (Story, context) => {
  const selectedLocale =
    [enGB, plPL].find(({ locale }) => locale() === context.globals.locale) ||
    enGB;

  return (
    <I18nProvider locale={selectedLocale}>
      <Story {...context} />
    </I18nProvider>
  );
};
