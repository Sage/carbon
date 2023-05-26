import withGlobalStyles from "./with-global-styles";
import { withLocaleSelector } from "./locale-selector";
import { withThemeProvider, globalThemeProvider } from "./withThemeProvider";
import { withPortalProvider } from "./with-portal-provider";
import { configureActions } from "@storybook/addon-actions";

import "../src/style/fonts.css";
import "./style/story-root.css";

// Temporary fix for issue mentioned in FE-2565 ticket
// Should be solved by the storybook team in foreseeable future
// https://github.com/storybookjs/storybook/issues/9948
// This usage is legacy (https://github.com/storybookjs/storybook/blob/master/addons/actions/ADVANCED.md)
// and will be removed in Storybook v7
configureActions({
  // Maximum depth of serialization for large objects
  depth: 6,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const customViewports = {
  extraSmall: {
    name: "Smart Phones",
    styles: {
      width: "320px",
      height: "599px",
    },
  },
  small: {
    name: "Portrait Tablets",
    styles: {
      width: "600px",
      height: "959px",
    },
  },
  medium: {
    name: "Landscape Tablets & Low-Res Laptops",
    styles: {
      width: "960px",
      height: "1259px",
    },
  },
  large: {
    name: "High-Res Laptops & Monitors",
    styles: {
      width: "1260px",
      height: "1920px",
    },
  },
  extraLarge: {
    name: "Ultra High-Res Monitors",
    styles: {
      width: "1921px",
      height: "2500px",
    },
  },
};

export const parameters = {
  layout: "fullscreen",
  a11y: {
    // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
    options: {
      runOnly: {
        type: "tag",
        values: [
          "wcag2a", // WCAG 2.0 & WCAG 2.1 Level A
          "wcag2aa", // WCAG 2.0 & WCAG 2.1 Level AA
          "wcag21a", // WCAG 2.1 Level A
          "wcag21aa", // WCAG 2.1 Level AA
          "best-practice", // Best practices endorsed by Deque
        ],
      },
    },
  },
  chromatic: { disableSnapshot: false },
  viewport: { viewports: customViewports },
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewMode: process.env.STORYBOOK_VIEW_MODE,
};

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    defaultValue: "en-GB",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en-GB", right: "🇬🇧", title: "English" },
        { value: "pl-PL", right: "🇵🇱", title: "Polski" },
      ],
    },
  },
  roundedCorners: {
    name: "Rounded Corners",
    description: "Toggle rounded corner opt out",
    defaultValue: "on",
    toolbar: {
      icon: "circlehollow",
      title: "Rounded corners",
      items: [
        { value: "on", title: "On" },
        { value: "off", title: "Off" },
      ],
    },
  },
  ...globalThemeProvider,
};

export const decorators = [
  withGlobalStyles,
  withThemeProvider,
  withLocaleSelector,
  withPortalProvider,
];
