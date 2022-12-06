import React from "react";
import GlobalStyle from "../../../src/style/global-style";
import CarbonProvider from "../../../src/components/carbon-provider/carbon-provider.component";
import I18nProvider from "../../../src/components/i18n-provider/i18n-provider.component";
import enGB from "../../../src/locales/en-gb";
import sageTheme from "../../../src/style/themes/sage/index";
import "../../../src/style/fonts.css";

const CypressMountWithProviders = (
  children,
  theme = sageTheme,
  locale = enGB
) => {
  return cy.mount(
    <CarbonProvider theme={theme}>
      <GlobalStyle />
      <I18nProvider locale={locale}>{children}</I18nProvider>
    </CarbonProvider>
  );
};

export default CypressMountWithProviders;
