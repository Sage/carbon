import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  PopoverContainerWithSelect,
  Default,
  CoverButton,
} from "../popover-container/components.test-pw";

test.describe("Check props of Popover Container component", () => {
  test("should not close when an option is selected from a Select component inside", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverContainerWithSelect />);

    const openButton = page.getByRole("button", { name: "open" });
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

    const openButton = page.getByRole("button", { name: "open" });
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

    const openButton = page.getByRole("button", { name: "open" });
    await openButton.click();
    const popoverContainer = page.getByRole("dialog", {
      name: "select example",
    });
    const select = page.getByText("Please Select...", { exact: true });
    await select.focus();
    await popoverContainer.press("Escape");

    await expect(popoverContainer).toBeHidden();
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
