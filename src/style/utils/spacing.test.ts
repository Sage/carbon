import baseTheme from "../themes/base";
import {
  margin,
  padding,
  resolveSpacingValue,
  resolveTokenSpacingValue,
  space,
  spacingCss,
  tokenSpacingCss,
} from "./spacing";

const cssToString = (result: unknown) => String(result);

describe("legacy spacing compatibility", () => {
  it("uses theme.space indexes before applying a pixel fallback", () => {
    expect(resolveSpacingValue(0, baseTheme)).toBe("0px");
    expect(resolveSpacingValue(8, baseTheme)).toBe("var(--spacing800)");
    expect(resolveSpacingValue(-2, baseTheme)).toBe("-var(--spacing200)");
    expect(resolveSpacingValue(2)).toBe("8px");
  });

  it("keeps string values intact and uses pixel semantics for token-first values", () => {
    expect(resolveSpacingValue("m")).toBe("var(--global-space-layout-m)");
    expect(resolveSpacingValue("12px")).toBe("12px");
    expect(resolveTokenSpacingValue("m")).toBe("var(--global-space-layout-m)");
    expect(resolveTokenSpacingValue("12px")).toBe("12px");
    expect(resolveTokenSpacingValue(8)).toBe("8px");
    expect(resolveTokenSpacingValue(3)).toBe("3px");
  });

  it("keeps side-specific declarations and custom scales compatible", () => {
    const result = cssToString(
      spacingCss({
        p: 1,
        px: 2,
        pl: 3,
        theme: { space: ["0px", "4px", "8px", "16px"] },
      }),
    );

    expect(result).toContain("padding: 4px");
    expect(result).toContain("padding-right: 8px");
    expect(result.lastIndexOf("padding-left: 16px")).toBeGreaterThan(
      result.lastIndexOf("padding-left: 8px"),
    );
  });

  it("uses default breakpoints for responsive arrays", () => {
    const result = cssToString(spacingCss({ p: [1, null, 2, 3, 4] }));

    expect(result).toContain("padding: 4px");
    expect(result).toContain("@media screen and (min-width: 52em)");
    expect(result).toContain("padding: 8px");
    expect(result).toContain("@media screen and (min-width: 64em)");
    expect(result).toContain("padding: 12px");
    expect(result).toContain("padding: 16px");
  });

  it("uses named breakpoints for responsive objects", () => {
    const result = cssToString(
      spacingCss({
        p: { _: 1, medium: 2 },
        theme: { breakpoints: { medium: "960px" } },
      }),
    );

    expect(result).toContain("padding: 4px");
    expect(result).toContain("@media screen and (min-width: 960px)");
    expect(result).toContain("padding: 8px");
  });

  it("supports array breakpoints, media-query overrides, and unknown object keys", () => {
    const result = cssToString(
      spacingCss({
        p: { _: 1, print: 2, unknown: 3, skipped: undefined },
        theme: {
          breakpoints: ["30em"],
          mediaQueries: { print: "@media print" },
        },
      }),
    );

    expect(result).toContain("padding: 4px");
    expect(result).toContain("@media print");
    expect(result).toContain("padding: 8px");
    expect(result).toContain("padding: 12px");
  });

  it("uses supplied breakpoint arrays and token-first CSS generation", () => {
    const responsive = cssToString(
      spacingCss({ p: [1, 2], theme: { breakpoints: ["30em"] } }),
    );
    const objectBreakpoint = cssToString(
      spacingCss({ p: [1, 2], theme: { breakpoints: { medium: "40em" } } }),
    );

    expect(responsive).toContain("@media screen and (min-width: 30em)");
    expect(objectBreakpoint).toContain("@media screen and (min-width: 40em)");
    expect(cssToString(tokenSpacingCss({ p: 3 }))).toContain("padding: 3px");
    expect(cssToString(space({ m: 1, p: 2 }))).toContain("padding: 8px");
    expect(cssToString(spacingCss({ p: null, unknown: 1 }))).toBeDefined();
    expect(cssToString(spacingCss({ p: undefined }))).toBeDefined();
  });

  it("limits margin and padding helpers to their respective properties", () => {
    expect(cssToString(margin({ m: 1, p: 2 }))).toContain("margin: 4px");
    expect(cssToString(margin({ m: 1, p: 2 }))).not.toContain("padding");
    expect(cssToString(padding({ m: 1, p: 2 }))).toContain("padding: 8px");
    expect(cssToString(padding({ m: 1, p: 2 }))).not.toContain("margin");
  });
});
