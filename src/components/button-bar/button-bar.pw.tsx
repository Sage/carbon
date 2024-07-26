import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
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

test.describe("check props for Button-Bar component", () => {
  [
    { size: BUTTON_BAR_SIZES[0], expectedMinHeight: "32px" },
    { size: BUTTON_BAR_SIZES[1], expectedMinHeight: "40px" },
    { size: BUTTON_BAR_SIZES[2], expectedMinHeight: "48px" },
  ].forEach(({ size, expectedMinHeight }) => {
    test(`should set size to ${size} for a Button-Bar`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonBarCustom size={size} />);
      const button = buttonDataComponent(page);

      await expect(button.nth(0)).toHaveCSS("min-height", expectedMinHeight);
      await expect(button.nth(1)).toHaveCSS("min-height", expectedMinHeight);
      await expect(button.nth(2)).toHaveCSS("min-height", expectedMinHeight);
    });
  });

  [
    {
      iconPosition: BUTTON_BAR_ICON_POSITIONS[0],
      expectedMargin: "margin-right",
    },
    {
      iconPosition: BUTTON_BAR_ICON_POSITIONS[1],
      expectedMargin: "margin-left",
    },
  ].forEach(({ iconPosition, expectedMargin }) => {
    test(`should set position to ${iconPosition} for icon in a Button-Bar`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonBarCustom iconPosition={iconPosition} />);

      await expect(icon(page).nth(0)).toHaveCSS(expectedMargin, "8px");
      await expect(icon(page).nth(1)).toHaveCSS(expectedMargin, "8px");
      await expect(icon(page).nth(2)).toHaveCSS(expectedMargin, "8px");
    });
  });

  test("should render Button-Bar with full width", async ({ mount, page }) => {
    await mount(<ButtonBarCustom fullWidth />);
    await expect(buttonDataComponent(page).locator("..")).toHaveCSS(
      "width",
      "1366px",
    );
  });
});

test.describe("accessibility tests", async () => {
  [BUTTON_BAR_SIZES[0], BUTTON_BAR_SIZES[1], BUTTON_BAR_SIZES[2]].forEach(
    (size) => {
      test(`should check accessibility for ${size} size for a Button-Bar`, async ({
        mount,
        page,
      }) => {
        await mount(<ButtonBarCustom size={size} />);

        await checkAccessibility(page);
      });
    },
  );

  [BUTTON_BAR_ICON_POSITIONS[0], BUTTON_BAR_ICON_POSITIONS[1]].forEach(
    (iconPosition) => {
      test(`should check accessibility for ${iconPosition} icon position in a Button-Bar`, async ({
        mount,
        page,
      }) => {
        await mount(<ButtonBarCustom iconPosition={iconPosition} />);

        await checkAccessibility(page);
      });
    },
  );

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

  const buttonAtIndex = (index: number) => buttonDataComponent(page).nth(index);

  await buttonAtIndex(0).focus();
  await buttonAtIndex(0).press("Tab");
  await expect(buttonAtIndex(1)).toBeFocused();
  await expect(buttonAtIndex(0)).not.toBeFocused();

  await buttonAtIndex(1).press("Tab");
  await expect(buttonAtIndex(2)).toBeFocused();
  await expect(buttonAtIndex(1)).not.toBeFocused();
});

test.describe("when custom Button wrapper components are used as children in ButtonBar", async () => {
  test("Button size is small when the size prop is set to small and passed to ButtonBar", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonBarWithWrapper size="small" />);

    const buttonWidthPromises = [0, 1, 2].map((i) =>
      getStyle(buttonDataComponent(page).nth(i), "width"),
    );
    const buttonWidths = await Promise.all(buttonWidthPromises);
    buttonWidths.forEach((width) =>
      expect(parseFloat(width)).toBeCloseTo(86, 0),
    );
  });

  [
    { iconPosition: "before" as const, expectedMargin: "margin-right" },
    { iconPosition: "after" as const, expectedMargin: "margin-left" },
  ].forEach(({ iconPosition, expectedMargin }) => {
    test(`Button Icon position is ${iconPosition} text when the iconPosition is set and passed to ButtonBar`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonBarWithWrapper iconPosition={iconPosition} />);
      await expect(icon(page).nth(0)).toHaveCSS(expectedMargin, "8px");
      await expect(icon(page).nth(1)).toHaveCSS(expectedMargin, "8px");
      await expect(icon(page).nth(2)).toHaveCSS(expectedMargin, "8px");
    });
  });

  test("should verify ButtonBar with wrapped components can be navigated using keyboard", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonBarWithWrapper />);

    const buttonAtIndex = (index: number) =>
      buttonDataComponent(page).nth(index);

    await buttonAtIndex(0).focus();
    await buttonAtIndex(0).press("Tab");
    await expect(buttonAtIndex(1)).toBeFocused();
    await expect(buttonAtIndex(0)).not.toBeFocused();

    await buttonAtIndex(1).press("Tab");
    await expect(buttonAtIndex(2)).toBeFocused();
    await expect(buttonAtIndex(1)).not.toBeFocused();

    await buttonAtIndex(2).press("Tab");

    await expect(page.getByLabel("csv")).toBeFocused();
    await expect(buttonAtIndex(2)).not.toBeFocused();
  });
});

test.describe("renders with ButtonMinor children", async () => {
  const indexes = [0, 1, 2];

  test.beforeEach(async ({ mount }) => {
    await mount(<ButtonBarMinor />);
  });

  indexes.forEach((index) => {
    test(`should apply correct background-color on hover for ${index} ButtonMinor children`, async ({
      page,
    }) => {
      const minorButton = buttonMinorComponent(page, index);
      await expect(minorButton).toHaveCSS(
        "background-color",
        "rgba(0, 0, 0, 0)",
      );

      await minorButton.hover();
      await expect(minorButton).toHaveCSS(
        "background-color",
        "rgb(51, 91, 112)",
      );
    });

    test(`should apply the correct color to the ${index} ButtonMinor children`, async ({
      page,
    }) => {
      const minorButton = buttonMinorComponent(page, index);
      await expect(minorButton).toHaveCSS("color", "rgb(51, 91, 112)");

      await minorButton.hover();
      await expect(minorButton).toHaveCSS("color", "rgb(255, 255, 255)");
    });

    test(`should check Button Minor Bar have correct border-color for the ${index} button`, async ({
      page,
    }) => {
      const colorByIndex =
        index === 2
          ? "rgb(51, 91, 112)"
          : "rgb(51, 91, 112) rgba(0, 0, 0, 0) rgb(51, 91, 112) rgb(51, 91, 112)";

      const minorButton = buttonMinorComponent(page, index);
      await expect(minorButton).toHaveCSS("border-color", colorByIndex);

      await minorButton.hover();
      await expect(minorButton).toHaveCSS("border-color", "rgb(51, 91, 112)");
    });
  });
});
