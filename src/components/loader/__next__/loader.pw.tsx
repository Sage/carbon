import React from "react";
import { expect, test } from "../../../../playwright/helpers/base-test";

import Loader from ".";
import MotionToggle from "./components.test-pw";
import { checkAccessibility } from "../../../../playwright/support/helper";

test.describe("Accessibility tests for Loader component", () => {
  (["typical", "ai"] as const).forEach((variant) => {
    test(`should pass accessibility tests for Standalone Loader with variant ${variant}`, async ({
      mount,
      page,
    }) => {
      await mount(<Loader loaderType="standalone" variant={variant} />);

      await checkAccessibility(page);
    });
  });

  (["stacked", "inline", "ai-stacked", "ai-inline"] as const).forEach(
    (variant) => {
      test(`should pass accessibility tests for Ring Loader with variant ${variant}`, async ({
        mount,
        page,
      }) => {
        await mount(<Loader loaderType="ring" variant={variant} />);

        await checkAccessibility(page);
      });
    },
  );

  test(`should pass accessibility tests for Star Loader`, async ({
    mount,
    page,
  }) => {
    await mount(<Loader loaderType="star" />);

    await checkAccessibility(page);
  });
});

test.describe("loader SVG motion", () => {
  test("standalone loader uses the correct geometry", async ({
    mount,
    page,
  }) => {
    await mount(<Loader showLabel={false} />);

    const innerBar = page.getByTestId("inner-bar");
    const outerWidth = await page
      .getByTestId("outer-bar")
      .evaluate((element) => element.getBoundingClientRect().width);
    const innerWidth = await innerBar.evaluate(
      (element) => element.getBoundingClientRect().width,
    );
    expect(innerWidth).toBeCloseTo(outerWidth / 2, 0);
  });

  test("disabling sparkle motion during playback leaves every path visible", async ({
    mount,
    page,
  }) => {
    await mount(<MotionToggle />);

    const stars = page.getByTestId("sparkle-star");
    await expect
      .poll(() =>
        stars
          .first()
          .evaluate((element) =>
            Number(element.getAnimations()[0]?.currentTime ?? 0),
          ),
      )
      .toBeGreaterThan(600);
    await page.getByRole("button", { name: "Disable motion" }).click();

    await expect(stars).toHaveCount(6);
    for (let index = 0; index < 6; index += 1) {
      await expect(stars.nth(index)).toHaveCSS("animation-name", "none");
      await expect(stars.nth(index)).toHaveCSS("opacity", "1");
      await expect(stars.nth(index)).toHaveCSS(
        "transform",
        "matrix(1, 0, 0, 1, 0, 0)",
      );
    }
  });
});
