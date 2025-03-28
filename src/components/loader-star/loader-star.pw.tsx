import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import DefaultLoaderStar from "./components.test-pw";
import {
  loaderStarHiddenLabel,
  loaderStarVisibleLabel,
  loaderStarWrapper,
} from "../../../playwright/components/loader-star/index";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("User does not prefer reduced motion", () => {
  test("renders visible label with custom text", async ({ mount, page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await mount(<DefaultLoaderStar loaderStarLabel="foo" />);
    await expect(loaderStarVisibleLabel(page)).toHaveText("foo");
  });

  test("renders hidden label with custom text (accessibility)", async ({
    mount,
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await mount(<DefaultLoaderStar loaderStarLabel="bar" />);
    await expect(loaderStarHiddenLabel(page)).toHaveText("bar");
  });

  test("applies expected styles to the component", async ({ mount, page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await mount(<DefaultLoaderStar />);
    await expect(loaderStarWrapper(page)).toHaveCSS("height", "40px");
    await expect(loaderStarWrapper(page)).toHaveCSS("width", "40px");
    await expect(loaderStarWrapper(page)).toHaveCSS("position", "relative");
  });
});

test.describe("User prefers reduced motion", () => {
  test("renders hidden label with custom string", async ({ mount, page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await mount(<DefaultLoaderStar loaderStarLabel="foo" />);
    await expect(loaderStarHiddenLabel(page)).toHaveText("foo");
  });

  test("renders default hidden label with expected styles", async ({
    mount,
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await mount(<DefaultLoaderStar />);
    const hiddenLabel = loaderStarHiddenLabel(page);
    await expect(hiddenLabel).toHaveText("Loading...");
    await expect(hiddenLabel).toHaveCSS("font-weight", "400");
    await expect(hiddenLabel).toHaveCSS("display", "flex");
    await expect(hiddenLabel).toHaveCSS("justify-content", "center");
  });
});

test.describe("Accessibility tests", () => {
  test("passes accessibility check by default", async ({ mount, page }) => {
    await mount(<DefaultLoaderStar />);
    await checkAccessibility(page);
  });

  test("passes accessibility check with reduced motion", async ({
    mount,
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await mount(<DefaultLoaderStar />);
    await checkAccessibility(page);
  });
});
