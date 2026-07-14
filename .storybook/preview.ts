import { Preview } from "@storybook/react-vite";
import { configure } from "storybook/test";

import "../src/style/fonts.css";

import isChromatic from "./isChromatic";
import sageStorybookTheme from "./sage-storybook-theme";
import withGlobalStyles from "./with-global-styles";
import withLocaleSelector from "./with-locale-selector";
import { withThemeProvider, globalThemeProvider } from "./withThemeProvider";
import withReducedMotion from "./with-reduced-motion";
import withFusionTokens from "./with-fusion-tokens";

type DocgenProp = {
  tags?: {
    deprecated?: string;
  };
};

type DocgenComponent = {
  __docgenInfo?: {
    props?: Record<string, DocgenProp | undefined>;
  };
};

// Temporary workaround for Storybook docs not rendering JSDoc @deprecated tag text
// from extracted argTypes in this repo's current Storybook version line.
const deprecatedJsDocArgTypesEnhancer = ((context) => {
  const component = context.component as DocgenComponent | undefined;
  const docgenProps = component?.__docgenInfo?.props;

  if (!docgenProps) {
    return context.argTypes;
  }

  const nextArgTypes = Object.entries(context.argTypes).reduce(
    (acc, [argName, argType]) => {
      const deprecationMessage = docgenProps[argName]?.tags?.deprecated;

      if (!deprecationMessage) {
        acc[argName] = argType;
        return acc;
      }

      const normalizedMessage = deprecationMessage.trim();

      if (!normalizedMessage) {
        acc[argName] = argType;
        return acc;
      }

      const nextJsDocTags = {
        ...(argType.table?.jsDocTags as Record<string, unknown> | undefined),
        deprecated: normalizedMessage,
      };

      acc[argName] = {
        ...argType,
        table: {
          ...argType.table,
          jsDocTags: nextJsDocTags,
        },
      };

      return acc;
    },
    {} as typeof context.argTypes,
  );

  return nextArgTypes;
}) satisfies NonNullable<Preview["argTypesEnhancers"]>[number];

// Configure the testIdAttribute to look for data-role when querying elements using `getByTestId`.
configure({ testIdAttribute: "data-role" });

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
  viewport: { options: customViewports },
  viewMode: import.meta.env.STORYBOOK_VIEW_MODE,
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
        { value: "pt-PT", right: "🇵🇹", title: "Português - Portugal" },
      ],
    },
  },
  mode: {
    name: "Colour Mode",
    description: "Light or dark mode",
    defaultValue: "auto",
    toolbar: {
      title: "Colour Mode",
      icon: "circle",
      items: [
        { value: "light", title: "Light mode", icon: "sun" },
        { value: "dark", title: "Dark mode", icon: "moon" },
        {
          value: "auto",
          title: "Auto (system preference)",
          icon: "contrast",
        },
      ],
      showName: true,
    },
  },
  "override-tokens": {
    name: "Override tokens",
    description: "Apply custom token overrides",
    defaultValue: "off",
    toolbar: {
      title: "Override tokens",
      icon: "beaker",
      items: [
        { value: "on", title: "With overrides" },
          { value: "off", title: "Without overrides" },
      ],
    },
  },
  ...(globalThemeProvider as object),
} as Preview["globalTypes"];

const decorators = [
  withGlobalStyles,
  withThemeProvider,
  withLocaleSelector,
  withFusionTokens,
  withReducedMotion,
];

const loaders =
  // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
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
  argTypesEnhancers: [deprecatedJsDocArgTypesEnhancer],
  globalTypes,
  loaders,
};

export default preview;
