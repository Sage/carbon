import React from "react";
import type { ThemeObject } from "../../../src/style/themes/base";
import type Locale from "../../../src/locales";
import GlobalStyle from "../../../src/style/global-style";
import CarbonProvider from "../../../src/components/carbon-provider/carbon-provider.component";
import I18nProvider from "../../../src/components/i18n-provider/i18n-provider.component";
import enGB from "../../../src/locales/en-gb";
import sageTheme from "../../../src/style/themes/sage/index";
import "../../../src/style/fonts.css";

const CypressMountWithProviders = (
  children: React.ReactNode,
  theme: Partial<ThemeObject> = sageTheme,
  locale: Partial<Locale> = enGB
) => {
  return cy.mount(
    <CarbonProvider theme={theme}>
      <GlobalStyle />
      <I18nProvider locale={locale}>{children}</I18nProvider>
    </CarbonProvider>
  );
};

export default CypressMountWithProviders;
