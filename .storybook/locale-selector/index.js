import React from "react";

import I18nProvider from "../../src/components/i18n-provider";
import { enGB, deDE, enCA, enUS, esES, frCA, frFR } from "../../src/locales";

export const withLocaleSelector = (Story, context) => {
  const selectedLocale =
    [enGB, deDE, enCA, enUS, esES, frCA, frFR].find(
      ({ locale }) => locale() === context.globals.locale
    ) || enGB;

  return (
    <I18nProvider locale={selectedLocale}>
      <Story {...context} />
    </I18nProvider>
  );
};
