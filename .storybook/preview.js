import { withKnobs } from "@storybook/addon-knobs";
import withGlobalStyles from "./with-global-styles";
import setupI18n from "./utils/i18n/config";
import { withThemeSelector } from "./theme-selector";
import { configureActions } from "@storybook/addon-actions";
import sageTheme from "./sageTheme";
import "./style/fonts.css";
import "./style/story-root.css";

// Temporary fix for issue mentioned in FE-2565 ticket
// Should be solved by the storybook team in foreseeable future
// https://github.com/storybookjs/storybook/issues/9948
configureActions({
  // Maximum depth of serialization for large objects
  depth: 4,
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
  docs: {
    theme: sageTheme,
  },
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
  chromatic: { disable: false },
  viewport: { viewports: customViewports },
};

setupI18n();

export const decorators = [withKnobs, withGlobalStyles, withThemeSelector];
