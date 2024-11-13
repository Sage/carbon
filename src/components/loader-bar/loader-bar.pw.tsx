import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { LoaderBarProps } from "components/loader-bar";
import { LOADER_BAR_SIZES } from "./loader-bar.config";
import LoaderBarComponent from "./component.test-pw";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
  getStyle,
} from "../../../playwright/support/helper";

test.describe("LoaderBar component tests", () => {
  (
    [
      [LOADER_BAR_SIZES[0], 4],
      [LOADER_BAR_SIZES[1], 8],
      [LOADER_BAR_SIZES[2], 16],
    ] as [LoaderBarProps["size"], number][]
  ).forEach(([size, height]) => {
    test(`should render with ${size} size`, async ({ mount, page }) => {
      await mount(<LoaderBarComponent size={size} mt={2} />);

      const progressBar = page.getByRole("progressbar").locator("div").first();
      const progressBarTimer = page
        .getByRole("progressbar")
        .locator("div")
        .locator("div");
      await assertCssValueIsApproximately(progressBar, "height", height);
      await assertCssValueIsApproximately(progressBarTimer, "height", height);
      const duration = await getStyle(progressBarTimer, "animation-duration");
      const playState = await getStyle(
        progressBarTimer,
        "animation-play-state",
      );
      expect(duration).toEqual("2s");
      expect(playState).toEqual("running");
    });
  });

  test(`should render with the expected border radius styling`, async ({
    mount,
    page,
  }) => {
    await mount(<LoaderBarComponent />);

    const progressBar = page.getByRole("progressbar").locator("div").first();
    await expect(progressBar).toHaveCSS("border-radius", "32px");
  });
});

test.describe("Accessibility tests for LoaderBar", () => {
  (
    [
      LOADER_BAR_SIZES[0],
      LOADER_BAR_SIZES[1],
      LOADER_BAR_SIZES[2],
    ] as LoaderBarProps["size"][]
  ).forEach((size) => {
    test(`should pass tests for ${size} size`, async ({ mount, page }) => {
      await mount(<LoaderBarComponent size={size} />);

      await checkAccessibility(page);
    });
  });
});
