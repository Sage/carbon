/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-identical-title */
/* eslint-disable jest/no-export */
import { render } from "@testing-library/react";
import { sprintf } from "sprintf-js";
import {
  LayoutProps,
  FlexboxProps,
  BackgroundProps,
  PositionProps,
  GridProps,
} from "styled-system";

import { space } from "../../style/themes/base/base-theme.config";
import { mockMatchMedia } from "../mock-match-media";

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

// this util will catch that a console output occurred without polluting the output when running the unit tests
const expectConsoleOutput = (
  message: string,
  type: "warn" | "error" = "error",
) => {
  if (!message) {
    throw new Error(`no ${type} message provided`);
  }

  expect.assertions(1);

  const consoleType = global.console[type];
  let consoleArgs: string[];

  jest.spyOn(global.console, type).mockImplementation((...args) => {
    if (!args.length) return;

    const msg = args.join(" ");
    const params = args.slice(1, args.length);

    if (sprintf(msg, ...params).includes(message)) {
      consoleArgs = args;
      return;
    }

    consoleType(...args);
  });

  return () => {
    if (consoleArgs) {
      // eslint-disable-next-line no-console
      expect(console[type]).toHaveBeenCalledWith(...consoleArgs);
    }

    global.console[type] = consoleType;
  };
};

const testStyledSystemMargin = (
  component: (spacingProps?: MarginProps) => JSX.Element,
  elementQuery: () => HTMLElement,
  defaults?: MarginProps,
  assertOpts?: jest.Options,
) => {
  describe("default props", () => {
    let StyleElement: HTMLElement;

    beforeAll(() => {
      render(component({ ...defaults }));
      StyleElement = elementQuery();
    });

    it("should set the correct margins", () => {
      let margin;
      let marginLeft;
      let marginRight;
      let marginTop;
      let marginBottom;

      if (defaults) {
        margin = getDefaultValue(defaults.m);
        marginLeft = getDefaultValue(defaults.ml || defaults.mx);
        marginRight = getDefaultValue(defaults.mr || defaults.mx);
        marginTop = getDefaultValue(defaults.mt || defaults.my);
        marginBottom = getDefaultValue(defaults.mb || defaults.my);

        assertStyleMatch(
          {
            margin,
            marginLeft,
            marginRight,
            marginTop,
            marginBottom,
          },
          StyleElement,
          assertOpts,
        );
      } else {
        expect(StyleElement).not.toHaveStyleRule("marginLeft");
        expect(StyleElement).not.toHaveStyleRule("marginRight");
        expect(StyleElement).not.toHaveStyleRule("marginTop");
        expect(StyleElement).not.toHaveStyleRule("marginBottom");
        expect(StyleElement).not.toHaveStyleRule("margin");
      }
    });
  });

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
  defaults?: PaddingProps,
  assertOpts?: jest.Options,
) => {
  describe("default props", () => {
    let StyleElement: HTMLElement;

    beforeAll(() => {
      render(component({ ...defaults }));
      StyleElement = elementQuery();
    });

    it("should set the correct paddings", () => {
      let padding;
      let paddingLeft;
      let paddingRight;
      let paddingTop;
      let paddingBottom;

      if (defaults) {
        padding = getDefaultValue(defaults.p);
        paddingLeft = getDefaultValue(defaults.pl || defaults.px);
        paddingRight = getDefaultValue(defaults.pr || defaults.px);
        paddingTop = getDefaultValue(defaults.pt || defaults.py);
        paddingBottom = getDefaultValue(defaults.pb || defaults.py);

        assertStyleMatch(
          {
            padding,
            paddingLeft,
            paddingRight,
            paddingTop,
            paddingBottom,
          },
          StyleElement,
          assertOpts,
        );
      } else {
        expect(StyleElement).not.toHaveStyleRule("paddingLeft");
        expect(StyleElement).not.toHaveStyleRule("paddingRight");
        expect(StyleElement).not.toHaveStyleRule("paddingTop");
        expect(StyleElement).not.toHaveStyleRule("paddingBottom");
        expect(StyleElement).not.toHaveStyleRule("padding");
      }
    });
  });

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

const testStyledSystemSpacing = (
  component: (spacingProps?: MarginProps | PaddingProps) => JSX.Element,
  elementQuery: () => HTMLElement,
  defaults?: MarginProps | PaddingProps,
  assertOpts?: jest.Options,
) => {
  testStyledSystemMargin(
    component,
    elementQuery,
    defaults as MarginProps,
    assertOpts,
  );
  testStyledSystemPadding(
    component,
    elementQuery,
    defaults as PaddingProps,
    assertOpts,
  );
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

export {
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
  expectConsoleOutput,
  testStyledSystemSpacing,
  testStyledSystemMargin,
  testStyledSystemPadding,
  testStyledSystemWidth,
  testStyledSystemHeight,
};
