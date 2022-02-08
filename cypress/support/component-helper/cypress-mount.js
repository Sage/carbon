import * as React from "react";
import { mount as cypressMount } from "@cypress/react";
import CarbonProvider from "../../../src/components/carbon-provider/carbon-provider.component";
import I18nProvider from "../../../src/components/i18n-provider/i18n-provider.component";
import enGB from "../../../src/locales/en-gb";
import sageTheme from "../../../src/style/themes/sage/index";

const CypressMountWithProviders = (
  children,
  theme = sageTheme,
  locale = enGB
) => {
  return cypressMount(
    <CarbonProvider theme={theme}>
      <I18nProvider locale={locale}>{children}</I18nProvider>
    </CarbonProvider>
  );
};

export default CypressMountWithProviders;
