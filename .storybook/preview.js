import React from "react";
import { addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withInfo } from "@storybook/addon-info";
import { withA11y } from "@storybook/addon-a11y";
import { addParameters } from "@storybook/react";
import { configureActions } from "@storybook/addon-actions";
import "./utils/i18n/en";
import setupI18n from "./utils/i18n/config";
import I18next from "./utils/I18next";
import "./style/story-root.scss";
import { withThemeSelector } from "./theme-selector";
import sageTheme from "./sageTheme";
import "../src/utils/css";
import isChromatic from "chromatic/isChromatic";

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

addParameters({
  options: {
    isFullscreen: false,
    panelPosition: "bottom",
    showNav: true,
    showPanel: true,
    theme: sageTheme,
    storySort: (a, b) => a[1].id.localeCompare(b[1].id),
  },
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
});

setupI18n();
addDecorator((storyFn) => <I18next>{storyFn()}</I18next>);

addDecorator(withKnobs);
if (!isChromatic()) {
  addDecorator(
    withInfo({
      header: false,
      inline: true,
    })
  );
}
addDecorator(withA11y);
addDecorator(withThemeSelector);
