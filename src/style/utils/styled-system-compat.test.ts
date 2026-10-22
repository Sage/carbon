import {
  background,
  color,
  flexbox,
  grid,
  layout,
  position,
} from "./styled-system-compat";

const cssToString = (result: unknown) => String(result);

describe("styled-system compatibility helpers", () => {
  it("renders layout values with legacy numeric and responsive semantics", () => {
    const result = cssToString(
      layout({
        width: [0.5, null, 20, 30],
        height: { _: 1, print: 2, desktop: 3, unknown: 4, skipped: undefined },
        minWidth: 5,
        minHeight: 6,
        maxWidth: 7,
        maxHeight: 8,
        size: 9,
        display: "block",
        verticalAlign: "top",
        overflow: "hidden",
        overflowX: "auto",
        overflowY: "scroll",
        theme: {
          breakpoints: { desktop: "64em" },
          mediaQueries: { print: "@media print" },
        },
      }),
    );

    expect(result).toContain("width: 50%;");
    expect(result).toContain("height: 100%;");
    expect(result).toContain("@media print");
    expect(result).toContain("@media screen and (min-width: 64em)");
    expect(result).toContain("min-width: 5px;");
    expect(result).toContain("height: 9px;");
    expect(result).toContain("overflow-y: scroll;");
  });

  it("uses default and array breakpoints for responsive values", () => {
    const defaultResult = cssToString(layout({ width: [1, 2] }));
    const arrayResult = cssToString(
      layout({ width: [1, 2, 3], theme: { breakpoints: ["30em"] } }),
    );

    expect(defaultResult).toContain("@media screen and (min-width: 40em)");
    expect(arrayResult).toContain("@media screen and (min-width: 30em)");
    expect(arrayResult).toContain("width: 3px;");
  });

  it("ignores null responsive values and leaves unknown array-breakpoint object keys unwrapped", () => {
    const nullResult = cssToString(layout({ width: null }));
    const objectResult = cssToString(
      layout({
        width: { unknown: 2 },
        theme: { breakpoints: ["30em"] },
      }),
    );

    expect(nullResult).not.toContain("width:");
    expect(objectResult).toContain("width: 2px;");
    expect(objectResult).not.toContain("@media");
  });

  it("renders every flexbox, grid, and background property", () => {
    const flex = cssToString(
      flexbox({
        alignItems: "center",
        alignContent: "start",
        justifyItems: "end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        flexDirection: "row",
        flex: "1 1 auto",
        flexGrow: 1,
        flexShrink: 2,
        flexBasis: 3,
        justifySelf: "stretch",
        alignSelf: "auto",
        order: 4,
      }),
    );
    const gridResult = cssToString(
      grid({
        gridColumn: "1",
        gridRow: "2",
        gridArea: "main",
        gridAutoFlow: "row",
        gridAutoRows: "auto",
        gridAutoColumns: "auto",
        gridTemplateRows: "1fr",
        gridTemplateColumns: "1fr",
        gridTemplateAreas: "'main'",
        gridGap: 1,
        gridRowGap: 2,
        gridColumnGap: 3,
      }),
    );
    const backgroundResult = cssToString(
      background({
        background: "red",
        backgroundColor: "blue",
        backgroundImage: "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }),
    );

    expect(flex).toContain("flex-grow: 1;");
    expect(flex).toContain("flex-basis: 3px;");
    expect(gridResult).toContain("grid-column-gap: 3px;");
    expect(backgroundResult).toContain("background-repeat: no-repeat;");
  });

  it("keeps position fields and emits only provided colour declarations", () => {
    expect(
      position({
        position: "absolute",
        top: 1,
        right: 2,
        bottom: 3,
        left: 4,
        zIndex: 5,
      }),
    ).toEqual({
      position: "absolute",
      top: 1,
      right: 2,
      bottom: 3,
      left: 4,
      zIndex: 5,
    });
    expect(color({ opacity: "10%" })).toEqual({ opacity: "10%" });
    expect(
      color({ color: "primary", theme: { colors: { primary: "green" } } }),
    ).toEqual({ color: "green" });
    expect(color({ bg: "red", backgroundColor: "blue" })).toEqual({
      backgroundColor: "red",
    });
    expect(color({ backgroundColor: "blue" })).toEqual({
      backgroundColor: "blue",
    });
    expect(color({ color: 1 })).toEqual({ color: "1" });
  });
});
