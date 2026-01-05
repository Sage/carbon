import { render } from "@testing-library/react";
import {
  LayoutProps,
  FlexboxProps,
  BackgroundProps,
  PositionProps,
  GridProps,
} from "styled-system";

import {
  FlexboxProps as StyledFlexboxProps,
  LayoutProps as StyledLayoutProps,
} from "../../components/dips-box/utils/spacing-types";

import { space } from "../../style/themes/base/base-theme.config";
import { mockMatchMedia } from "../mock-match-media";
import Logger from "../../__internal__/utils/logger";

const isUpper = (char: string) => char.toUpperCase() === char;
const humpToDash = (acc: string, char: string) =>
  `${acc}${isUpper(char) ? `-${char.toLowerCase()}` : char}`;

const toCSSCase = (str: string) => {
  return str.split("").reduce(humpToDash, "");
};

const assertStyleMatch = (
  styleSpec: { [key: string]: string | number | undefined },
  component: HTMLElement,
  opts?: jest.Options,
) => {
  Object.entries(styleSpec).forEach(([attr, value]) => {
    expect(component).toHaveStyleRule(toCSSCase(attr), value, opts);
  });
};

const makeArrayKeys = (n: number) => [...Array(n).keys()];

const marginProps = [
  ["m", "margin"],
  ["ml", "marginLeft"],
  ["mr", "marginRight"],
  ["mt", "marginTop"],
  ["mb", "marginBottom"],
  ["mx", "marginLeft"],
  ["mx", "marginRight"],
  ["my", "marginTop"],
  ["my", "marginBottom"],
] as const;

type MarginProps = {
  [K in (typeof marginProps)[number][0]]?: string | number;
};

const paddingProps = [
  ["p", "padding"],
  ["pl", "paddingLeft"],
  ["pr", "paddingRight"],
  ["pt", "paddingTop"],
  ["pb", "paddingBottom"],
  ["px", "paddingLeft"],
  ["px", "paddingRight"],
  ["py", "paddingTop"],
  ["py", "paddingBottom"],
] as const;

type PaddingProps = {
  [K in (typeof paddingProps)[number][0]]?: string | number;
};

const colorProps = [
  ["color", "color", "#CCCCCC"],
  ["bg", "background-color", "#FFFFFF"],
  ["opacity", "opacity", "0.5"],
] as const;

const widthProps = ["width", "width", "200px"] as const;

const heightProps = ["height", "height", "200px"] as const;

const layoutProps = [
  widthProps,
  heightProps,
  ["minWidth", "min-width", "120px"],
  ["maxWidth", "max-width", "120px"],
  ["minHeight", "min-height", "120px"],
  ["maxHeight", "max-height", "120px"],
  ["size", "width", "120px"],
  ["size", "height", "120px"],
  ["display", "display", "inline-block"],
  ["verticalAlign", "vertical-align", "baseline"],
  ["overflow", "overflow", "hidden"],
  ["overflowX", "overflow-x", "hidden"],
  ["overflowY", "overflow-y", "hidden"],
] as const;

const testLayoutProps = [
  widthProps,
  heightProps,
  ["minWidth", "min-width", "120px"],
  ["maxWidth", "max-width", "120px"],
  ["minHeight", "min-height", "120px"],
  ["maxHeight", "max-height", "120px"],
  ["display", "display", "inline-block"],
  ["verticalAlign", "vertical-align", "baseline"],
  ["overflow", "overflow", "hidden"],
  ["overflowX", "overflow-x", "hidden"],
  ["overflowY", "overflow-y", "hidden"],
] as const;

const flexBoxProps = [
  ["alignItems", "alignItems", "center"],
  ["alignContent", "alignContent", "center"],
  ["justifyItems", "justifyItems", "center"],
  ["justifyContent", "justifyContent", "center"],
  ["flexWrap", "flexWrap", "wrap"],
  ["flexDirection", "flexDirection", "row-reverse"],
  ["flex", "flex", "1"],
  ["flexGrow", "flexGrow", "1"],
  ["flexShrink", "flexShrink", "1"],
  ["flexBasis", "flexBasis", "100px"],
  ["justifySelf", "justifySelf", "center"],
  ["alignSelf", "alignSelf", "center"],
  ["order", "order", "1"],
] as const;

