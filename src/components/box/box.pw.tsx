import { expect, test } from "@playwright/experimental-ct-react17";
import React from "react";
import { getDataElementByValue } from "../../../playwright/components";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
} from "../../../playwright/support/helper";
import { BoxProps } from "../../../src/components/box";
import {
  Default,
  BoxComponentMulti,
  BoxShadow,
  Color,
  Flex,
  Gap,
  Layout,
  OverflowWrap,
  Position,
  Scroll,
  Spacing,
} from "../../../src/components/box/components.test-pw";

const colorConstants: [string, string, string][] = [
  ["red", "rgb(255, 0, 0)", "#FF0000"],
  ["yellow", "rgb(255, 255, 0)", "#FFFF00"],
  ["blue", "rgb(0, 0, 255)", "#0000FF"],
];

const bgConstants: [string, string, string][] = [
  ["primary", "rgb(0, 125, 90)", "#007D5A"],
  ["secondary", "rgb(0, 96, 70)", "#006046"],
  ["tertiary", "rgb(0, 64, 46)", "#00402E"],
];

const widthConstants = [
  { width: "135px", percentage: 0.1, number: 135 },
  { width: "683px", percentage: 0.5, number: 683 },
  { width: "1366px", percentage: 1, number: 1366 },
];

const heightConstants: [string, number][] = [
  ["135px", 135],
  ["683px", 683],
  ["1366px", 1366],
];

const sizeConstants = [
  { pixels: "135px", percentage: 0.1, number: 135 },
  { pixels: "683px", percentage: 0.5, number: 683 },
  { pixels: "1366px", percentage: 1, number: 1366 },
];

