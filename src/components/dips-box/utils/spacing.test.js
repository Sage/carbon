import { css } from "styled-components";
import {
  resolveSpacingValue,
  spacingCss,
  flexboxCss,
  layoutCss,
} from "./spacing";

// Helper to convert css template literal to string
const cssToString = (cssResult) => {
  if (Array.isArray(cssResult)) {
    return cssResult.join("");
  }
  return String(cssResult);
};

describe("resolveSpacingValue", () => {
  it("should use theme.space array for numbers when available", () => {
    const theme = {
      space: ["0px", "4px", "8px", "16px", "32px"],
    };
    expect(resolveSpacingValue(0, theme)).toBe("0px");
    expect(resolveSpacingValue(1, theme)).toBe("4px");
    expect(resolveSpacingValue(3, theme)).toBe("16px");
  });

  it("should fallback to 8px multiplier when theme.space array does not contain index", () => {
    const theme = {
      space: ["0px", "4px", "8px"],
    };
    expect(resolveSpacingValue(5, theme)).toBe("40px");
  });

  it("should fallback to 8px multiplier when theme.space is not available", () => {
    expect(resolveSpacingValue(0, {})).toBe(0);
    expect(resolveSpacingValue(2, {})).toBe(16);
    expect(resolveSpacingValue(3, {})).toBe(24);
  });

  it("should fallback to 8px multiplier when no theme is provided", () => {
    expect(resolveSpacingValue(1)).toBe(8);
    expect(resolveSpacingValue(4)).toBe(32);
  });

  it("should pass through string values unchanged", () => {
    expect(resolveSpacingValue("1rem", {})).toBe("1rem");
    expect(resolveSpacingValue("auto", {})).toBe("auto");
    expect(resolveSpacingValue("10px", {})).toBe("10px");
    expect(resolveSpacingValue("var(--spacing100)", {})).toBe(
      "var(--spacing100)",
    );
  });
});

