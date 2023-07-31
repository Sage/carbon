import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import { ButtonBarProps } from "components/button-bar";
import {
  Default as ButtonBarCustom,
  DefaultWithWrapper as ButtonBarWithWrapper,
  DefaultWithButtonMinor as ButtonBarMinor,
} from "./components.test-pw";

import {
  BUTTON_BAR_SIZES,
  BUTTON_BAR_ICON_POSITIONS,
} from "./button-bar.config";

import {
  buttonDataComponent,
  buttonMinorComponent,
} from "../../../playwright/components/button/index";
import { icon } from "../../../playwright/components/index";
import {
  checkAccessibility,
  getStyle,
} from "../../../playwright/support/helper";

const sizeAndPx = [
  [BUTTON_BAR_SIZES[0], 32],
  [BUTTON_BAR_SIZES[1], 40],
  [BUTTON_BAR_SIZES[2], 48],
] as [ButtonBarProps["size"], number][];

const positionAndAssertion = [
  [BUTTON_BAR_ICON_POSITIONS[0], "right"],
  [BUTTON_BAR_ICON_POSITIONS[1], "left"],
] as [ButtonBarProps["iconPosition"], string][];

const beforeAndAfter = [
  ["after", "left"],
  ["before", "right"],
] as [ButtonBarProps["iconPosition"], string][];

test.describe("check props for Button-Bar component", () => {
  sizeAndPx.forEach((array) => {
    const [size, px] = array;
    test(`should set size to ${size} for a Button-Bar`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonBarCustom size={size} />);
      const button = await buttonDataComponent(page);

      for (let i = 0; i < 3; i++) {
        const cssValue = await getStyle(button.nth(i), "min-height");
        await expect(cssValue).toContain(`${px}px`);
      }
    });
  });

  positionAndAssertion.forEach((array) => {
    const [iconPosition, margin] = array;
    test(`should set position to ${iconPosition} for icon in a Button-Bar`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonBarCustom iconPosition={iconPosition} />);

      for (let i = 0; i < 3; i++) {
        const cssValue = await getStyle(
          (await icon(page)).nth(i),
          `margin-${margin}`
        );

        await expect(cssValue).toEqual("8px");
      }
    });
  });

  test("should render Button-Bar with full width", async ({ mount, page }) => {
    await mount(<ButtonBarCustom fullWidth />);

    const cssValue = await getStyle(
      (await buttonDataComponent(page)).locator(".."),
      "width"
    );

    await expect(cssValue).toEqual("1366px");
  });
});

test.describe("accessibility tests", async () => {
  sizeAndPx.forEach((array) => {
    const [size] = array;
    test(`should check accessibility for ${size} size for a Button-Bar`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonBarCustom size={size} />);

      await checkAccessibility(page);
    });
  });

  positionAndAssertion.forEach((array) => {
    const [iconPosition] = array;
    test(`should check accessibility for ${iconPosition} icon position in a Button-Bar`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonBarCustom iconPosition={iconPosition} />);

      await checkAccessibility(page);
    });
  });

  test("should check the accessibility of Button-Bar with full width", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonBarCustom fullWidth />);

    await checkAccessibility(page);
  });
});

test("should verify ButtonBar with wrapped components can be navigated using keyboard", async ({
  mount,
  page,
}) => {
  await mount(<ButtonBarCustom />);

  const button = async (index: number) =>
    await (await buttonDataComponent(page)).nth(index);

  await (await button(0)).focus();
  (await button(0)).press("Tab");
  await expect(await button(1)).toBeFocused();
  await expect(await button(0)).not.toBeFocused();

  (await button(1)).press("Tab");
  await expect(await button(2)).toBeFocused();
  await expect(await button(1)).not.toBeFocused();
});

test.describe(
  "when custom Button wrapper components are used as children in ButtonBar",
  async () => {
    test("Button size is small when the size prop is set to small and passed to ButtonBar", async ({
      mount,
      page,
    }) => {
      await mount(<ButtonBarWithWrapper size="small" />);

      for (let i = 0; i < 3; i++) {
        const cssValue = await getStyle(
          (await buttonDataComponent(page)).nth(i),
          "width"
        );

        await expect(parseInt(cssValue).toFixed(0)).toContain("81");
      }
    });

    beforeAndAfter.forEach((array) => {
      const [iconPosition, margin] = array;
      test(`Button Icon position is ${iconPosition} text when the iconPosition is set and passed to ButtonBar`, async ({
        mount,
        page,
      }) => {
        await mount(<ButtonBarWithWrapper iconPosition={iconPosition} />);

        for (let i = 0; i < 3; i++) {
          const cssValue = await getStyle(
            (await icon(page)).nth(i),
            `margin-${margin}`
          );

          await expect(cssValue).toEqual("8px");
        }
      });
    });

    test("should verify ButtonBar with wrapped components can be navigated using keyboard", async ({
      mount,
      page,
    }) => {
      await mount(<ButtonBarWithWrapper />);

      const button = async (index: number) =>
        await (await buttonDataComponent(page)).nth(index);

      await (await button(0)).focus();
      (await button(0)).press("Tab");
      await expect(await button(1)).toBeFocused();
      await expect(await button(0)).not.toBeFocused();

      (await button(1)).press("Tab");
      await expect(await button(2)).toBeFocused();
      await expect(await button(1)).not.toBeFocused();

      (await button(2)).press("Tab");

      await expect(page.getByLabel("csv")).toBeFocused();
      await expect(await button(2)).not.toBeFocused();
    });
  }
);

test.describe("renders with ButtonMinor children", async () => {
  const indexes = [0, 1, 2];

  test.beforeEach(async ({ mount }) => {
    await mount(<ButtonBarMinor />);
  });

  indexes.forEach((index) => {
    test(`should apply correct background-color on hover for ${index} ButtonMinor children`, async ({
      page,
    }) => {
      const cssValue = await getStyle(
        await buttonMinorComponent(page, index),
        "background-color"
      );

      await expect(cssValue).toEqual("rgba(0, 0, 0, 0)");

      await (await buttonMinorComponent(page, index)).hover();

      const cssValueNew = await getStyle(
        await buttonMinorComponent(page, index),
        "background-color"
      );

      await expect(cssValueNew).toEqual("rgb(51, 91, 112)");
    });

    test(`should apply the correct color to the ${index} ButtonMinor children`, async ({
      page,
    }) => {
      const cssValue = await getStyle(
        await buttonMinorComponent(page, index),
        "color"
      );

      await expect(cssValue).toEqual("rgb(51, 91, 112)");

      await (await buttonMinorComponent(page, index)).hover();

      const cssValueNew = await getStyle(
        await buttonMinorComponent(page, index),
        "color"
      );

      await expect(cssValueNew).toEqual("rgb(255, 255, 255)");
    });

    test(`should check Button Minor Bar have correct border-color for the ${index} button`, async ({
      page,
    }) => {
      const colorByIndex =
        index === 2
          ? "rgb(51, 91, 112)"
          : "rgb(51, 91, 112) rgba(0, 0, 0, 0) rgb(51, 91, 112) rgb(51, 91, 112)";

      const cssValue = await getStyle(
        await buttonMinorComponent(page, index),
        "border-color"
      );

      await expect(cssValue).toEqual(colorByIndex);

      await (await buttonMinorComponent(page, index)).hover();

      const cssValueNew = await getStyle(
        await buttonMinorComponent(page, index),
        "border-color"
      );

      await expect(cssValueNew).toEqual("rgb(51, 91, 112)");
    });
  });
});
