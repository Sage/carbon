import withGlobalStyles from "./with-global-styles";
import { withThemeProvider, globalThemeProvider } from "./withThemeProvider";
import withLocaleSelector from "./with-locale-selector";
import withPortalProvider from "./with-portal-provider";
import sageStorybookTheme from "./sage-storybook-theme";

import "../src/style/fonts.css";
import isChromatic from "./isChromatic";
import { Preview } from "@storybook/react";

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

const parameters = {
  docs: { canvas: { layout: "padded" }, theme: sageStorybookTheme },
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

const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    defaultValue: "en-GB",
    toolbar: {
      title: "Locale",
      icon: "globe",
      items: [
        { value: "en-GB", right: "🇬🇧", title: "English" },
        { value: "de-DE", right: "🇩🇪", title: "Deutsch" },
        { value: "en-CA", right: "🇨🇦", title: "English - Canada" },
        { value: "en-US", right: "🇺🇸", title: "English - United States" },
        { value: "es-ES", right: "🇪🇸", title: "Español" },
        { value: "fr-FR", right: "🇫🇷", title: "Français" },
        { value: "fr-CA", right: "🇨🇦", title: "Français - Canada" },
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
  focusRedesign: {
    name: "Double focus style",
    description: "Toggle the focus styling redesign",
    defaultValue: "on",
    toolbar: {
      icon: "eye",
      title: "Focus redesign",
      items: [
        { value: "on", title: "On" },
        { value: "off", title: "Off" },
      ],
    },
  },
  ...globalThemeProvider,
};

const decorators = [
  withGlobalStyles,
  withThemeProvider,
  withLocaleSelector,
  withPortalProvider,
];

const loaders =
  isChromatic() && document.fonts
    ? [
        // Wait for fonts to be ready before rendering the story
        async () => ({
          fonts: await document.fonts.ready,
        }),
      ]
    : [];

const preview: Preview = {
  parameters,
  decorators,
  globalTypes,
  loaders,
};

export default preview;
