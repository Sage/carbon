import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import DefaultLoaderStar from "./components.test-pw";
import {
  loaderStarHiddenLabel,
  loaderStarVisibleLabel,
  loaderStarWrapper,
} from "../../../playwright/components/loader-star/index";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("User prefers reduced motion", () => {
  test("when the 'LoaderStarLabel' prop is passed a custom string value it overrides the default visible label", async ({
    mount,
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await mount(<DefaultLoaderStar loaderStarLabel="foo" />);

    await expect(loaderStarVisibleLabel(page)).toHaveText("foo");
  });

  test("the expected styles are applied to the default visible label", async ({
    mount,
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await mount(<DefaultLoaderStar />);

    await expect(loaderStarVisibleLabel(page)).toHaveText("Loading...");
    await expect(loaderStarVisibleLabel(page)).toHaveCSS("font-weight", "400");
    await expect(loaderStarVisibleLabel(page)).toHaveCSS("display", "flex");
    await expect(loaderStarVisibleLabel(page)).toHaveCSS(
      "justify-content",
      "center",
    );
  });
});

test.describe("User does not prefer reduced motion", () => {
  test("when the 'LoaderStarLabel' prop is passed a custom string value it overrides the default hidden label", async ({
    mount,
    page,
  }) => {
    await mount(<DefaultLoaderStar loaderStarLabel="bar" />);

    await expect(loaderStarHiddenLabel(page)).toHaveText("bar");
  });

  test("the expected styles are applied to the component", async ({
    mount,
    page,
  }) => {
    await mount(<DefaultLoaderStar />);

    await expect(loaderStarWrapper(page)).toHaveCSS("height", "40px");
    await expect(loaderStarWrapper(page)).toHaveCSS("width", "40px");
    await expect(loaderStarWrapper(page)).toHaveCSS("position", "relative");
  });
});

test.describe("Accessibility tests", () => {
  test("should pass accessibility checks when component is rendered in its default state", async ({
    mount,
    page,
  }) => {
    await mount(<DefaultLoaderStar />);

    await checkAccessibility(page);
  });

  test("should pass accessibility checks when component is rendered and user prefers reduced motion", async ({
    mount,
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await mount(<DefaultLoaderStar />);

    await checkAccessibility(page);
  });
});
