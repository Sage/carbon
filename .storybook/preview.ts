import withGlobalStyles from "./with-global-styles";
import { withThemeProvider, globalThemeProvider } from "./withThemeProvider";
import withLocaleSelector from "./with-locale-selector";
import withPortalProvider from "./with-portal-provider";
import sageStorybookTheme from "./sage-storybook-theme";

import "../src/style/fonts.css";
import isChromatic from "./isChromatic";
import { Preview } from "@storybook/react";

const customViewports = {
  xsm: { name: "Extra small", styles: { width: "320px", height: "900px" } },
  sm: { name: "Small", styles: { width: "640px", height: "900px" } },
  md: { name: "Medium", styles: { width: "768px", height: "900px" } },
  lg: { name: "Large", styles: { width: "1024px", height: "900px" } },
  xl: { name: "Extra large", styles: { width: "1280px", height: "900px" } },
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
