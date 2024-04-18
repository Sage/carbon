import React from "react";
import { beforeMount } from "@playwright/experimental-ct-react17/hooks";
// import GlobalStyle from "../src/style/global-style";
// import CarbonProvider from "../src/components/carbon-provider/carbon-provider.component";
// import I18nProvider from "../src/components/i18n-provider/i18n-provider.component";
// import { noTheme, sageTheme } from "../src/style/themes";
// import enGB from "../src/locales/en-gb";
import "../src/style/fonts.css";
import * as dateLocales from "../src/locales/date-fns-locales";

export type HooksConfig = {
  roundedCornersOptOut?: boolean;
  focusRedesignOptOut?: boolean;
  validationRedesignOptIn?: boolean;
  theme?: string;
  localeName?: keyof typeof dateLocales;
};

// Setup required providers on mounted component before running test. See https://playwright.dev/docs/test-components#hooks
beforeMount<HooksConfig>(async ({ App, hooksConfig }) => {
  return <App />;
});
