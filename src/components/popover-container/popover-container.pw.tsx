import React from "react";
import type { Locator } from "@playwright/test";
import { test, expect } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  PopoverContainerWithSelect,
  Default,
  CoverButton,
  PopoverContainerOverlappingAdaptiveSidebar,
  PopoverContainerOpenInDialog,
} from "./components.test-pw";

test.describe("Check props of Popover Container component", () => {
  test("should not close when an option is selected from a Select component inside", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverContainerWithSelect />);

    const openButton = page.getByRole("button", { name: "Actions" });
    await openButton.click();
    const popoverContainer = page.getByRole("dialog", {
      name: "select example",
    });
    const select = page.getByText("Please Select...", { exact: true });
    await select.click();
    const greenOption = page.getByRole("option", { name: "green" });
    await greenOption.click();

    await expect(popoverContainer).toBeVisible();
  });

  test("should not close when the Escape key is pressed and the Select List is open", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverContainerWithSelect />);

    const openButton = page.getByRole("button", { name: "Actions" });
    await openButton.click();
    const popoverContainer = page.getByRole("dialog", {
      name: "select example",
    });
    const select = page.getByText("Please Select...", { exact: true });
    await select.click();
    await select.press("Escape");

    await expect(popoverContainer).toBeVisible();
  });

  test("should close when the Escape key is pressed with focus on the Select component", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverContainerWithSelect />);

    const openButton = page.getByRole("button", { name: "Actions" });
    await openButton.click();
    const popoverContainer = page.getByRole("dialog", {
      name: "select example",
    });
    const select = page.getByText("Please Select...", { exact: true });
    await select.focus();
    await popoverContainer.press("Escape");

    await expect(popoverContainer).toBeHidden();
  });

  test("should render an adaptive sidebar above an overlapping open popover container when the sidebar is a modal", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverContainerOverlappingAdaptiveSidebar />);

    const popoverZIndex = await page
      .locator('[data-element="popover-container-content"]')
      .evaluate((element) => parseInt(getComputedStyle(element).zIndex, 10));

    const sidebarZIndex = await page
      .getByRole("dialog", { name: "sidebar" })
      .evaluate((element) => parseInt(getComputedStyle(element).zIndex, 10));

    expect(sidebarZIndex).toBeGreaterThan(popoverZIndex);
  });

  test("should be visible and aligned with its trigger when initially open in a Dialog, on mount and after scrolling", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverContainerOpenInDialog />);

    const popover = page.getByRole("dialog", {
      name: "Popover title",
      exact: true,
    });
    const reference = page.locator(".popover-open-component");

    const getBox = async (locator: Locator) => {
      const box = await locator.boundingBox();
      expect(box).not.toBeNull();
      return box as { x: number; y: number; width: number; height: number };
    };

    const getGap = async () => {
      const popoverBox = await getBox(popover);
      const referenceBox = await getBox(reference);

      return {
        // distance between the reference's bottom edge and the popover's
        // top edge, expected to equal the default 6px offset
        vertical: popoverBox.y - (referenceBox.y + referenceBox.height),
        // position="right" maps to bottom-start, so the left edges line up
        left: Math.abs(popoverBox.x - referenceBox.x),
      };
    };

    const expectAligned = async () => {
      await expect(popover).toBeVisible();
      await expect(reference).toBeVisible();
      await expect
        .poll(async () => (await getGap()).vertical)
        .toBeGreaterThanOrEqual(4);
      await expect
        .poll(async () => (await getGap()).vertical)
        .toBeLessThanOrEqual(8);
      await expect
        .poll(async () => (await getGap()).left)
        .toBeLessThanOrEqual(2);
    };

    await expectAligned();

    const yBefore = (await getBox(reference)).y;

    await page.getByRole("dialog", { name: "Dialog", exact: true }).hover();
    await page.mouse.wheel(0, 100);

    await expect
      .poll(async () => (await getBox(reference)).y)
      .toBeLessThan(yBefore);

    await expectAligned();
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