const gridProps = [
  ["gridColumn", "gridColumn", "1 / span 2"],
  ["gridRow", "gridRow", "1 / span 2"],
  ["gridArea", "gridArea", "myArea"],
  ["gridAutoFlow", "gridAutoFlow", "column"],
  ["gridAutoRows", "gridAutoRows", "150px"],
  ["gridAutoColumns", "gridAutoColumns", "50px"],
  ["gridTemplateRows", "gridTemplateRows", "100px 300px"],
  ["gridTemplateColumns", "gridTemplateColumns", "auto auto auto auto"],
  ["gridTemplateAreas", "gridTemplateAreas", "myArea myArea . . ."],
] as const;

const backgroundProps = [
  [
    "background",
    "background",
    "lightblue url('foo.jpg') no-repeat fixed center",
  ],
  ["backgroundImage", "background-image", "url(foo.jpg)"],
  ["backgroundSize", "background-size", "center"],
  ["backgroundRepeat", "background-repeat", "no-repeat"],
] as const;

const positionProps = [
  ["top", "0px"],
  ["bottom", "0px"],
  ["right", "0px"],
  ["left", "0px"],
  ["position", "fixed"],
  ["position", "sticky"],
  ["position", "absolute"],
  ["position", "static"],
  ["position", "relative"],
] as const;

export const getDefaultValue = (value?: string | number) => {
  const spaceArrayLength = space.length - 1;
  if (value === undefined) return value;
  const parsedValue = +value;
  if (typeof value === "string" && parsedValue > spaceArrayLength) {
    return `${value}px`;
  }
  if (parsedValue <= spaceArrayLength) {
    return space[parsedValue];
  }
  if (parsedValue > spaceArrayLength) {
    return `${parsedValue * 8}px`;
  }
  return value;
};

const testStyledSystemGrid = (
  component: (gridProperties?: GridProps) => JSX.Element,
  elementQuery: () => HTMLElement,
) => {
  describe.each(gridProps)(
    'when a prop is specified using the "%s" styled system props',
    (styledSystemProp, propName, value) => {
      it(`should set ${propName} styling correctly`, () => {
        const props = { [styledSystemProp]: value };
        render(component(props));

        assertStyleMatch({ [propName]: value }, elementQuery());
      });
    },
  );
};

const testStyledSystemBackground = (
  component: (backgroundProperties?: BackgroundProps) => JSX.Element,
  elementQuery: () => HTMLElement,
) => {
  describe.each(backgroundProps)(
    'when a prop is specified using the "%s" styled system props',
    (styledSystemProp, propName, value) => {
      it(`should set ${propName} styling correctly`, () => {
        const props = { [styledSystemProp]: value };
        render(component({ ...props }));

        assertStyleMatch({ [styledSystemProp]: value }, elementQuery());
      });
    },
  );
};

const testStyledSystemPosition = (
  component: (positionProperties?: PositionProps) => JSX.Element,
  elementQuery: () => HTMLElement,
) => {
  describe.each(positionProps)(
    'when a prop is specified using the "%s" styled system props',
    (styledSystemProp, value) => {
      it(`then ${styledSystemProp} should have been set correctly`, () => {
        const props = { [styledSystemProp]: value };
        render(component({ ...props }));

        assertStyleMatch({ [styledSystemProp]: value }, elementQuery());
      });
    },
  );
};

const testStyledSystemMargin = (
  component: (spacingProps?: MarginProps) => JSX.Element,
  elementQuery: () => HTMLElement,
  assertOpts?: jest.Options,
) => {
  describe.each(marginProps)(
    'when a custom spacing is specified using the "%s" styled system props',
    (styledSystemProp, propName) => {
      it(`should set ${propName} styling correctly`, () => {
        const props = { [styledSystemProp]: 2 };
        render(component({ ...props }));

        assertStyleMatch(
          { [propName]: "var(--spacing200)" },
          elementQuery(),
          assertOpts,
        );
      });
    },
  );
};

