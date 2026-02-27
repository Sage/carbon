import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import {
  DialogComponent,
  DialogFullscreen,
  DialogWithFirstFocusableElement,
  DialogWithHeadingVariantCaution,
  DialogWithHeadingVariantNegative,
  DialogWithHeadingVariantPositive,
  DialogWithHeadingVariantSubtle,
  DialogWithHeadingVariantInfo,
} from "./components-test.pw";
import { checkAccessibility } from "../../../../../playwright/support/helper";

test.describe("Dialog component", () => {
  test("should render with a title and close icon", async ({ mount, page }) => {
    await mount(<DialogComponent />);

    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("My dialog")).toBeVisible();
    await expect(page.getByLabel("Close")).toBeVisible();
  });

  test("should close when clicking the close icon", async ({ mount, page }) => {
    await mount(<DialogComponent />);

    await page.getByLabel("Close").click();

    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("should close when pressing Escape", async ({ mount, page }) => {
    await mount(<DialogComponent />);

    await page.keyboard.press("Escape");

    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("should focus the first focusable element if provided", async ({
    mount,
    page,
  }) => {
    await mount(<DialogWithFirstFocusableElement />);

    await expect(page.getByRole("button", { name: "Press me" })).toBeFocused();
  });

  test("should trap focus within the dialog", async ({ mount, page }) => {
    await mount(<DialogComponent />);

    const textbox1 = page.getByLabel("Textbox1");
    const textbox2 = page.getByLabel("Textbox2");
    const textbox3 = page.getByLabel("Textbox3");

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(textbox1).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(textbox2).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(textbox3).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByLabel("Close")).toBeFocused();
    await page.keyboard.press("Tab");
    // Should loop back to first
    await expect(textbox1).toBeFocused();
  });

  test.describe("Accessibility for Dialog", () => {
    test("should check accessibility for default component", async ({
      mount,
      page,
    }) => {
      await mount(<DialogComponent />);
      await checkAccessibility(page, page.getByRole("dialog"));
    });

    test("should check accessibility for dialog with first focusable element", async ({
      mount,
      page,
    }) => {
      await mount(<DialogWithFirstFocusableElement />);
      await checkAccessibility(page, page.getByRole("dialog"));
    });

    test("should check accessibility for size fullscreen dialog", async ({
      mount,
      page,
    }) => {
      await mount(<DialogFullscreen />);
      await checkAccessibility(page, page.getByRole("dialog"));
    });

    test("should check accessibility with subtle header variant", async ({
      mount,
      page,
    }) => {
      await mount(<DialogWithHeadingVariantSubtle />);
      await checkAccessibility(page, page.getByRole("dialog"));
    });

    test("should check accessibility with caution header variant", async ({
      mount,
      page,
    }) => {
      await mount(<DialogWithHeadingVariantCaution />);
      await checkAccessibility(page, page.getByRole("dialog"));
    });

    test("should check accessibility with negative header variant", async ({
      mount,
      page,
    }) => {
      await mount(<DialogWithHeadingVariantNegative />);
      await checkAccessibility(page, page.getByRole("dialog"));
    });

    test("should check accessibility with positive header variant", async ({
      mount,
      page,
    }) => {
      await mount(<DialogWithHeadingVariantPositive />);
      await checkAccessibility(page, page.getByRole("dialog"));
    });

    test("should check accessibility with info header variant", async ({
      mount,
      page,
    }) => {
      await mount(<DialogWithHeadingVariantInfo />);
      await checkAccessibility(page, page.getByRole("dialog"));
    });
  });
});