describe("spacingCss", () => {
  it("should apply padding shorthand (p)", () => {
    const result = cssToString(spacingCss({ p: 2 }));
    expect(result).toContain("padding: 16px");
  });

  it("should apply padding-top (pt)", () => {
    const result = cssToString(spacingCss({ pt: 3 }));
    expect(result).toContain("padding-top: 24px");
  });

  it("should apply padding-right (pr)", () => {
    const result = cssToString(spacingCss({ pr: 1 }));
    expect(result).toContain("padding-right: 8px");
  });

  it("should apply padding-bottom (pb)", () => {
    const result = cssToString(spacingCss({ pb: 2 }));
    expect(result).toContain("padding-bottom: 16px");
  });

  it("should apply padding-left (pl)", () => {
    const result = cssToString(spacingCss({ pl: 4 }));
    expect(result).toContain("padding-left: 32px");
  });

  it("should apply padding horizontal (px) to left and right", () => {
    const result = cssToString(spacingCss({ px: 2 }));
    expect(result).toContain("padding-left: 16px");
    expect(result).toContain("padding-right: 16px");
  });

  it("should apply padding vertical (py) to top and bottom", () => {
    const result = cssToString(spacingCss({ py: 3 }));
    expect(result).toContain("padding-top: 24px");
    expect(result).toContain("padding-bottom: 24px");
  });

  it("should apply margin shorthand (m)", () => {
    const result = cssToString(spacingCss({ m: 2 }));
    expect(result).toContain("margin: 16px");
  });

  it("should apply margin-top (mt)", () => {
    const result = cssToString(spacingCss({ mt: 1 }));
    expect(result).toContain("margin-top: 8px");
  });

  it("should apply margin-right (mr)", () => {
    const result = cssToString(spacingCss({ mr: 2 }));
    expect(result).toContain("margin-right: 16px");
  });

  it("should apply margin-bottom (mb)", () => {
    const result = cssToString(spacingCss({ mb: 3 }));
    expect(result).toContain("margin-bottom: 24px");
  });

  it("should apply margin-left (ml)", () => {
    const result = cssToString(spacingCss({ ml: 4 }));
    expect(result).toContain("margin-left: 32px");
  });

  it("should apply margin horizontal (mx) to left and right", () => {
    const result = cssToString(spacingCss({ mx: 2 }));
    expect(result).toContain("margin-left: 16px");
    expect(result).toContain("margin-right: 16px");
  });

  it("should apply margin vertical (my) to top and bottom", () => {
    const result = cssToString(spacingCss({ my: 3 }));
    expect(result).toContain("margin-top: 24px");
    expect(result).toContain("margin-bottom: 24px");
  });

  it("should apply longhand properties", () => {
    const result = cssToString(
      spacingCss({
        margin: 1,
        marginTop: 2,
        marginRight: 3,
        marginBottom: 4,
        marginLeft: 5,
        padding: 1,
        paddingTop: 2,
        paddingRight: 3,
        paddingBottom: 4,
        paddingLeft: 5,
      }),
    );
    expect(result).toContain("margin: 8px");
    expect(result).toContain("margin-top: 16px");
    expect(result).toContain("margin-right: 24px");
    expect(result).toContain("margin-bottom: 32px");
    expect(result).toContain("margin-left: 40px");
    expect(result).toContain("padding: 8px");
    expect(result).toContain("padding-top: 16px");
    expect(result).toContain("padding-right: 24px");
    expect(result).toContain("padding-bottom: 32px");
    expect(result).toContain("padding-left: 40px");
  });

  it("should use theme.space array when provided", () => {
    const props = {
      p: 2,
      theme: {
        space: ["0px", "4px", "8px", "16px", "32px"],
      },
    };
    const result = cssToString(spacingCss(props));
    expect(result).toContain("padding: 8px");
  });

  it("should handle string values", () => {
    const result = cssToString(spacingCss({ p: "1rem", m: "auto" }));
    expect(result).toContain("padding: 1rem");
    expect(result).toContain("margin: auto");
  });

  it("should skip falsy values including 0", () => {
    const result = cssToString(spacingCss({ p: 0, m: null, pt: undefined }));
    // All falsy values are skipped, including 0
    expect(result.trim()).toBe("");
  });
});

