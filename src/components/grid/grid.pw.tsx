import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";

import {
  GridLayoutExample,
  ResponsiveGridExample,
  SimpleGridExample,
} from "../grid/components.test-pw";
import {
  gridItem,
  gridContainer,
} from "../../../playwright/components/grid/index";
import {
  checkAccessibility,
  assertCssValueIsApproximately,
} from "../../../playwright/support/helper";

test.describe("Grid component", () => {
  [
    [1, "auto / auto", "1 / 13", 1878],
    [2, "2 / 3", "1 / 6", 759],
    [3, "4 / 5", "7 / 13", 919],
  ].forEach(([itemNumber, row, col, expectedWidth]) => {
    test(`when viewport size is default, grid item ${itemNumber} should have correct grid-row, grid-column and width`, async ({
      mount,
      page,
    }) => {
      await mount(<GridLayoutExample />);
      await page.setViewportSize({ width: 1958, height: 900 });

      const expectedGridItem = gridItem(page, Number(itemNumber) - 1);

      await expect(expectedGridItem).toHaveCSS("grid-row", `${row}`);
      await expect(expectedGridItem).toHaveCSS("grid-column", `${col}`);
      await assertCssValueIsApproximately(
        expectedGridItem,
        "width",
        Number(expectedWidth)
      );
    });
  });

  [
    [1, "auto / auto", "1 / 13", 567],
    [2, "2 / 3", "1 / 6", 226],
    [3, "4 / 5", "7 / 13", 275],
  ].forEach(([itemNumber, row, col, expectedWidth]) => {
    test(`when viewport size is extra small, grid item ${itemNumber} should have correct grid-row, grid-column and width`, async ({
      mount,
      page,
    }) => {
      await mount(<GridLayoutExample />);
      await page.setViewportSize({ width: 599, height: 900 });

      const expectedGridItem = gridItem(page, Number(itemNumber) - 1);

      await expect(expectedGridItem).toHaveCSS("grid-row", `${row}`);
      await expect(expectedGridItem).toHaveCSS("grid-column", `${col}`);
      await assertCssValueIsApproximately(
        expectedGridItem,
        "width",
        Number(expectedWidth)
      );
    });
  });

  [
    [1, "auto / auto", "1 / 13", 911],
    [2, "2 / 3", "1 / 6", 370],
    [3, "4 / 5", "7 / 13", 447],
  ].forEach(([itemNumber, row, col, expectedWidth]) => {
    test(`when viewport size is small, grid item ${itemNumber} should have correct grid-row, grid-column and width`, async ({
      mount,
      page,
    }) => {
      await mount(<GridLayoutExample />);
      await page.setViewportSize({ width: 959, height: 900 });
      const expectedGridItem = gridItem(page, Number(itemNumber) - 1);

      await expect(expectedGridItem).toHaveCSS("grid-row", `${row}`);
      await expect(expectedGridItem).toHaveCSS("grid-column", `${col}`);
      await assertCssValueIsApproximately(
        expectedGridItem,
        "width",
        Number(expectedWidth)
      );
    });
  });

  [
    [1, "auto / auto", "1 / 13", 1194],
    [2, "2 / 3", "1 / 6", 483],
    [3, "4 / 5", "7 / 13", 585],
  ].forEach(([itemNumber, row, col, expectedWidth]) => {
    test(`when viewport size is medium, grid item ${itemNumber} should have correct grid-row, grid-column and width`, async ({
      mount,
      page,
    }) => {
      await mount(<GridLayoutExample />);
      await page.setViewportSize({ width: 1259, height: 900 });
      const expectedGridItem = gridItem(page, Number(itemNumber) - 1);

      await expect(expectedGridItem).toHaveCSS("grid-row", `${row}`);
      await expect(expectedGridItem).toHaveCSS("grid-column", `${col}`);
      await assertCssValueIsApproximately(
        expectedGridItem,
        "width",
        Number(expectedWidth)
      );
    });
  });

  [
    [1, "auto / auto", "1 / 13", 1842],
    [2, "2 / 3", "1 / 6", 752],
    [3, "4 / 5", "7 / 13", 906],
  ].forEach(([itemNumber, row, col, expectedWidth]) => {
    test(`when viewport size is large, grid item ${itemNumber} should have correct grid-row, grid-column and width`, async ({
      mount,
      page,
    }) => {
      await mount(<GridLayoutExample />);
      await page.setViewportSize({ width: 1920, height: 900 });
      const expectedGridItem = gridItem(page, Number(itemNumber) - 1);

      await expect(expectedGridItem).toHaveCSS("grid-row", `${row}`);
      await expect(expectedGridItem).toHaveCSS("grid-column", `${col}`);
      await assertCssValueIsApproximately(
        expectedGridItem,
        "width",
        Number(expectedWidth)
      );
    });
  });

  [
    [1, "auto / auto", "1 / 13", 1842],
    [2, "2 / 3", "1 / 6", 744],
    [3, "4 / 5", "7 / 13", 901],
  ].forEach(([itemNumber, row, col, expectedWidth]) => {
    test(`when viewport size is extra large, grid item ${itemNumber} should have correct grid-row, grid-column and width`, async ({
      mount,
      page,
    }) => {
      await mount(<GridLayoutExample />);
      await page.setViewportSize({ width: 1922, height: 900 });
      const expectedGridItem = gridItem(page, Number(itemNumber) - 1);

      await expect(expectedGridItem).toHaveCSS("grid-row", `${row}`);
      await expect(expectedGridItem).toHaveCSS("grid-column", `${col}`);
      await assertCssValueIsApproximately(
        expectedGridItem,
        "width",
        Number(expectedWidth)
      );
    });
  });

  [
    ["extra small", 599, 900, 16, 16],
    ["small", 959, 900, 24, 16],
    ["medium", 1259, 900, 32, 24],
    ["large", 1920, 900, 40, 24],
    ["extra large", 1922, 900, 40, 40],
  ].forEach(([screenSize, viewportWidth, viewportHeight, padding, gridGap]) => {
    test(`when viewport size is ${screenSize}, grid container has correct padding and row gap size`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleGridExample />);
      await page.setViewportSize({
        width: Number(viewportWidth),
        height: Number(viewportHeight),
      });

      await expect(gridContainer(page)).toHaveCSS(
        "padding-left",
        `${padding}px`
      );
      await expect(gridContainer(page)).toHaveCSS("row-gap", `${gridGap}px`);
    });
  });

  ["start", "end", "center", "stretch"].forEach((alignment) => {
    test(`grid item correctly has alignment set to ${alignment}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleGridExample alignSelf={alignment} />);

      await expect(gridItem(page, 0)).toHaveCSS("align-self", alignment);
    });
  });

  ["start", "end", "center", "stretch"].forEach((justification) => {
    test(`grid item correctly has justification set to ${justification}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleGridExample justifySelf={justification} />);

      await expect(gridItem(page, 0)).toHaveCSS("justify-self", justification);
    });
  });

  test("grid item has correct start and end columns when gridColumn prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleGridExample gridColumn="4 / 10" />);

    await expect(gridItem(page, 0)).toHaveCSS("grid-column-start", "4");
    await expect(gridItem(page, 0)).toHaveCSS("grid-column-end", "10");
  });

  test("grid item has correct start and end rows when gridRow prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleGridExample gridRow="4 / 11" />);

    await expect(gridItem(page, 0)).toHaveCSS("grid-row-start", "4");
    await expect(gridItem(page, 0)).toHaveCSS("grid-row-end", "11");
  });

  test("grid item has correct start and end columns and rows when gridArea prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleGridExample gridArea="3 / 4 / 11 / 10" />);

    await expect(gridItem(page, 0)).toHaveCSS("grid-column", "4 / 10");
    await expect(gridItem(page, 0)).toHaveCSS("grid-row", "3 / 11");
  });

  test("correctly renders grid items when each have responsive settings passed", async ({
    mount,
    page,
  }) => {
    await mount(<ResponsiveGridExample />);
    await page.setViewportSize({ width: 1400, height: 900 });

    const firstGridItem = gridItem(page, 0);
    const secondGridItem = gridItem(page, 1);
    const thirdGridItem = gridItem(page, 2);

    await expect(firstGridItem).toHaveCSS("grid-column", "1 / 7");
    await expect(firstGridItem).toHaveCSS("grid-row", "1 / 1");
    await expect(firstGridItem).toHaveCSS("align-self", "stretch");
    await expect(firstGridItem).toHaveCSS("justify-self", "stretch");
    await assertCssValueIsApproximately(firstGridItem, "width", 648);

    await expect(secondGridItem).toHaveCSS("grid-column", "6 / 13");
    await expect(secondGridItem).toHaveCSS("grid-row", "1 / 1");
    await expect(secondGridItem).toHaveCSS("align-self", "end");
    await expect(secondGridItem).toHaveCSS("justify-self", "end");
    await assertCssValueIsApproximately(secondGridItem, "width", 73);

    await expect(thirdGridItem).toHaveCSS("grid-column", "1 / 13");
    await expect(thirdGridItem).toHaveCSS("grid-row", "3 / 3");
    await expect(thirdGridItem).toHaveCSS("align-self", "start");
    await expect(thirdGridItem).toHaveCSS("justify-self", "stretch");
    await assertCssValueIsApproximately(thirdGridItem, "width", 1320);
  });
});

test.describe("Accessibility tests for Grid component", () => {
  test("should pass accessibility tests for Simple Grid example", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleGridExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Grid Layout example", async ({
    mount,
    page,
  }) => {
    await mount(<GridLayoutExample />);

    await checkAccessibility(page);
  });

  ["start", "end", "center", "stretch"].forEach((alignment) => {
    test(`should pass accessibility tests for Grid with alignment set to ${alignment}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleGridExample alignSelf={alignment} />);

      await checkAccessibility(page);
    });
  });

  ["start", "end", "center", "stretch"].forEach((justification) => {
    test(`should pass accessibility tests for Grid with justification set to ${justification}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleGridExample justifySelf={justification} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests for Grid when gridColumn prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleGridExample gridColumn="4 / 10" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Grid when gridRow prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleGridExample gridRow="4 / 11" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Grid when gridArea prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleGridExample gridArea="3 / 4 / 11 / 10" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Grid when grid items each have responsive settings passed", async ({
    mount,
    page,
  }) => {
    await mount(<ResponsiveGridExample />);

    await checkAccessibility(page);
  });
});
