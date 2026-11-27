import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  PopoverContainerWithSelect,
  Default,
  CoverButton,
  PopoverContainerOverlappingAdaptiveSidebar,
  MenuItemAsOpenComponent,
  MenuItemAsOpenComponentInSubmenu,
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
    const select = page.getByRole("combobox");
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
    const select = page.getByRole("combobox");
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
    const select = page.getByRole("combobox");
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

  test("should close when a MenuItem open component is clicked twice", async ({
    mount,
    page,
  }) => {
    await mount(<MenuItemAsOpenComponent />);

    const openButton = page.getByRole("button", { name: "Notifications" });
    const popoverContainer = page.getByRole("dialog", {
      name: "notifications",
    });
    await openButton.click();
    await expect(popoverContainer).toBeVisible();
    await openButton.click();

    await expect(popoverContainer).toBeHidden();
  });

  test("should handle clicks and the Escape key for a MenuItem open component", async ({
    mount,
    page,
  }) => {
    await mount(<MenuItemAsOpenComponent />);

    const openButton = page.getByRole("button", { name: "Notifications" });
    const popoverContainer = page.getByRole("dialog", {
      name: "notifications",
    });

    await openButton.click();
    await popoverContainer.getByText("You are all caught up!").click();
    await expect(popoverContainer).toBeVisible();

    await page.mouse.click(1000, 600);
    await expect(popoverContainer).toBeHidden();

    await openButton.click();
    await expect(popoverContainer).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(popoverContainer).toBeHidden();
  });

  test("should position the popup below a MenuItem open component", async ({
    mount,
    page,
  }) => {
    await mount(<MenuItemAsOpenComponent />);

    const openButton = page.getByRole("button", { name: "Notifications" });
    const popoverContainer = page.getByRole("dialog", {
      name: "notifications",
    });
    await openButton.click();

    // polled because the popup is positioned and animated after it mounts
    await expect(async () => {
      const listItem = await page
        .getByRole("listitem")
        .filter({ has: openButton })
        .boundingBox();
      const popup = await popoverContainer.boundingBox();

      expect(Math.abs((popup?.x ?? 0) - (listItem?.x ?? 0))).toBeLessThan(2);
      expect(popup?.y ?? 0).toBeGreaterThanOrEqual(
        (listItem?.y ?? 0) + (listItem?.height ?? 0),
      );
    }).toPass();
  });
  
  test.describe("Accessibility tests", () => {
    test("should check accessibility for MenuItem as open component inside a Menu", async ({
      mount,
      page,
    }) => {
      await mount(<MenuItemAsOpenComponent />);

      await checkAccessibility(page);

      await page.getByRole("button", { name: "Notifications" }).click();
      await page.getByRole("dialog", { name: "notifications" }).waitFor();

      await checkAccessibility(page);
    });

    test("should check accessibility for MenuItem as open component inside a submenu", async ({
      mount,
      page,
    }) => {
      await mount(<MenuItemAsOpenComponentInSubmenu />);

      await page.getByRole("button", { name: "More" }).click();
      await page.getByRole("button", { name: "Notifications" }).waitFor();

      await checkAccessibility(page);
    });

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
