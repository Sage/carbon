import React from "react";
import type { Locator } from "@playwright/test";
import { test, expect } from "../../../../playwright/helpers/base-test";
import { ResponsiveFocusHalo } from "../tile-test.stories";

const getBounds = (locator: Locator) =>
  locator.evaluate((element) => {
    const { x, y, width, height } = element.getBoundingClientRect();
    return { x, y, width, height };
  });

test("preserves the horizontal focus halo", async ({ mount, page }) => {
  await mount(<ResponsiveFocusHalo />);

  const container = page.locator('[data-component="flex-tile-container"]');
  await expect(container).toBeVisible();
  const containerBounds = await getBounds(container);
  const button = page.getByRole("button", { name: "Action" });
  await page.keyboard.press("Tab");
  await expect(button).toBeFocused();
  await expect(button).not.toHaveCSS("box-shadow", "none");
  const bounds = await getBounds(button);

  // Carbon's focus shadow extends 4px beyond either side of the button.
  expect(bounds.x - 4).toBeGreaterThanOrEqual(containerBounds.x);
  expect(bounds.x + bounds.width + 4).toBeLessThanOrEqual(
    containerBounds.x + containerBounds.width,
  );
  await expect(container).toHaveCSS("overflow", "hidden");

  const screenshotPath = test.info().outputPath("focus-halo.png");
  await container.screenshot({ path: screenshotPath });
  await test.info().attach("focus-halo", {
    path: screenshotPath,
    contentType: "image/png",
  });
});