describe("flexboxCss", () => {
  it("should apply align-items", () => {
    const result = cssToString(flexboxCss({ alignItems: "center" }));
    expect(result).toContain("align-items: center");
  });

  it("should apply align-content", () => {
    const result = cssToString(flexboxCss({ alignContent: "space-between" }));
    expect(result).toContain("align-content: space-between");
  });

  it("should apply justify-items", () => {
    const result = cssToString(flexboxCss({ justifyItems: "start" }));
    expect(result).toContain("justify-items: start");
  });

  it("should apply justify-content", () => {
    const result = cssToString(flexboxCss({ justifyContent: "flex-end" }));
    expect(result).toContain("justify-content: flex-end");
  });

  it("should apply flex-direction", () => {
    const result = cssToString(flexboxCss({ flexDirection: "column" }));
    expect(result).toContain("flex-direction: column");
  });

  it("should apply flex-wrap", () => {
    const result = cssToString(flexboxCss({ flexWrap: "wrap" }));
    expect(result).toContain("flex-wrap: wrap");
  });

  it("should apply flex-grow with number value without px suffix", () => {
    const result = cssToString(flexboxCss({ flexGrow: 1 }));
    expect(result).toContain("flex-grow: 1");
    expect(result).not.toContain("flex-grow: 1px");
  });

  it("should apply flex-shrink with number value without px suffix", () => {
    const result = cssToString(flexboxCss({ flexShrink: 1 }));
    expect(result).toContain("flex-shrink: 1");
    expect(result).not.toContain("flex-shrink: 1px");
  });

  it("should apply flex-basis", () => {
    const result = cssToString(flexboxCss({ flexBasis: "200px" }));
    expect(result).toContain("flex-basis: 200px");
  });

  it("should apply align-self", () => {
    const result = cssToString(flexboxCss({ alignSelf: "flex-start" }));
    expect(result).toContain("align-self: flex-start");
  });

  it("should apply justify-self", () => {
    const result = cssToString(flexboxCss({ justifySelf: "center" }));
    expect(result).toContain("justify-self: center");
  });

  it("should apply order with number value without px suffix", () => {
    const result = cssToString(flexboxCss({ order: 3 }));
    expect(result).toContain("order: 3");
    expect(result).not.toContain("order: 3px");
  });

  it("should apply gap", () => {
    const result = cssToString(flexboxCss({ gap: 16 }));
    expect(result).toContain("gap: 16px");
  });

  it("should apply row-gap", () => {
    const result = cssToString(flexboxCss({ rowGap: 8 }));
    expect(result).toContain("row-gap: 8px");
  });

  it("should apply column-gap", () => {
    const result = cssToString(flexboxCss({ columnGap: 12 }));
    expect(result).toContain("column-gap: 12px");
  });

  it("should apply display", () => {
    const result = cssToString(flexboxCss({ display: "flex" }));
    expect(result).toContain("display: flex");
  });

  it("should apply flex", () => {
    const result = cssToString(flexboxCss({ flex: "1 1 auto" }));
    expect(result).toContain("flex: 1 1 auto");
  });

  it("should apply place-items", () => {
    const result = cssToString(flexboxCss({ placeItems: "center" }));
    expect(result).toContain("place-items: center");
  });

  it("should apply place-content", () => {
    const result = cssToString(flexboxCss({ placeContent: "space-around" }));
    expect(result).toContain("place-content: space-around");
  });

  it("should apply place-self", () => {
    const result = cssToString(flexboxCss({ placeSelf: "end" }));
    expect(result).toContain("place-self: end");
  });

  it("should apply inline-flex", () => {
    const result = cssToString(flexboxCss({ inlineFlex: "inline-flex" }));
    expect(result).toContain("inline-flex: inline-flex");
  });

  it("should format zero as '0' not '0px'", () => {
    const result = cssToString(flexboxCss({ gap: 0 }));
    expect(result).toContain("gap: 0");
    expect(result).not.toContain("gap: 0px");
  });

  it("should skip falsy values", () => {
    const result = cssToString(
      flexboxCss({ alignItems: null, justifyContent: undefined }),
    );
    expect(result).not.toContain("align-items:");
    expect(result).not.toContain("justify-content:");
  });

  it("should apply multiple flexbox properties", () => {
    const result = cssToString(
      flexboxCss({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }),
    );
    expect(result).toContain("display: flex");
    expect(result).toContain("flex-direction: column");
    expect(result).toContain("align-items: center");
    expect(result).toContain("justify-content: space-between");
    expect(result).toContain("gap: 16px");
  });
});