test.describe("should render Box component", () => {
  colorConstants.forEach(([color, rgbValue]) => {
    test(`should verify text is ${color} when color prop is passed as string`, async ({
      mount,
      page,
    }) => {
      await mount(<Default color={color} />);
      const boxElement = await getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("color", rgbValue);
    });
  });

  colorConstants.forEach(([color, rgbValue]) => {
    test(`should verify text is ${color} when color prop passed as RGB value`, async ({
      mount,
      page,
    }) => {
      await mount(<Default color={rgbValue} />);
      const boxElement = await getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("color", rgbValue);
    });
  });

  colorConstants.forEach(([color, rgbValue, hexValue]) => {
    test(`should verify text is ${color} when color prop passed as hex`, async ({
      mount,
      page,
    }) => {
      await mount(<Default color={hexValue} />);
      const boxElement = await getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("color", rgbValue);
    });
  });

  bgConstants.forEach(([color, rgbValue]) => {
    test(`should verify background is ${color} when bg prop passed as string`, async ({
      mount,
      page,
    }) => {
      await mount(<Default bg={color} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("background-color", rgbValue);
    });
  });

  bgConstants.forEach(([color, rgbValue]) => {
    test(`should verify background is ${color} when bg prop passed as RGB value`, async ({
      mount,
      page,
    }) => {
      await mount(<Default bg={rgbValue} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("background-color", rgbValue);
    });
  });

  bgConstants.forEach(([color, rgbValue, hexValue]) => {
    test(`should verify background is ${color} when bg prop passed as hex value`, async ({
      mount,
      page,
    }) => {
      await mount(<Default bg={hexValue} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("background-color", rgbValue);
    });
  });

  bgConstants.forEach(([color, rgbValue]) => {
    test(`should verify background is ${color} when backgroundColor prop passed as string`, async ({
      mount,
      page,
    }) => {
      await mount(<Default bg="" backgroundColor={color} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("background-color", rgbValue);
    });
  });

  bgConstants.forEach(([color, rgbValue]) => {
    test(`should verify background is ${color} when backgroundColor prop passed as RGB value`, async ({
      mount,
      page,
    }) => {
      await mount(<Default bg="" backgroundColor={rgbValue} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("background-color", rgbValue);
    });
  });

  bgConstants.forEach(([color, rgbValue, hexValue]) => {
    test(`should verify background is ${color} when backgroundColor prop passed as hex value`, async ({
      mount,
      page,
    }) => {
      await mount(<Default bg="" backgroundColor={hexValue} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("background-color", rgbValue);
    });
  });

  ["0.1", "0.5", "1"].forEach((opacity) => {
    test(`should verify opacity is ${opacity}`, async ({ mount, page }) => {
      await mount(<Default bg="primary" opacity={opacity} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("opacity", opacity);
    });
  });

  widthConstants.forEach(({ width, percentage }) => {
    test(`should verify width is ${width} when prop is passed as a percentage`, async ({
      mount,
      page,
    }) => {
      await mount(<Default bg="primary" width={percentage} />);
      const boxElement = await getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(boxElement, "width", parseInt(width));
    });
  });

  widthConstants.forEach(({ width, number }) => {
    test(`should verify width is ${width} when prop is passed as a number`, async ({
      mount,
      page,
    }) => {
      await mount(<Default bg="primary" width={number} />);
      const boxElement = await getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(boxElement, "width", parseInt(width));
    });
  });

  widthConstants.forEach(({ width }) => {
    test(`should verify width is ${width} when prop is passed as a string`, async ({
      mount,
      page,
    }) => {
      await mount(<Default bg="primary" width={width} />);
      const boxElement = await getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(boxElement, "width", parseInt(width));
    });
  });

  heightConstants.forEach(([height, number]) => {
    test(`should verify height is ${height} when prop is passed as a number`, async ({
      mount,
      page,
    }) => {
      await mount(<Default bg="primary" height={number} />);
      const boxElement = await getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(
        boxElement,
        "height",
        parseInt(height),
      );
    });
  });

  heightConstants.forEach(([height]) => {
    test(`should verify height is ${height} when prop is passed as a string`, async ({
      mount,
      page,
    }) => {
      await mount(<Default bg="primary" height={height} />);
      const boxElement = await getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(
        boxElement,
        "height",
        parseInt(height),
      );
    });
  });

  sizeConstants.forEach(({ pixels, number }) => {
    test(`should verify height and width are ${pixels} when size prop is passed as a number`, async ({
      mount,
      page,
    }) => {
      await mount(<Default size={number} />);
      const boxElement = getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(
        boxElement,
        "width",
        parseInt(pixels),
      );
      await assertCssValueIsApproximately(
        boxElement,
        "height",
        parseInt(pixels),
      );
    });
  });

  sizeConstants.forEach(({ pixels }) => {
    test(`should verify height and width are ${pixels} when size prop is passed as a string`, async ({
      mount,
      page,
    }) => {
      await mount(<Default size={pixels} />);
      const boxElement = getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(
        boxElement,
        "width",
        parseInt(pixels),
      );
      await assertCssValueIsApproximately(
        boxElement,
        "height",
        parseInt(pixels),
      );
    });
  });

  ["block", "inline-block", "flex", "contents", "list-item", "none"].forEach(
    (display) => {
      test(`should verify display is ${display}`, async ({ mount, page }) => {
        await mount(<Default display={display} />);
        const boxElement = getDataElementByValue(page, "box");
        await expect(boxElement).toHaveAttribute("display", display);
        await expect(boxElement).toHaveCSS("display", display);
      });
    },
  );

  [
    "baseline",
    "bottom",
    "middle",
    "sub",
    "super",
    "text-bottom",
    "text-top",
    "top",
  ].forEach((alignment) => {
    test(`should verify verticalAlign is ${alignment}`, async ({
      mount,
      page,
    }) => {
      await mount(<BoxComponentMulti verticalAlign={alignment} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("vertical-align", alignment);
    });
  });

  ["auto", "clip", "hidden", "scroll", "visible"].forEach((overflow) => {
    test(`should verify overflow is ${overflow}`, async ({ mount, page }) => {
      await mount(<Default overflow={overflow} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveAttribute("overflow", overflow);
      await expect(boxElement).toHaveCSS("overflow", overflow);
    });
  });

  (["auto", "clip", "hidden", "scroll", "visible"] as const).forEach(
    (overflow) => {
      test(`should verify overflowX is ${overflow}`, async ({
        mount,
        page,
      }) => {
        await mount(<Default overflowX={overflow} />);
        const boxElement = getDataElementByValue(page, "box");
        await expect(boxElement).toHaveCSS("overflow-x", overflow);
      });
    },
  );

  (["auto", "clip", "hidden", "scroll", "visible"] as const).forEach(
    (overflow) => {
      test(`should verify overflowY is ${overflow}`, async ({
        mount,
        page,
      }) => {
        await mount(<Default overflowY={overflow} />);
        const boxElement = getDataElementByValue(page, "box");
        await expect(boxElement).toHaveCSS("overflow-y", overflow);
      });
    },
  );

  [
    [200, 300],
    [400, 400],
  ].forEach(([width, actualWidth]) => {
    test(`when minWidth prop is 300 and width prop is the number ${width}, the calculated width should be ${actualWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(<Default minWidth={300} width={width} />);
      const boxElement = getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(boxElement, "width", actualWidth);
    });
  });

  (
    [
      ["200px", 300],
      ["400px", 400],
    ] as [string, number][]
  ).forEach(([width, actualWidth]) => {
    test(`when minWidth prop is 300 and width prop is the string ${width}, the calculated width should be ${actualWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(<Default minWidth={300} width={width} />);
      const boxElement = getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(boxElement, "width", actualWidth);
    });
  });

  [
    [0.1, 300],
    [0.3, 409],
  ].forEach(([width, actualWidth]) => {
    test(`when minWidth prop is 300 and width prop is the percentage ${width}, the calculated width should be ${actualWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(<Default minWidth={300} width={width} />);
      const boxElement = getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(boxElement, "width", actualWidth);
    });
  });

  [
    [400, 400],
    [800, 600],
  ].forEach(([width, actualWidth]) => {
    test(`when maxWidth prop is 600 and width prop is the number ${width}, the calculated width should be ${actualWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(<Default maxWidth={600} width={width} />);
      const boxElement = getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(boxElement, "width", actualWidth);
    });
  });

  (
    [
      ["400px", 400],
      ["800px", 600],
    ] as [string, number][]
  ).forEach(([width, actualWidth]) => {
    test(`when maxWidth prop is 600 and width prop is the string ${width}, the calculated width should be ${actualWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(<Default maxWidth={600} width={width} />);
      const boxElement = getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(boxElement, "width", actualWidth);
    });
  });

  [
    [0.1, 135],
    [0.5, 600],
  ].forEach(([width, actualWidth]) => {
    test(`when maxWidth prop is 600 and width prop is the percentage ${width}, the calculated width should be ${actualWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(<Default maxWidth={600} width={width} />);
      const boxElement = getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(boxElement, "width", actualWidth);
    });
  });

  [
    [400, 600],
    [800, 800],
  ].forEach(([height, actualHeight]) => {
    test(`when minHeight prop is 600 and height prop is the number ${height}, the calculated width should be ${actualHeight}`, async ({
      mount,
      page,
    }) => {
      await mount(<Default minHeight={600} height={height} />);
      const boxElement = getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(boxElement, "height", actualHeight);
    });
  });

  (
    [
      ["400px", 600],
      ["800px", 800],
    ] as [string, number][]
  ).forEach(([height, actualHeight]) => {
    test(`when minHeight prop is 600 and height prop is the string ${height}, the calculated width should be ${actualHeight}`, async ({
      mount,
      page,
    }) => {
      await mount(<Default minHeight={600} height={height} />);
      const boxElement = getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(boxElement, "height", actualHeight);
    });
  });

  [
    [400, 400],
    [800, 600],
  ].forEach(([height, actualHeight]) => {
    test(`when maxHeight prop is 600 and height prop is the number ${height}, the calculated width should be ${actualHeight}`, async ({
      mount,
      page,
    }) => {
      await mount(<Default maxHeight={600} height={height} />);
      const boxElement = getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(boxElement, "height", actualHeight);
    });
  });

  (
    [
      ["400px", 400],
      ["800px", 600],
    ] as [string, number][]
  ).forEach(([height, actualHeight]) => {
    test(`when maxHeight prop is 600 and height prop is the string ${height}, the calculated width should be ${actualHeight}`, async ({
      mount,
      page,
    }) => {
      await mount(<Default maxHeight={600} height={height} />);
      const boxElement = getDataElementByValue(page, "box");
      await assertCssValueIsApproximately(boxElement, "height", actualHeight);
    });
  });

  ["normal", "stretch", "baseline", "center", "flex-start", "flex-end"].forEach(
    (alignment) => {
      test(`should verify alignItems is ${alignment}`, async ({
        mount,
        page,
      }) => {
        await mount(<BoxComponentMulti alignItems={alignment} />);
        const boxElement = getDataElementByValue(page, "box");
        await expect(boxElement).toHaveCSS("align-items", alignment);
      });
    },
  );

  [
    "normal",
    "baseline",
    "center",
    "flex-start",
    "flex-end",
    "space-between",
    "space-around",
    "stretch",
  ].forEach((alignment) => {
    test(`should verify alignContent is ${alignment}`, async ({
      mount,
      page,
    }) => {
      await mount(<BoxComponentMulti alignContent={alignment} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("align-content", alignment);
    });
  });

  [
    "left",
    "center",
    "right",
    "flex-start",
    "flex-end",
    "normal",
    "stretch",
  ].forEach((justified) => {
    test(`should verify justifyItems is ${justified}`, async ({
      mount,
      page,
    }) => {
      await mount(<BoxComponentMulti justifyItems={justified} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("justify-items", justified);
    });
  });

  [
    "left",
    "center",
    "right",
    "flex-start",
    "flex-end",
    "normal",
    "space-between",
    "space-around",
    "stretch",
  ].forEach((justified) => {
    test(`should verify justifyContent is ${justified}`, async ({
      mount,
      page,
    }) => {
      await mount(<BoxComponentMulti justifyContent={justified} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("justify-content", justified);
    });
  });

  (["nowrap", "wrap", "wrap-reverse"] as const).forEach((wrap) => {
    test(`should verify flex wrap is ${wrap}`, async ({ mount, page }) => {
      await mount(<BoxComponentMulti flexWrap={wrap} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("flex-wrap", wrap);
    });
  });

  (["column", "column-reverse", "row", "row-reverse"] as const).forEach(
    (direction) => {
      test(`should verify flex direction is ${direction}`, async ({
        mount,
        page,
      }) => {
        await mount(<BoxComponentMulti flexDirection={direction} />);
        const boxElement = getDataElementByValue(page, "box");
        await expect(boxElement).toHaveCSS("flex-direction", direction);
      });
    },
  );

  ["auto", "content", "fit-content", "max-content", "min-content"].forEach(
    (flex) => {
      test(`should verify flex is ${flex}`, async ({ mount, page }) => {
        await mount(<BoxComponentMulti flex={flex} />);
        const boxElement = getDataElementByValue(page, "box");
        await expect(boxElement).toHaveCSS("flex-basis", flex);
      });
    },
  );

  (
    [
      [10, "10"],
      [50, "50"],
      [100, "100"],
    ] as [number, string][]
  ).forEach(([value, growText]) => {
    test(`should verify flex grow is ${value}`, async ({ mount, page }) => {
      await mount(<BoxComponentMulti flex="auto" flexGrow={value} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("flex-grow", growText);
    });
  });

  (
    [
      [10, "10"],
      [50, "50"],
      [100, "100"],
    ] as [number, string][]
  ).forEach(([value, shrinkText]) => {
    test(`should verify flex shrink is ${value}`, async ({ mount, page }) => {
      await mount(<BoxComponentMulti flex="auto" flexShrink={value} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("flex-shrink", shrinkText);
    });
  });

  ["auto", "content", "fit-content", "max-content", "min-content"].forEach(
    (basis) => {
      test(`should verify flex basis is ${basis}`, async ({ mount, page }) => {
        await mount(<BoxComponentMulti flexBasis={basis} />);
        const boxElement = getDataElementByValue(page, "box");
        await expect(boxElement).toHaveCSS("flex-basis", basis);
      });
    },
  );

  [
    "auto",
    "baseline",
    "left",
    "normal",
    "right",
    "stretch",
    "center",
    "flex-start",
    "flex-end",
  ].forEach((justify) => {
    test(`should verify justifySelf is ${justify}`, async ({ mount, page }) => {
      await mount(<BoxComponentMulti justifySelf={justify} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("justify-self", justify);
    });
  });

  [
    "auto",
    "baseline",
    "normal",
    "stretch",
    "center",
    "flex-start",
    "flex-end",
  ].forEach((align) => {
    test(`should verify alignSelf is ${align}`, async ({ mount, page }) => {
      await mount(<BoxComponentMulti alignSelf={align} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("align-self", align);
    });
  });

  (
    [
      [10, "10"],
      [50, "50"],
      [100, "100"],
    ] as [number, string][]
  ).forEach(([value, orderText]) => {
    test(`should verify order is ${value}`, async ({ mount, page }) => {
      await mount(<BoxComponentMulti order={value} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("order", orderText);
    });
  });

  (["break-word", "anywhere"] as const).forEach((wrap) => {
    test(`should verify overflow wrap is ${wrap}`, async ({ mount, page }) => {
      await mount(<BoxComponentMulti overflowWrap={wrap} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("overflow-wrap", wrap);
    });
  });

  (
    [
      ["light", "rgb(102, 132, 148) rgb(242, 245, 246)"],
      ["dark", "rgb(153, 173, 183) rgb(51, 91, 112)"],
    ] as const
  ).forEach(([variant, scrollbarColor]) => {
    test(`scrollbar has correct colours when scrollVariant prop is ${variant}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <BoxComponentMulti
          display="inline-block"
          size="150px"
          overflow="auto"
          scrollVariant={variant}
          mr="20px"
        />,
      );
      const box = page.getByText(/Supercalifrajilisticexpialidocious Word/);
      await expect(box).toHaveCSS("scrollbar-color", scrollbarColor);
    });
  });

  (["fixed", "absolute", "static", "sticky", "relative"] as const).forEach(
    (value) => {
      test(`should verify position is ${value}`, async ({ mount, page }) => {
        await mount(
          <Default
            top="0px"
            left="0px"
            right="0px"
            bottom="0px"
            position={value}
          />,
        );
        const boxElement = getDataElementByValue(page, "box");
        await expect(boxElement).toHaveCSS("top", "0px");
        await expect(boxElement).toHaveCSS("bottom", "0px");
        await expect(boxElement).toHaveCSS("right", "0px");
        await expect(boxElement).toHaveCSS("left", "0px");
        await expect(boxElement).toHaveCSS("position", value);
      });
    },
  );

  ([0, 1, 2, 3, 4, 5, 6, 7, 8, "20%", "20px"] as const).forEach((gap) => {
    test(`should verify gap prop sets expected CSS when set to ${gap}`, async ({
      mount,
      page,
    }) => {
      await mount(<Default display="flex" gap={gap} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS(
        "row-gap",
        typeof gap === "number" ? `${gap * 8}px` : gap,
      );
      await expect(boxElement).toHaveCSS(
        "column-gap",
        typeof gap === "number" ? `${gap * 8}px` : gap,
      );
    });
  });

  ([0, 1, 2, 3, 4, 5, 6, 7, 8, "20%", "20px"] as const).forEach((rowGap) => {
    test(`should verify rowGap prop sets expected CSS and overrides gap when set to ${rowGap}`, async ({
      mount,
      page,
    }) => {
      await mount(<Default display="flex" rowGap={rowGap} gap={8} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS(
        "row-gap",
        typeof rowGap === "number" ? `${rowGap * 8}px` : rowGap,
      );
      await expect(boxElement).toHaveCSS("column-gap", "64px");
    });
  });

  ([0, 1, 2, 3, 4, 5, 6, 7, 8, "20%", "20px"] as const).forEach((columnGap) => {
    test(`should verify columnGap prop sets expected CSS on and overrides gap when set to ${columnGap}`, async ({
      mount,
      page,
    }) => {
      await mount(<Default display="flex" columnGap={columnGap} gap={8} />);
      const boxElement = getDataElementByValue(page, "box");
      await expect(boxElement).toHaveCSS("row-gap", "64px");
      await expect(boxElement).toHaveCSS(
        "column-gap",
        typeof columnGap === "number" ? `${columnGap * 8}px` : columnGap,
      );
    });
  });

  test("should allow custom boxShadow prop values", async ({ mount, page }) => {
    await mount(<Default boxShadow="boxShadow400" />);
    const boxElement = getDataElementByValue(page, "box");
    await expect(boxElement).toHaveCSS(
      "box-shadow",
      "rgba(0, 20, 30, 0.04) 0px 10px 40px 0px, rgba(0, 20, 30, 0.1) 0px 50px 80px 0px",
    );
  });
});

test.describe("Accessibility tests for Box", () => {
  test("should pass accessibility tests for BoxDefault", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for BoxShadow story", async ({
    mount,
    page,
  }) => {
    await mount(<BoxShadow />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Color story", async ({
    mount,
    page,
  }) => {
    await mount(<Color />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Flex story", async ({
    mount,
    page,
  }) => {
    await mount(<Flex />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Gap story", async ({
    mount,
    page,
  }) => {
    await mount(<Gap />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Layout story", async ({
    mount,
    page,
  }) => {
    await mount(<Layout />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for OverflowWrap story", async ({
    mount,
    page,
  }) => {
    await mount(<OverflowWrap />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Position story", async ({
    mount,
    page,
  }) => {
    await mount(<Position />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Scroll story", async ({
    mount,
    page,
  }) => {
    await mount(<Scroll />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Spacing story", async ({
    mount,
    page,
  }) => {
    await mount(<Spacing />);
    await checkAccessibility(page);
  });
});

(
  [
    [undefined, "0px"],
    ["borderRadius025", "2px"],
    ["borderRadius050", "4px"],
    ["borderRadius100", "8px"],
    ["borderRadius200", "16px"],
    ["borderRadius400", "32px"],
  ] as [BoxProps["borderRadius"], string][]
).forEach(([borderRadius, expected]) => {
  test(`applies the expected border radius when ${borderRadius} passed to borderRadius prop`, async ({
    mount,
    page,
  }) => {
    await mount(<Default borderRadius={borderRadius} />);
    const boxElement = getDataElementByValue(page, "box");
    await expect(boxElement).toHaveCSS("border-radius", expected);
  });
});
