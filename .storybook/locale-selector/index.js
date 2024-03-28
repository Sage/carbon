import React from "react";

import I18nProvider from "../../src/components/i18n-provider";
import enGB from "../../src/locales/en-gb";
import esES from "../../src/locales/__internal__/es-es";

export const withLocaleSelector = (Story, context) => {
  const selectedLocale =
    [enGB, esES].find(({ locale }) => locale() === context.globals.locale) ||
    enGB;

  return (
    <I18nProvider locale={selectedLocale}>
      <Story {...context} />
    </I18nProvider>
  );
};