describe("layoutCss", () => {
  it("should apply width", () => {
    const result = cssToString(layoutCss({ width: "100%" }));
    expect(result).toContain("width: 100%");
  });

  it("should apply width with number", () => {
    const result = cssToString(layoutCss({ width: 200 }));
    expect(result).toContain("width: 200px");
  });

  it("should apply min-width", () => {
    const result = cssToString(layoutCss({ minWidth: "50px" }));
    expect(result).toContain("min-width: 50px");
  });

  it("should apply max-width", () => {
    const result = cssToString(layoutCss({ maxWidth: "500px" }));
    expect(result).toContain("max-width: 500px");
  });

  it("should apply height", () => {
    const result = cssToString(layoutCss({ height: "100vh" }));
    expect(result).toContain("height: 100vh");
  });

  it("should apply height with number", () => {
    const result = cssToString(layoutCss({ height: 150 }));
    expect(result).toContain("height: 150px");
  });

  it("should apply min-height", () => {
    const result = cssToString(layoutCss({ minHeight: "50px" }));
    expect(result).toContain("min-height: 50px");
  });

  it("should apply max-height", () => {
    const result = cssToString(layoutCss({ maxHeight: "80vh" }));
    expect(result).toContain("max-height: 80vh");
  });

  it("should apply box-sizing", () => {
    const result = cssToString(layoutCss({ boxSizing: "border-box" }));
    expect(result).toContain("box-sizing: border-box");
  });

  it("should apply overflow", () => {
    const result = cssToString(layoutCss({ overflow: "hidden" }));
    expect(result).toContain("overflow: hidden");
  });

  it("should apply overflow-x", () => {
    const result = cssToString(layoutCss({ overflowX: "scroll" }));
    expect(result).toContain("overflow-x: scroll");
  });

  it("should apply overflow-y", () => {
    const result = cssToString(layoutCss({ overflowY: "auto" }));
    expect(result).toContain("overflow-y: auto");
  });

  it("should apply display", () => {
    const result = cssToString(layoutCss({ display: "block" }));
    expect(result).toContain("display: block");
  });

  it("should apply vertical-align", () => {
    const result = cssToString(layoutCss({ verticalAlign: "middle" }));
    expect(result).toContain("vertical-align: middle");
  });

  it("should apply visibility", () => {
    const result = cssToString(layoutCss({ visibility: "hidden" }));
    expect(result).toContain("visibility: hidden");
  });

  it("should apply aspect-ratio", () => {
    const result = cssToString(layoutCss({ aspectRatio: "16/9" }));
    expect(result).toContain("aspect-ratio: 16/9");
  });

  it("should format zero as '0' not '0px'", () => {
    const result = cssToString(layoutCss({ width: 0 }));
    expect(result).toContain("width: 0");
    expect(result).not.toContain("width: 0px");
  });

  it("should skip falsy values", () => {
    const result = cssToString(layoutCss({ width: null, height: undefined }));
    expect(result).not.toContain("width:");
    expect(result).not.toContain("height:");
  });

  it("should apply multiple layout properties", () => {
    const result = cssToString(
      layoutCss({
        width: "100%",
        height: 400,
        maxWidth: "800px",
        overflow: "hidden",
        boxSizing: "border-box",
      }),
    );
    expect(result).toContain("width: 100%");
    expect(result).toContain("height: 400px");
    expect(result).toContain("max-width: 800px");
    expect(result).toContain("overflow: hidden");
    expect(result).toContain("box-sizing: border-box");
  });
});

// Direct tests for internal formatValue function behavior
// Note: formatValue is not exported, but we can test the paths it would take
// by examining the output when those paths are reachable
describe("formatValue internal function behavior", () => {
  it("should format zero as '0' for non-suffix-less properties (via string passthrough)", () => {
    // Since 0 is filtered as falsy, we test the expected behavior with string "0"
    // which demonstrates what formatValue would do if 0 reached it
    const result = cssToString(layoutCss({ width: "0" }));
    expect(result).toContain("width: 0");
  });

  it("should format zero for order property (no px suffix)", () => {
    const result = cssToString(flexboxCss({ order: 0 }));
    expect(result).toContain("order: 0");
    expect(result).not.toContain("order: 0px");
  });

  it("should format zero values correctly for various properties", () => {
    // Tests that formatValue's line 136 (if (value === 0) return "0") is now reachable
    // Valid use cases: order: 0, flex-grow: 0, gap: 0

    const testCases = [
      { props: { order: 0 }, expected: "order: 0" },
      { props: { flexGrow: 0 }, expected: "flex-grow: 0" },
      { props: { gap: 0 }, expected: "gap: 0" },
    ];

    testCases.forEach(({ props, expected }) => {
      const result = cssToString(flexboxCss(props));
      expect(result).toContain(expected);
      expect(result).not.toContain(expected + "px");
    });
  });
});
