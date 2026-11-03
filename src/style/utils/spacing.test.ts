import baseTheme from "../themes/base";
import { space as styledSystemSpace } from "styled-system";
import {
  padding,
  margin,
  resolveSpacingValue,
  space,
  spacingTokenValues,
} from "./spacing";

const cssCase = (property: string) =>
  property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

describe("local spacing compatibility", () => {
  it("retains legacy theme-space, zero, negative and fallback numeric behaviour", () => {
    expect(resolveSpacingValue(0, baseTheme)).toBe("0px");
    expect(resolveSpacingValue(8, baseTheme)).toBe("var(--spacing800)");
    expect(resolveSpacingValue(-2, baseTheme)).toBe("-var(--spacing200)");
    expect(resolveSpacingValue(2)).toBe("8px");
  });

  it("adds token aliases without changing CSS string values", () => {
    expect(resolveSpacingValue("m")).toBe(spacingTokenValues.m);
    expect(resolveSpacingValue("12px")).toBe("12px");
    expect(resolveSpacingValue("calc(100% - 1rem)")).toBe("calc(100% - 1rem)");
  });

  it("prefers configured string scale keys and retains raw pixel fallbacks", () => {
    const theme = { space: { compact: "6px", m: "10px", 2: 8 } };
    expect(resolveSpacingValue("compact", theme)).toBe("6px");
    expect(resolveSpacingValue("m", theme)).toBe("10px");
    expect(resolveSpacingValue(-2, theme)).toBe("-8px");
    expect(resolveSpacingValue(50, theme)).toBe("50px");
  });

  it("matches styled-system for legacy scalar spacing values", () => {
    const props = { p: 2, mx: -1, theme: baseTheme };
    expect(space(props)).toEqual(
      Object.fromEntries(
        Object.entries(styledSystemSpace(props)).map(([property, value]) => [
          cssCase(property),
          value,
        ]),
      ),
    );
  });

  it("returns plain rules for shorthands and responsive values", () => {
    expect(space({ p: [1, null, 2], mx: "s" })).toEqual({
      padding: "4px",
      "@media screen and (min-width: 52em)": { padding: "8px" },
      "margin-left": spacingTokenValues.s,
      "margin-right": spacingTokenValues.s,
    });
    expect(margin({ m: 1, p: 2 })).toEqual({ margin: "4px" });
  });

  it("uses named breakpoint and media-query responsive objects", () => {
    expect(
      space({
        p: { _: 1, print: 2, desktop: 3 },
        theme: {
          breakpoints: { desktop: "64em" },
          mediaQueries: { print: "@media print" },
        },
      }),
    ).toEqual({
      padding: "4px",
      "@media print": { padding: "8px" },
      "@media screen and (min-width: 64em)": { padding: "16px" },
    });
  });

  it("uses numeric responsive-object keys with breakpoint arrays", () => {
    const breakpoints = ["40em"] as string[] & { desktop?: string };
    breakpoints.desktop = "64em";
    expect(
      space({
        p: { _: 1, 0: 2, desktop: 3 },
        theme: { breakpoints },
      }),
    ).toEqual({
      padding: "4px",
      "@media screen and (min-width: 40em)": { padding: "8px" },
      "@media screen and (min-width: 64em)": { padding: "16px" },
    });
  });

  it("ignores prototype-polluting responsive keys", () => {
    ["__proto__", "constructor", "prototype"].forEach((key) => {
      const value = JSON.parse(`{"${key}": {"polluted": true}}`);

      expect(space({ p: value })).toEqual({});
      expect(Object.prototype).not.toHaveProperty("polluted");
    });
  });

  it("covers scalar, responsive and filtered-generator fallbacks", () => {
    const symbol = Symbol("space");
    expect(resolveSpacingValue(symbol)).toBe("Symbol(space)");
    expect(resolveSpacingValue(-1, { space: [0, 4] })).toBe("-4px");
    expect(resolveSpacingValue("unknown", { space: { known: "4px" } })).toBe(
      "unknown",
    );
    expect(space({ p: null, m: [null, 1, 2, 3, 4] })).toEqual({
      "@media screen and (min-width: 40em)": { margin: "4px" },
      "@media screen and (min-width: 52em)": { margin: "8px" },
      "@media screen and (min-width: 64em)": { margin: "16px" },
      margin: "32px",
    });
    expect(space({ p: { unknown: 1, skipped: undefined } })).toEqual({
      padding: "4px",
    });
    expect(
      space({
        p: [1, 2],
        theme: { breakpoints: { tablet: "50em" } },
      }),
    ).toEqual({
      padding: "4px",
      "@media screen and (min-width: 50em)": { padding: "8px" },
    });
    expect(space({ p: [1, 2], theme: { breakpoints: ["30em"] } })).toEqual({
      padding: "4px",
      "@media screen and (min-width: 30em)": { padding: "8px" },
    });
    expect(
      space({
        p: { desktop: 1 },
        m: { desktop: 2 },
        theme: { breakpoints: { desktop: "64em" } },
      }),
    ).toEqual({
      "@media screen and (min-width: 64em)": {
        padding: "4px",
        margin: "8px",
      },
    });
    expect(padding({ p: 1, m: 2 })).toEqual({ padding: "4px" });
    expect(margin({ m: 1, p: 2 })).toEqual({ margin: "4px" });
  });
});
