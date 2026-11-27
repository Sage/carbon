import React from "react";
import styled, { ThemeProvider, type CSSObject } from "styled-components";
import { render, screen } from "@testing-library/react";
import {
  space as legacySpace,
  layout as legacyLayout,
  grid as legacyGrid,
  flexbox as legacyFlexbox,
  position as legacyPosition,
  color as legacyColor,
} from "styled-system";
import baseTheme from "../themes/base";
import { defaultSpace } from "./style-prop-defaults";
import { defaultColors, defaultPalette } from "./legacy-color-defaults";
import { space, resolveSpacingValue } from "./spacing";
import {
  layout,
  grid,
  flexbox,
  position,
  type StyleObject,
} from "./style-prop-compat";
import color from "./color";
import Box from "../../components/box";

// Compare CSS emitted by the real styling engine: declaration-key casing and
// numeric representation intentionally differ between the two generators.
const toStyledObject = (rules: StyleObject): CSSObject =>
  Object.fromEntries(
    Object.entries(rules).map(([key, value]) => [
      key.startsWith("@")
        ? key
        : key.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase()),
      value && typeof value === "object"
        ? toStyledObject(value)
        : typeof value === "symbol"
          ? String(value)
          : value,
    ]),
  );

const Legacy = styled.div`
  ${legacySpace}
  ${legacyLayout}
  ${legacyFlexbox}
  ${legacyGrid}
  ${legacyPosition}
`;
const Replacement = styled.div<{ values: object }>`
  ${({ values }) =>
    [
      space(values),
      layout(values),
      flexbox(values),
      grid(values),
      position(values),
    ].map(toStyledObject)}
`;

const rulesFor = (element: HTMLElement) => {
  const classes = element.className.split(" ");
  return Array.from(document.styleSheets)
    .flatMap((sheet) => Array.from(sheet.cssRules).map((rule) => rule.cssText))
    .filter((rule) => classes.some((name) => rule.includes(`.${name}`)))
    .map((rule) =>
      classes.reduce(
        (text, name) => text.replaceAll(`.${name}`, ".fixture"),
        rule,
      ),
    );
};

describe("style-prop migration compatibility", () => {
  test("defaults reproduce the former base-theme spacing and color values", () => {
    expect(defaultSpace).toEqual(baseTheme.space);
    expect(defaultColors).toEqual(baseTheme.colors);
    expect(Object.keys(defaultPalette)).toEqual(Object.keys(baseTheme.palette));
  });

  test.each([
    { p: 0, mx: -2, flex: 1, flexGrow: 1, gridColumn: 2, top: 2 },
    {
      p: [1, null, 2],
      minWidth: [100, null, 300],
      flexDirection: ["column", "row"],
    },
    { p: [1, 2, 3, 4, 99], minWidth: [100, 200, 300, 400, 999] },
    { p: { _: 1, 0: 2 }, minWidth: { _: 100, 0: 200 } },
    {
      minWidth: { large: 400, small: 200 },
      m: { large: 2 },
      mt: { small: 3 },
      theme: { ...baseTheme, breakpoints: { small: "40em", large: "64em" } },
    },
    { size: 50, width: 100 },
    { width: 100, size: 50 },
    { width: 0.5, theme: { ...baseTheme, sizes: { "0.5": 0.5 } } },
    { gridGap: "2", gridRowGap: -2, gridColumnGap: 0 },
    {
      p: "density.compact",
      m: 0,
      theme: { ...baseTheme, space: { 0: "5px", density: { compact: "6px" } } },
    },
  ])("emits the same CSS as styled-system for case %#", (values) => {
    const props = {
      ...values,
      theme: { ...(values.theme ?? baseTheme), disableStyledSystemCache: true },
    };
    render(
      <>
        <Legacy data-role="legacy" {...props} />
        <Replacement data-role="replacement" values={props} />
      </>,
    );
    expect(rulesFor(screen.getByTestId("replacement"))).toEqual(
      rulesFor(screen.getByTestId("legacy")),
    );
  });

  test("sorts object queries after merging different spacing props", () => {
    const theme = { ...baseTheme, breakpoints: ["40em", "64em"] };
    expect(Object.keys(space({ m: { 1: 2 }, mt: { 0: 3 }, theme }))).toEqual([
      "@media screen and (min-width: 40em)",
      "@media screen and (min-width: 64em)",
    ]);
    expect(
      Object.keys(
        layout({ minWidth: { 1: 400 }, maxWidth: { 0: 600 }, theme }),
      ),
    ).toEqual([
      "@media screen and (min-width: 40em)",
      "@media screen and (min-width: 64em)",
    ]);
  });

  test("uses Carbon's spacing defaults without constructing a theme", () => {
    expect(resolveSpacingValue(0)).toBe("var(--spacing000)");
    expect(resolveSpacingValue(3)).toBe("var(--spacing300)");
    expect(resolveSpacingValue(50)).toBe("50px");
    expect(resolveSpacingValue("compact", { space: {} })).toBe("compact");
    expect(resolveSpacingValue(2, { space: [] })).toBe("2px");
  });

  test("Box supports token defaults, colors and responsive objects without a provider", () => {
    render(
      <Box
        data-role="box"
        p={{ _: 0, 0: 2 }}
        minWidth={{ _: 100, 0: 200 }}
        color="primary"
        bg="destructive.hover"
        gap={2}
        display="flex"
      />,
    );
    const box = screen.getByTestId("box");
    expect(box).toHaveStyleRule("padding", "var(--spacing000)");
    expect(box).toHaveStyleRule("padding", "var(--spacing200)", {
      media: "screen and (min-width: 40em)",
    });
    expect(box).toHaveStyleRule("min-width", "200px", {
      media: "screen and (min-width: 40em)",
    });
    expect(box).toHaveStyleRule("color", baseTheme.colors.primary);
    expect(box).toHaveStyleRule(
      "background-color",
      baseTheme.colors.destructive?.hover,
    );
    expect(box).toHaveStyleRule("gap", "var(--spacing200)");
  });

  test("Box honours a consumer's partial theme without injecting Carbon's theme", () => {
    const theme = {
      space: { 0: "5px", density: { compact: "6px" } },
      breakpoints: ["30em"],
      colors: { brand: { foreground: "#123456" } },
    };
    render(
      <ThemeProvider theme={theme}>
        <Box
          data-role="box"
          p={[0, "density.compact"]}
          minWidth={[100, 200]}
          color="brand.foreground"
        />
      </ThemeProvider>,
    );
    const box = screen.getByTestId("box");
    expect(box).toHaveStyleRule("padding", "5px");
    expect(box).toHaveStyleRule("padding", "6px", {
      media: "screen and (min-width: 30em)",
    });
    expect(box).toHaveStyleRule("min-width", "200px", {
      media: "screen and (min-width: 30em)",
    });
    expect(box).toHaveStyleRule("color", "#123456");
  });

  test("palette resolution precedes consumer theme-color lookup", () => {
    const theme = {
      ...baseTheme,
      colors: { gold: "#222222", "#FFB500": "#333333" },
    };
    expect(color({ theme, color: "gold" })).toEqual(
      legacyColor({ theme, color: baseTheme.palette.gold }),
    );
    expect(color({ color: "gold" })).toEqual({ color: "#FFB500" });
    expect(
      color({
        theme: { colors: { brand: "#123456" } },
        color: "brand",
        opacity: 0,
      }),
    ).toEqual({ color: "#123456", opacity: 0 });
  });
});
