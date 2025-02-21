import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import {
  GridLayoutExample,
  ResponsiveGridExample,
  SimpleGridExample,
} from "../grid/components.test-pw";
import { gridContainer } from "../../../playwright/components/grid/index";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("Grid component", () => {
  test("renders each grid item in the correct row and column when gridRow and gridColumn props are specified", async ({
    mount,
    page,
  }) => {
    await mount(<GridLayoutExample />);

    await expect(page.getByText("Item 1")).toHaveCSS(
      "grid-area",
      "auto / 1 / auto / 13",
    );
    await expect(page.getByText("Item 2")).toHaveCSS(
      "grid-area",
      "2 / 1 / 3 / 6",
    );
    await expect(page.getByText("Item 3")).toHaveCSS(
      "grid-area",
      "4 / 7 / 5 / 13",
    );
  });

  test("renders grid item in the correct row and column when gridArea prop is specified", async ({
    mount,
    page,
  }) => {
    await mount(<SimpleGridExample gridArea="3 / 4 / 11 / 10" />);

    await expect(page.getByText("Item 1")).toHaveCSS(
      "grid-area",
      "3 / 4 / 11 / 10",
    );
  });

  (
    [
      [599, "16px", "16px"],
      [959, "24px", "16px"],
      [1259, "32px", "24px"],
      [1920, "40px", "24px"],
      [1922, "40px", "40px"],
    ] as const
  ).forEach(([viewportWidth, padding, gutter]) => {
    test(`automatically sets correct padding and gutter size when viewport width is ${viewportWidth}`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({
        width: viewportWidth,
        height: 900,
      });
      await mount(<GridLayoutExample />);

      await expect(gridContainer(page)).toHaveCSS("padding-left", padding);
      await expect(gridContainer(page)).toHaveCSS("gap", gutter);
    });
  });

  ["start", "end", "center", "stretch"].forEach((alignment) => {
    test(`grid item correctly has alignment set to ${alignment}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleGridExample alignSelf={alignment} />);

      await expect(page.getByText("Item 1")).toHaveCSS("align-self", alignment);
    });
  });

  ["start", "end", "center", "stretch"].forEach((justification) => {
    test(`grid item correctly has justification set to ${justification}`, async ({
      mount,
      page,
    }) => {
      await mount(<SimpleGridExample justifySelf={justification} />);

      await expect(page.getByText("Item 1")).toHaveCSS(
        "justify-self",
        justification,
      );
    });
  });

  test("when items have multiple layouts specified via their responsiveSettings prop, rearrange them in grid as viewport gets smaller", async ({
    mount,
    page,
  }) => {
    await mount(<ResponsiveGridExample />);
    await page.setViewportSize({ width: 1400, height: 900 });

    const firstItem = page.getByText("Item 1");
    const secondItem = page.getByText("Item 2");
    const thirdItem = page.getByText("Item 3");

    await expect(firstItem).toHaveCSS("grid-area", "1 / 1 / 1 / 7");
    await expect(secondItem).toHaveCSS("grid-area", "1 / 6 / 1 / 13");
    await expect(thirdItem).toHaveCSS("grid-area", "3 / 1 / 3 / 13");

    await page.setViewportSize({ width: 800, height: 900 });

    await expect(firstItem).toHaveCSS("grid-area", "2 / 1 / 2 / 9");
    await expect(secondItem).toHaveCSS("grid-area", "3 / 1 / 3 / 9");
    await expect(thirdItem).toHaveCSS("grid-area", "3 / 1 / 3 / 9");
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
