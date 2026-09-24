import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  Default,
  CoverButton,
  PopoverContainerOverlappingAdaptiveSidebar,
} from "./components.test-pw";

test.describe("Check props of Popover Container component", () => {
  test("should render an adaptive sidebar above an overlapping open popover container when the sidebar is a modal", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverContainerOverlappingAdaptiveSidebar />);

    const popoverZIndex = await page
      .locator('[data-element="popover-container-content"]')
      .evaluate((element) => parseInt(getComputedStyle(element).zIndex, 10));

    const sidebarZIndex = await page
      .locator('[data-role="adaptive-sidebar-modal-view"]')
      .evaluate((element) => parseInt(getComputedStyle(element).zIndex, 10));

    expect(sidebarZIndex).toBeGreaterThan(popoverZIndex);
  });

  test.describe("Accessibility tests", () => {
    test("should check accessibility for Default example", async ({
      mount,
      page,
    }) => {
      await mount(<Default title="Planes, Trains and Automobiles" open />);

      await checkAccessibility(page);
    });

    test("should check accessibility for CoverButton example", async ({
      mount,
      page,
    }) => {
      await mount(<CoverButton />);

      const openButton = page.getByRole("button");
      await openButton.click();

      const popoverTitle = page.getByText("Cover Button");
      await popoverTitle.waitFor();

      await checkAccessibility(page);
    });
  });
});
