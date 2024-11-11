import React from "react";
import { beforeMount } from "@playwright/experimental-ct-react17/hooks";
import GlobalStyle from "../src/style/global-style";
import CarbonProvider from "../src/components/carbon-provider/carbon-provider.component";
import I18nProvider from "../src/components/i18n-provider/i18n-provider.component";
import { noTheme, sageTheme } from "../src/style/themes";
import enGB from "../src/locales/en-gb";
import "../src/style/fonts.css";
import * as dateLocales from "./support/date-fns-locales";

export type HooksConfig = {
  focusRedesignOptOut?: boolean;
  validationRedesignOptIn?: boolean;
  theme?: string;
  localeName?: keyof typeof dateLocales;
};

const computedLocale = (str: keyof typeof dateLocales) => {
  return {
    locale: () => str,
    date: {
      dateFnsLocale: () => dateLocales[str],
      ariaLabels: {
        previousMonthButton: () => "Previous month",
        nextMonthButton: () => "Next month",
      },
    },
  };
};

const mountedTheme = (theme: string) => {
  switch (theme) {
    case "sage":
      return sageTheme;
    case "noMountedTheme":
      return noTheme;
    default:
      return sageTheme;
  }
};

// Setup required providers on mounted component before running test. See https://playwright.dev/docs/test-components#hooks
beforeMount<HooksConfig>(async ({ App, hooksConfig }) => {
  const {
    focusRedesignOptOut,
    theme = "sage",
    localeName,
    validationRedesignOptIn,
  } = hooksConfig || {};
  return (
    <CarbonProvider
      theme={mountedTheme(theme)}
      focusRedesignOptOut={focusRedesignOptOut}
      validationRedesignOptIn={validationRedesignOptIn}
    >
      <GlobalStyle />
      <I18nProvider locale={localeName ? computedLocale(localeName) : enGB}>
        <App />
      </I18nProvider>
    </CarbonProvider>
  );
});