const testStyledSystemPadding = (
  component: (spacingProps?: PaddingProps) => JSX.Element,
  elementQuery: () => HTMLElement,
  assertOpts?: jest.Options,
) => {
  describe.each(paddingProps)(
    'when a custom spacing is specified using the "%s" styled system props',
    (styledSystemProp, propName) => {
      it(`should set ${propName} styling correctly`, () => {
        const props = { [styledSystemProp]: 2 };
        render(component({ ...props }));

        assertStyleMatch(
          { [propName]: "var(--spacing200)" },
          elementQuery(),
          assertOpts,
        );
      });
    },
  );
};

// Our test for new padding props in place of styled-system.
const testStyledPadding = (
  component: (spacingProps?: PaddingProps) => JSX.Element,
  elementQuery: () => HTMLElement,
  assertOpts?: jest.Options,
) => {
  describe.each(paddingProps)(
    'when a custom spacing is specified using the "%s" styled props',
    (styledProp, propName) => {
      it(`should set ${propName} styling correctly`, () => {
        const props = { [styledProp]: 2 };
        render(component({ ...props }));

        assertStyleMatch(
          { [propName]: "var(--spacing200)" },
          elementQuery(),
          assertOpts,
        );
      });
    },
  );
};

// Same as testStyledPadding but for margin props
const testStyledMargin = (
  component: (spacingProps?: MarginProps) => JSX.Element,
  elementQuery: () => HTMLElement,
  assertOpts?: jest.Options,
) => {
  describe.each(marginProps)(
    'when a custom spacing is specified using the "%s" styled props',
    (styledProp, propName) => {
      it(`should set ${propName} styling correctly`, () => {
        const props = { [styledProp]: 2 };
        render(component({ ...props }));

        assertStyleMatch(
          { [propName]: "var(--spacing200)" },
          elementQuery(),
          assertOpts,
        );
      });
    },
  );
};

const testStyledSystemSpacing = (
  component: (spacingProps?: MarginProps | PaddingProps) => JSX.Element,
  elementQuery: () => HTMLElement,
  assertOpts?: jest.Options,
) => {
  testStyledSystemMargin(component, elementQuery, assertOpts);
  testStyledSystemPadding(component, elementQuery, assertOpts);
};

const testStyledSystemColor = (
  // https://stackoverflow.com/questions/53711454/styled-system-props-typing-with-typescript
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: (colorProperties?: any) => JSX.Element,
  elementQuery: () => HTMLElement,
) => {
  describe.each(colorProps)(
    'when a prop is specified using the "%s" styled system props',
    (styledSystemProp, propName, value) => {
      it(`should set ${propName} styling correctly`, () => {
        const props = { [styledSystemProp]: value };
        render(component({ ...props }));
        const StyleElement = elementQuery();
        // Some props need to have camelcase so used toHaveStyleRule rather than assertStyleMatch
        expect(StyleElement).toHaveStyleRule(propName, value);
      });
    },
  );
};

const testStyledSystemWidth = (
  component: (widthProperties?: { width: string }) => JSX.Element,
  elementQuery: () => HTMLElement,
) => {
  describe("when a width prop is specified using styled system props", () => {
    it("should set the width styling correctly", () => {
      const [styledSystemProp, propName, value] = widthProps;
      const props = { [styledSystemProp]: value };
      render(component({ ...props }));
      const StyleElement = elementQuery();
      expect(StyleElement).toHaveStyleRule(propName, value);
    });
  });
};

const testStyledSystemHeight = (
  component: (heightProperties?: { height: string }) => JSX.Element,
  elementQuery: () => HTMLElement,
) => {
  describe("when a height prop is specified using styled system props", () => {
    it("should set the height styling correctly", () => {
      const [styledSystemProp, propName, value] = heightProps;
      const props = { [styledSystemProp]: value };
      render(component({ ...props }));
      const StyleElement = elementQuery();
      expect(StyleElement).toHaveStyleRule(propName, value);
    });
  });
};

const testStyledSystemLayout = (
  component: (layoutProperties?: LayoutProps) => JSX.Element,
  elementQuery: () => HTMLElement,
) => {
  describe.each(layoutProps)(
    'when a prop is specified using the "%s" styled system props',
    (styledSystemProp, propName, value) => {
      it(`should set ${propName} styling correctly`, () => {
        const props = { [styledSystemProp]: value };
        render(component({ ...props }));
        const StyleElement = elementQuery();
        // Some props need to have camelcase so used toHaveStyleRule rather than assertStyleMatch
        expect(StyleElement).toHaveStyleRule(propName, value);
      });
    },
  );
};

