import React from "react";
import { beforeMount } from "@playwright/experimental-ct-react17/hooks";
import GlobalStyle from "../src/style/global-style";
import CarbonProvider from "../src/components/carbon-provider/carbon-provider.component";
import I18nProvider from "../src/components/i18n-provider/i18n-provider.component";
import { sageTheme } from "../src/style/themes";
import enGB from "../src/locales/en-gb";
import "../src/style/fonts.css";

export type HooksConfig = {
  roundedCornersOptOut?: boolean;
  focusRedesignOptOut?: boolean;
};

// Setup required providers on mounted component before running test. See https://playwright.dev/docs/test-components#hooks
beforeMount<HooksConfig>(async ({ App, hooksConfig }) => {
  const { roundedCornersOptOut, focusRedesignOptOut } = hooksConfig || {};
  return (
    <CarbonProvider
      theme={sageTheme}
      roundedCornersOptOut={roundedCornersOptOut}
      focusRedesignOptOut={focusRedesignOptOut}
    >
      <GlobalStyle />
      <I18nProvider locale={enGB}>
        <App />
      </I18nProvider>
    </CarbonProvider>
  );
});
