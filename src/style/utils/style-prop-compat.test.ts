import {
  flexbox as styledSystemFlexbox,
  grid as styledSystemGrid,
  layout as styledSystemLayout,
} from "styled-system";
import {
  background,
  color,
  flexbox,
  grid,
  layout,
  mergeStyleObjects,
  position,
} from "./style-prop-compat";

const cssCase = (property: string) =>
  property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
const normalise = (rules: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(rules).map(([property, value]) => [
      cssCase(property),
      typeof value === "number" &&
      !["flex-grow", "flex-shrink", "order", "z-index"].includes(
        cssCase(property),
      )
        ? `${value}px`
        : value,
    ]),
  );

describe("style-prop compatibility utilities", () => {
  it("uses styled-system-compatible numeric layout semantics in plain style objects", () => {
    expect(layout({ width: [0.5, 20], size: 3 })).toEqual({
      width: "3px",
      "@media screen and (min-width: 40em)": { width: "20px" },
      height: "3px",
    });
  });

  it("matches styled-system for the supported non-responsive rule surface", () => {
    const layoutProps = { width: 0.5, minHeight: 2, display: "flex" };
    const flexboxProps = {
      flexGrow: 1,
      flexBasis: 2,
      justifyContent: "center",
    };
    const gridProps = { gridColumn: "1 / span 2", gridGap: 2 };

    expect(layout(layoutProps)).toEqual(
      normalise(styledSystemLayout(layoutProps)),
    );
    expect(flexbox(flexboxProps)).toEqual(
      normalise(styledSystemFlexbox(flexboxProps)),
    );
    expect(grid(gridProps)).toEqual(normalise(styledSystemGrid(gridProps)));
  });

  it("covers flexbox, grid and position props without a styling-engine dependency", () => {
    expect(flexbox({ flexGrow: 1, flexBasis: 2 })).toEqual({
      "flex-grow": 1,
      "flex-basis": "2px",
    });
    expect(grid({ gridColumn: "1 / span 2", gridGap: 2 })).toEqual({
      "grid-column": "1 / span 2",
      "grid-gap": "8px",
    });
    expect(position({ position: "absolute", top: 2, zIndex: 3 })).toEqual({
      position: "absolute",
      top: "8px",
      "z-index": 3,
    });
  });

  it("keeps unitless values and limits percentage conversion to width", () => {
    expect(
      flexbox({ flex: 1, flexGrow: 1, flexShrink: 1, flexBasis: 1 }),
    ).toEqual({
      flex: 1,
      "flex-grow": 1,
      "flex-shrink": 1,
      "flex-basis": "1px",
    });
    expect(grid({ gridColumn: 2, gridRow: 2, gridArea: 2 })).toEqual({
      "grid-column": 2,
      "grid-row": 2,
      "grid-area": 2,
    });
    expect(layout({ width: 1, minHeight: 1, size: 1 })).toEqual({
      width: "1px",
      "min-height": "1px",
      height: "1px",
    });
    expect(layout({ width: 0.5 })).toEqual({ width: "50%" });
  });

  it("resolves per-property theme scales and responsive object breakpoint arrays", () => {
    const breakpoints = ["40em"] as string[] & { desktop?: string };
    breakpoints.desktop = "64em";
    const theme = {
      sizes: { dialog: "480px" },
      space: [0, "6px", "24px"],
      zIndices: { modal: 3000 },
      breakpoints,
    };
    expect(layout({ size: "dialog", theme })).toEqual({
      width: "480px",
      height: "480px",
    });
    expect(position({ top: 2, zIndex: "modal", theme })).toEqual({
      top: "24px",
      "z-index": 3000,
    });
    expect(layout({ minWidth: { _: 100, 0: 200 }, theme })).toEqual({
      "min-width": "100px",
      "@media screen and (min-width: 40em)": { "min-width": "200px" },
    });
    expect(layout({ minWidth: { desktop: 300 }, theme })).toEqual({
      "@media screen and (min-width: 64em)": { "min-width": "300px" },
    });
  });

  it("uses legacy grid-gap scales and raw pixel fallbacks", () => {
    expect(grid({ gridGap: 3, gridRowGap: 12 })).toEqual({
      "grid-gap": "16px",
      "grid-row-gap": "12px",
    });
    expect(
      grid({
        gridGap: 2,
        gridColumnGap: 1,
        theme: { space: [0, "6px", "24px"] },
      }),
    ).toEqual({
      "grid-gap": "24px",
      "grid-column-gap": "6px",
    });
  });

  it("ignores prototype-polluting responsive keys", () => {
    ["__proto__", "constructor", "prototype"].forEach((key) => {
      const value = JSON.parse(`{"${key}": {"polluted": true}}`);

      expect(layout({ width: value })).toEqual({});
      expect(Object.prototype).not.toHaveProperty("polluted");
    });
    expect(
      mergeStyleObjects({}, JSON.parse('{"__proto__": {"polluted": true}}')),
    ).toEqual({});
    expect(
      mergeStyleObjects(
        { "@media screen": { color: "red" } },
        { "@media screen": { margin: "4px" } },
      ),
    ).toEqual({ "@media screen": { color: "red", margin: "4px" } });
  });

  it("covers scale resolution and numeric conversion fallbacks", () => {
    const symbol = Symbol("value");
    expect(layout({ height: symbol, width: "auto" })).toEqual({
      height: "Symbol(value)",
      width: "auto",
    });
    expect(layout({ height: 0, width: 2, theme: { sizes: ["10px"] } })).toEqual(
      {
        height: "10px",
        width: "2px",
      },
    );
    expect(layout({ height: 0 })).toEqual({ height: 0 });
    expect(
      layout({ height: 2, theme: { sizes: { nested: { value: "20px" } } } }),
    ).toEqual({
      height: "2px",
    });
    expect(
      layout({
        height: "nested.value",
        theme: { sizes: { nested: { value: "20px" } } },
      }),
    ).toEqual({
      height: "20px",
    });
    expect(
      layout({ height: "nested.missing", theme: { sizes: { nested: {} } } }),
    ).toEqual({
      height: "nested.missing",
    });
    expect(
      layout({
        height: "nested.missing.value",
        theme: { sizes: { nested: {} } },
      }),
    ).toEqual({ height: "nested.missing.value" });
  });

  it("covers responsive empty, sparse and fallback paths", () => {
    expect(layout({ width: null })).toEqual({});
    expect(layout({ width: [null, 1, 2, 3, 4] })).toEqual({
      "@media screen and (min-width: 40em)": { width: "100%" },
      "@media screen and (min-width: 52em)": { width: "2px" },
      "@media screen and (min-width: 64em)": { width: "3px" },
      width: "4px",
    });
    expect(layout({ width: { unknown: 2, skipped: undefined } })).toEqual({
      width: "2px",
    });
    expect(layout({ width: [1, 2], theme: { breakpoints: ["30em"] } })).toEqual(
      {
        width: "100%",
        "@media screen and (min-width: 30em)": { width: "2px" },
      },
    );
    expect(
      layout({
        width: { print: 2 },
        theme: { mediaQueries: { print: "@media print" } },
      }),
    ).toEqual({ "@media print": { width: "2px" } });
  });

  it("covers grid gap and standalone color compatibility branches", () => {
    expect(grid({ gridGap: 0, gridRowGap: "1rem", gridColumnGap: -2 })).toEqual(
      {
        "grid-gap": 0,
        "grid-row-gap": "1rem",
        "grid-column-gap": "-8px",
      },
    );
    expect(grid({ gridGap: 2, theme: { space: [0, 4, 8] } })).toEqual({
      "grid-gap": "8px",
    });
    expect(grid({ gridGap: -1, theme: { space: [0, "4px"] } })).toEqual({
      "grid-gap": "-4px",
    });
    expect(
      color({
        theme: { colors: { brand: "green" } },
        color: "brand",
        bg: "red",
        backgroundColor: "blue",
        opacity: 0,
      }),
    ).toEqual({ color: "green", "background-color": "red", opacity: 0 });
    expect(color({ backgroundColor: "blue" })).toEqual({
      color: undefined,
      "background-color": "blue",
      opacity: undefined,
    });
    expect(color({ color: 1 })).toEqual({
      color: 1,
      "background-color": undefined,
      opacity: undefined,
    });
    expect(color({})).toEqual({
      color: undefined,
      "background-color": undefined,
      opacity: undefined,
    });
    expect(background({ backgroundColor: "red" })).toEqual({
      "background-color": "red",
    });
  });
});
