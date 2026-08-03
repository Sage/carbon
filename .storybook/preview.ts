import { Preview } from "@storybook/react-vite";
import { parameters as defaultArgTypesParameters } from "@storybook/react/entry-preview-argtypes";
import type { StrictArgTypes } from "storybook/internal/types";
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
// Applied to both the main story's argTypes (via argTypesEnhancers) and each
// subcomponent's argTypes (via a docs.extractArgTypes wrapper below) so the
// "Deprecation Warning" chip appears in every ArgTypes tab.
const applyDeprecatedJsDocTags = <T extends Record<string, unknown>>(
  component: unknown,
  argTypes: T,
): T => {
  const docgenProps = (component as DocgenComponent | undefined)?.__docgenInfo
    ?.props;

  if (!docgenProps || !argTypes) {
    return argTypes;
  }

  return Object.entries(argTypes).reduce((acc, [argName, argType]) => {
    const deprecationMessage = docgenProps[argName]?.tags?.deprecated?.trim();

    if (!deprecationMessage) {
      (acc as Record<string, unknown>)[argName] = argType;
      return acc;
    }

    const typedArgType = argType as {
      table?: { jsDocTags?: Record<string, unknown> } & Record<string, unknown>;
    };

    (acc as Record<string, unknown>)[argName] = {
      ...typedArgType,
      table: {
        ...typedArgType.table,
        jsDocTags: {
          ...typedArgType.table?.jsDocTags,
          deprecated: deprecationMessage,
        },
      },
    };

    return acc;
  }, {} as T);
};

const deprecatedJsDocArgTypesEnhancer = ((context) =>
  applyDeprecatedJsDocTags(
    context.component,
    context.argTypes,
  )) satisfies NonNullable<Preview["argTypesEnhancers"]>[number];

// Storybook's ArgTypes docs block extracts subcomponent argTypes directly via
// `parameters.docs.extractArgTypes(component)` and bypasses argTypesEnhancers,
// so wrap the framework default to reapply the deprecation shim for subcomponents.
type ExtractArgTypes = (component: unknown) => StrictArgTypes | null;
const defaultExtractArgTypes = (
  defaultArgTypesParameters as { docs?: { extractArgTypes?: ExtractArgTypes } }
).docs?.extractArgTypes;

const extractArgTypesWithDeprecatedJsDoc: ExtractArgTypes = (component) => {
  const argTypes = defaultExtractArgTypes?.(component) ?? null;
  if (!argTypes) {
    return argTypes;
  }
  return applyDeprecatedJsDocTags(component, argTypes);
};

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
  docs: {
    canvas: { layout: "padded" },
    theme: sageStorybookTheme,
    extractArgTypes: extractArgTypesWithDeprecatedJsDoc,
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
