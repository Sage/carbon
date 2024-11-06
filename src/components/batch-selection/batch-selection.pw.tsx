import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import { BatchSelectionProps } from "../../../src/components/batch-selection";
import {
  BatchSelectionComponent,
  BatchSelectionDisabledComponent,
  BatchSelectionLinkOnlyDisabledComponent,
} from "./components.test-pw";
import {
  checkAccessibility,
  positionOfElement,
  checkGoldenOutline,
} from "../../../playwright/support/helper";

import {
  batchSelectionCounter,
  batchSelectionComponent,
  batchSelectionButtonsByPosition,
} from "../../../playwright/components/batch-selection";
import {
  buttonDataComponent,
  buttonMinorComponent,
} from "../../../playwright/components/button";
import { relLink as linkAnchor } from "../../../playwright/components/link";
import {
  getComponent,
  icon as buttonIcon,
} from "../../../playwright/components/index";
import { HooksConfig } from "../../../playwright";

const BATCH_SELECTION_COLOR = [
  "dark",
  "light",
  "white",
  "transparent",
] as const;

test.describe("check BatchSelection component properties", () => {
  [0, 10, 100].forEach((selectedCount) => {
    test(`check BatchSelection component ${selectedCount} selected Count`, async ({
      mount,
      page,
    }) => {
      await mount(<BatchSelectionComponent selectedCount={selectedCount} />);

      await expect(batchSelectionCounter(page)).toHaveText(
        `${selectedCount} selected`,
      );
    });
  });

  test("should check hidden BatchSelection", async ({ mount, page }) => {
    await mount(<BatchSelectionComponent hidden />);
    const batchSelection = batchSelectionComponent(page);
    await expect(batchSelection).toHaveAttribute("hidden", /.*/);
    await expect(batchSelection).not.toBeVisible();
  });

  test("should check disabled BatchSelection", async ({ mount, page }) => {
    await mount(<BatchSelectionComponent disabled />);
    const batchSelection = batchSelectionComponent(page);

    await expect(batchSelection).toHaveAttribute("disabled", /.*/);
  });

  test("all supported button children are automatically disabled in a disabled BatchSelection", async ({
    mount,
    page,
  }) => {
    await mount(<BatchSelectionDisabledComponent />);

    const button = buttonDataComponent(page);
    const buttonMinor = buttonMinorComponent(page);
    const iconButton = page.locator('button[aria-label="icon-button"]');
    const linkButton = page.locator('button[aria-label="link-button"]');

    await expect(button).toBeDisabled();
    await expect(buttonMinor).toBeDisabled();
    await expect(iconButton).toBeDisabled();
    await expect(linkButton).toBeDisabled();
  });

  test("the link component is automatically disabled in a disabled BatchSelection", async ({
    mount,
    page,
  }) => {
    await mount(<BatchSelectionDisabledComponent />);

    const link = linkAnchor(page);
    await expect(link).toHaveCSS("cursor", "not-allowed");

    await link.focus();
    await expect(link).not.toBeFocused();
  });

  (
    [
      [0, "IconButton"],
      [1, "Button"],
      [2, "ButtonMinor"],
      [3, "Link"],
      [4, "LinkButton"],
    ] as [number, string][]
  ).forEach(([iconIndex, supportedChildren]) => {
    test(`${supportedChildren}'s icon color matches disabled styling in a disabled BatchSelection`, async ({
      mount,
      page,
    }) => {
      await mount(<BatchSelectionDisabledComponent />);

      const icon = buttonIcon(page).nth(iconIndex);
      await expect(icon).toHaveCSS("color", "rgba(0, 0, 0, 0.3)");
    });
  });

  test("Link's icon color matches disabled styling in a disabled BatchSelection on hover", async ({
    mount,
    page,
  }) => {
    await mount(<BatchSelectionLinkOnlyDisabledComponent />);

    const link = linkAnchor(page);
    const icon = buttonIcon(page);
    await link.hover();
    await expect(icon).toHaveCSS("color", "rgba(0, 0, 0, 0.3)");
  });

  test("all supported button children's text color matches disabled styling in a disabled BatchSelection`", async ({
    mount,
    page,
  }) => {
    await mount(<BatchSelectionDisabledComponent />);
    const button = buttonDataComponent(page);
    const buttonMinor = buttonMinorComponent(page);
    const link = linkAnchor(page);
    const linkButton = page.locator('button[aria-label="link-button"]');

    await expect(button).toHaveCSS("color", "rgba(0, 0, 0, 0.3)");
    await expect(buttonMinor).toHaveCSS("color", "rgba(0, 0, 0, 0.3)");
    await expect(link).toHaveCSS("color", "rgba(0, 0, 0, 0.3)");
    await expect(linkButton).toHaveCSS("color", "rgba(0, 0, 0, 0.3)");
  });

  test("Link's text color matches disabled styling in a disabled BatchSelection on hover", async ({
    mount,
    page,
  }) => {
    await mount(<BatchSelectionLinkOnlyDisabledComponent />);

    const link = linkAnchor(page);
    await link.hover();
    await expect(link).toHaveCSS("color", "rgba(0, 0, 0, 0.3)");
  });

  (
    [
      [BATCH_SELECTION_COLOR[0], "rgb(0, 50, 76)"],
      [BATCH_SELECTION_COLOR[1], "rgb(179, 194, 201)"],
      [BATCH_SELECTION_COLOR[2], "rgb(255, 255, 255)"],
      [BATCH_SELECTION_COLOR[3], "rgba(0, 0, 0, 0)"],
    ] as [BatchSelectionProps["colorTheme"], string][]
  ).forEach(([colorTheme, backgroundColor]) => {
    test(`check background color is ${backgroundColor} when colorTheme is ${colorTheme}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <BatchSelectionComponent colorTheme={colorTheme} selectedCount={0} />,
      );

      const batchSelection = getComponent(page, "batch-selection");
      await expect(batchSelection).toHaveCSS(
        "background-color",
        backgroundColor,
      );
    });
  });
});

test.describe("check BatchSelection buttons are focused", () => {
  (["first", "second", "third"] as const).forEach((index) => {
    test(`should check BatchSelection ${index} button has expected styling when focusRedesignOptOut is true`, async ({
      mount,
      page,
    }) => {
      await mount<HooksConfig>(<BatchSelectionComponent selectedCount={1} />, {
        hooksConfig: { focusRedesignOptOut: true },
      });

      const elementLocator = batchSelectionButtonsByPosition(
        page,
        positionOfElement(index),
      );

      const element = elementLocator;
      await element.focus();

      await checkGoldenOutline(elementLocator);
      await expect(elementLocator).toBeVisible();
    });
  });

  (["first", "second", "third"] as const).forEach((index) => {
    test(`should check BatchSelection ${index} button has expected styling when focusRedesignOptOut is false`, async ({
      mount,
      page,
    }) => {
      await mount(<BatchSelectionComponent selectedCount={1} />);

      const elementLocator = batchSelectionButtonsByPosition(
        page,
        positionOfElement(index),
      );
      const element = elementLocator;
      await element.focus();

      await expect(elementLocator).toHaveCSS(
        "box-shadow",
        "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
      );

      await expect(elementLocator).toHaveCSS(
        "outline",
        "rgba(0, 0, 0, 0) solid 3px",
      );
    });
  });
});

test.describe("rounded corners", () => {
  [
    BATCH_SELECTION_COLOR[0],
    BATCH_SELECTION_COLOR[1],
    BATCH_SELECTION_COLOR[2],
    BATCH_SELECTION_COLOR[3],
  ].forEach((colorTheme) => {
    test(`should render with expected border radius styling when colorTheme is ${colorTheme}`, async ({
      mount,
      page,
    }) => {
      await mount(<BatchSelectionComponent colorTheme={colorTheme} />);

      await expect(batchSelectionComponent(page)).toHaveCSS(
        "border-radius",
        "8px",
      );
    });
  });
});

test.describe("Accessibility tests for Batch Selection", () => {
  [
    BATCH_SELECTION_COLOR[0],
    BATCH_SELECTION_COLOR[1],
    BATCH_SELECTION_COLOR[2],
    BATCH_SELECTION_COLOR[3],
  ].forEach((colorTheme) => {
    test(`should pass accessibility test for BatchSelection component when colorTheme is ${colorTheme}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <BatchSelectionComponent colorTheme={colorTheme} selectedCount={3} />,
      );

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility test for hidden BatchSelection", async ({
    mount,
    page,
  }) => {
    await mount(<BatchSelectionComponent hidden selectedCount={3} />);
    await checkAccessibility(page);
  });

  // FE-4609
  test.skip("should pass accessibility test for disabled BatchSelection", async ({
    mount,
    page,
  }) => {
    await mount(<BatchSelectionComponent disabled selectedCount={3} />);
    await checkAccessibility(page);
  });

  // FE-4609
  test.skip("should pass accessibility test for disabled BatchSelection with all supported disabled button children", async ({
    mount,
    page,
  }) => {
    await mount(<BatchSelectionComponent disabled selectedCount={3} />);
    await checkAccessibility(page);
  });
});
