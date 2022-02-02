import * as React from "react";
import { mount as cypressMount } from "@cypress/react";
import CarbonProvider from "../components/carbon-provider/carbon-provider.component";
import I18nProvider from "../components/i18n-provider/i18n-provider.component";
import enGB from "../locales/en-gb";
import sageTheme from "../style/themes/sage/index";

const CypressMountWithProviders = (children) => {
  return cypressMount(
    <CarbonProvider theme={sageTheme}>
      <I18nProvider locale={enGB}>{children}</I18nProvider>
    </CarbonProvider>
  );
};

export default CypressMountWithProviders;