// Same as testStyledSystemLayout but uses StyledLayoutProps from dips-box
const testStyledLayout = (
  component: (layoutProperties?: StyledLayoutProps) => JSX.Element,
  elementQuery: () => HTMLElement,
) => {
  describe.each(testLayoutProps)(
    'when a prop is specified using the "%s" layout styled props',
    (styledProp, propName, value) => {
      it(`should set ${propName} styling correctly`, () => {
        const props = { [styledProp]: value };
        render(component({ ...props }));
        const StyleElement = elementQuery();
        // Some props need to have camelcase so used toHaveStyleRule rather than assertStyleMatch
        expect(StyleElement).toHaveStyleRule(propName, value);
      });
    },
  );
};

const testStyledSystemFlexBox = (
  component: (flexboxProperties?: FlexboxProps) => JSX.Element,
  elementQuery: () => HTMLElement,
) => {
  describe.each(flexBoxProps)(
    'when a prop is specified using the "%s" styled system props',
    (styledSystemProp, propName, value) => {
      it(`should set ${propName} styling correctly`, () => {
        const props = { [styledSystemProp]: value };
        render(component(props));

        assertStyleMatch({ [propName]: value }, elementQuery());
      });
    },
  );
};

// Same as testStyledSystemFlexBox but uses StyledFlexboxProps from dips-box
const testStyledFlexBox = (
  component: (flexboxProperties?: StyledFlexboxProps) => JSX.Element,
  elementQuery: () => HTMLElement,
) => {
  describe.each(flexBoxProps)(
    'when a prop is specified using the "%s" flexbox styled props',
    (styledProp, propName, value) => {
      it(`should set ${propName} styling correctly`, () => {
        const props = { [styledProp]: value };
        render(component(props));

        assertStyleMatch({ [propName]: value }, elementQuery());
      });
    },
  );
};

// Helper to assert that a deprecation warning is logged only once
interface LoggerComponentMessageAssertionProps {
  component: React.ReactNode;
  message: string;
  method?: "deprecate" | "warn" | "error";
}

/**
 * assertLoggerComponentMessage
 * @param component: The React component to render that triggers the deprecation warning.
 * @param message: The expected deprecation warning message.
 * @param method: The Logger method to spy on, either "deprecate", "warn" or "error". Defaults to "deprecate".
 *
 * This function renders the provided component and checks that the specified deprecation warning
 * is logged exactly once during the initial render. It then re-renders the component and verifies
 * that the warning is not logged again, ensuring that deprecation warnings are not repeated.
 */
const assertLoggerComponentMessage = ({
  component,
  message,
  method = "deprecate",
}: LoggerComponentMessageAssertionProps) => {
  const loggerSpy = jest.spyOn(Logger, method);

  const { rerender } = render(component);

  // We do it this way to compensate for other logs that might be present
  // e.g. in Password, ButtonMinor is used to render the toggle
  // button. Using this helper in a test for Password would
  // also capture the deprecation warning from ButtonMinor
  // and cause issues.
  const loggedMessages = loggerSpy.mock.calls.map((call) => call[0]);
  expect(loggedMessages).toContain(message);

  const messageInstances = loggedMessages.filter((msg) => msg === message);
  expect(messageInstances).toHaveLength(1);

  loggerSpy.mockReset();

  rerender(component);
  const loggedMessagesAfterRerender = loggerSpy.mock.calls.map(
    (call) => call[0],
  );
  expect(loggedMessagesAfterRerender).not.toContain(message);

  loggerSpy.mockRestore();
};

export {
  assertLoggerComponentMessage,
  assertStyleMatch,
  toCSSCase,
  makeArrayKeys,
  mockMatchMedia,
  testStyledSystemColor,
  testStyledSystemLayout,
  testStyledSystemFlexBox,
  testStyledSystemGrid,
  testStyledSystemBackground,
  testStyledSystemPosition,
  testStyledSystemSpacing,
  testStyledPadding,
  testStyledMargin,
  testStyledLayout,
  testStyledFlexBox,
  testStyledSystemMargin,
  testStyledSystemPadding,
  testStyledSystemWidth,
  testStyledSystemHeight,
};
