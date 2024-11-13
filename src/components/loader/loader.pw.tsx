import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import type { HooksConfig } from "../../../playwright/index";

import Loader from ".";
import LoaderInsideButton from "./components.test-pw";
import { LOADER_SIZES } from "./loader.config";
import {
  loader,
  loaderInsideButton,
} from "../../../playwright/components/loader/index";
import {
  checkAccessibility,
  checkGoldenOutline,
  getStyle,
} from "../../../playwright/support/helper";

test.describe("check props for Loader component test", () => {
  [
    {
      size: LOADER_SIZES[0],
      expectedHeight: "12px",
      expectedWidth: "12px",
      expectedMargin: "6px",
    },
    {
      size: LOADER_SIZES[1],
      expectedHeight: "16px",
      expectedWidth: "16px",
      expectedMargin: "8px",
    },
    {
      size: LOADER_SIZES[2],
      expectedHeight: "20px",
      expectedWidth: "20px",
      expectedMargin: "8px",
    },
  ].forEach(({ size, expectedHeight, expectedWidth, expectedMargin }) => {
    test(`should render Loader using ${size} as size`, async ({
      mount,
      page,
    }) => {
      await mount(<Loader size={size} />);

      const loaderNth = (index: number) => loader(page, index);

      const loaderWithCssByNth = async (index: number) => {
        const heightVal = await getStyle(loaderNth(index), "height");
        const widthVal = await getStyle(loaderNth(index), "width");
        const marginRightVal = await getStyle(loaderNth(index), "margin-right");
        const animationDelayVal = await getStyle(
          loaderNth(index),
          "animation-delay",
        );
        return [heightVal, widthVal, marginRightVal, animationDelayVal];
      };

      expect(await loaderWithCssByNth(0)).toEqual([
        expectedHeight,
        expectedWidth,
        expectedMargin,
        "0s",
      ]);
      expect(await loaderWithCssByNth(1)).toEqual([
        expectedHeight,
        expectedWidth,
        expectedMargin,
        "0.2s",
      ]);
      expect(await loaderWithCssByNth(2)).toEqual([
        expectedHeight,
        expectedWidth,
        "0px",
        "0.4s",
      ]);
    });
  });

  [
    { size: LOADER_SIZES[0], width: 100 },
    { size: LOADER_SIZES[1], width: 116 },
    { size: LOADER_SIZES[2], width: 128 },
  ].forEach(({ size, width }) => {
    test(`should render Loader using ${size} as size in Button`, async ({
      mount,
      page,
    }) => {
      await mount(<LoaderInsideButton size={size} />);

      const heightVal = await getStyle(loaderInsideButton(page), "height");
      const widthVal = await getStyle(loaderInsideButton(page), "width");

      expect(heightVal).toEqual("40px");
      expect(widthVal).toEqual(`${width}px`);
    });
  });

  test("should render Loader inside the Button component with correct color", async ({
    mount,
    page,
  }) => {
    await mount(<LoaderInsideButton />);

    const color = "rgb(255, 255, 255)";

    const colorVal = async (index: number) => {
      return getStyle(loader(page, index), "color");
    };

    expect(await colorVal(0)).toBe(color);
    expect(await colorVal(1)).toBe(color);
    expect(await colorVal(2)).toBe(color);
  });

  test("should render Loader with aria-label prop", async ({ mount, page }) => {
    await mount(<Loader aria-label="playwright-aria" />);

    await expect(loader(page, 0).locator("..")).toHaveAttribute(
      "aria-label",
      "playwright-aria",
    );
  });

  test("should render Loader with isActive prop set to false", async ({
    mount,
    page,
  }) => {
    await mount(<LoaderInsideButton isActive={false} />);

    const backgroundColor = "rgb(255, 255, 255)";

    const colorVal = async (index: number) => {
      return getStyle(loader(page, index), "background-color");
    };

    expect(await colorVal(0)).toEqual(backgroundColor);
    expect(await colorVal(1)).toEqual(backgroundColor);
    expect(await colorVal(2)).toEqual(backgroundColor);
  });

  test("should render with expected border radius styling", async ({
    mount,
    page,
  }) => {
    await mount<HooksConfig>(<Loader />, {
      hooksConfig: { roundedCornersOptOut: false },
    });

    const borderRadius = await getStyle(loader(page, 0), "border-radius");

    expect(borderRadius).toEqual("50%");
  });

  test("should render Loader inside the Button component and be able to focus it with focusRedesignOptOut set", async ({
    mount,
    page,
  }) => {
    await mount<HooksConfig>(<LoaderInsideButton />, {
      hooksConfig: { focusRedesignOptOut: true },
    });

    await loaderInsideButton(page).focus();

    await checkGoldenOutline(loaderInsideButton(page));
  });

  test("should render Loader inside the Button component and be able to focus it with focusRedesignOptOut not set", async ({
    mount,
    page,
  }) => {
    await mount<HooksConfig>(<LoaderInsideButton />, {
      hooksConfig: { focusRedesignOptOut: false },
    });

    await loaderInsideButton(page).focus();

    const focusStyle = await getStyle(loaderInsideButton(page), "box-shadow");

    expect(focusStyle).toEqual(
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
  });

  [0, 1, 2].forEach((index) => {
    test(`when the variant prop is set to 'gradient' it should apply correct colour to loader square ${
      index + 1
    }`, async ({ mount, page }) => {
      await mount(<Loader variant="gradient" />);

      const loaderNth = loader(page, index);
      const squareColour = await getStyle(loaderNth, "color");

      const expectedDelays = ["0s", "0.2s", "0.4s"];
      const animationDelayVal = await getStyle(loaderNth, "animation-delay");

      expect(squareColour).toBe(await getStyle(loaderNth, "color"));
      expect(animationDelayVal).toBe(expectedDelays[index]);
    });
  });

  test.describe("Accessibility tests for Loader component", async () => {
    test("should pass accessibility tests for Loader default story", async ({
      mount,
      page,
    }) => {
      await mount(<Loader />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests for loading state", async ({
      mount,
      page,
    }) => {
      await mount(<LoaderInsideButton />);

      await checkAccessibility(page);
    });
  });
});
