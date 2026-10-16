import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import DefaultAdaptiveSidebar from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("Adaptive Sidebar", () => {
  test("renders as a modal when below the adaptive breakpoint", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 600, height: 600 });
    await mount(<DefaultAdaptiveSidebar aria-label="Adaptive sidebar" />);

    await page.getByRole("button", { name: "Open sidebar" }).click();

    const sidebar = page.getByRole("dialog");
    await expect(sidebar).toBeVisible();
    await expect(page.getByTestId("modal-background")).toBeVisible();
  });

  test("restores focus to the trigger when the modal is closed and `restoreFocusOnClose` is true", async ({
    mount,
    page,
  }) => {
    await mount(<DefaultAdaptiveSidebar renderAsModal restoreFocusOnClose />);

    const trigger = page.getByRole("button", { name: "Open sidebar" });
    const sidebar = page.getByRole("dialog");
    await expect(sidebar).toBeHidden();

    await trigger.click();
    await expect(sidebar).toBeVisible();

    await page.getByRole("button", { name: "Close sidebar" }).click();
    await expect(sidebar).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("does not restore focus to the trigger when the modal is closed and `restoreFocusOnClose` is false", async ({
    mount,
    page,
  }) => {
    await mount(
      <DefaultAdaptiveSidebar renderAsModal restoreFocusOnClose={false} />,
    );

    const trigger = page.getByRole("button", { name: "Open sidebar" });
    const sidebar = page.getByRole("dialog");
    await expect(sidebar).toBeHidden();

    await trigger.click();
    await expect(sidebar).toBeVisible();

    await page.getByRole("button", { name: "Close sidebar" }).click();
    await expect(sidebar).toBeHidden();
    await expect(trigger).not.toBeFocused();
  });

  test.describe("Accessibility", () => {
    test("passes accessibility when not rendered as a modal", async ({
      mount,
      page,
    }) => {
      await mount(
        <DefaultAdaptiveSidebar aria-label="Adaptive sidebar" open />,
      );

      await checkAccessibility(page);
    });

    test("passes accessibility when rendered as a modal", async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({ width: 600, height: 600 });
      await mount(
        <DefaultAdaptiveSidebar aria-label="Adaptive sidebar" open />,
      );

      // axe incorrectly flags the disabled UI with black text as a colour-contrast violation
      await checkAccessibility(page, undefined, "color-contrast");
    });

    (["standard", "alt", "inverse"] as const).forEach((variant) => {
      test(`passes accessibility checks with the \`${variant}\` variant`, async ({
        mount,
        page,
      }) => {
        await mount(<DefaultAdaptiveSidebar variant={variant} open />);

        await checkAccessibility(page);
      });
    });

    test("passes accessibility checks when rendered as a modal with an `aria-label`", async ({
      mount,
      page,
    }) => {
      await mount(
        <DefaultAdaptiveSidebar renderAsModal aria-label="sidebar" open />,
      );

      // axe incorrectly flags the disabled UI with black text as a colour-contrast violation
      await checkAccessibility(page, undefined, "color-contrast");
    });

    test("passes accessibility checks when rendered as a modal with an `aria-labelledby`", async ({
      mount,
      page,
    }) => {
      await mount(
        <DefaultAdaptiveSidebar
          renderAsModal
          aria-labelledby="accessible-name"
          open
        />,
      );

      // axe incorrectly flags the disabled UI with black text as a colour-contrast violation
      await checkAccessibility(page, undefined, "color-contrast");
    });
  });
});
