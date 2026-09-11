import React from "react";
import { expect, test } from "../../../../playwright/helpers/base-test";

import Loader from ".";
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

test.describe("v4 loader motion", () => {
  test("standalone loader uses the supplied geometry and timing", async ({
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
    await expect(innerBar).toHaveCSS("animation-duration", "0.983s");
    await expect(innerBar).toHaveCSS(
      "animation-timing-function",
      "cubic-bezier(0.66, 0, 0.34, 1)",
    );
  });

  test("ring loader uses normalized v4 SVG geometry and timing", async ({
    mount,
    page,
  }) => {
    await mount(<Loader loaderType="ring" showLabel={false} />);

    const svg = page.getByRole("presentation");
    const innerArc = page.getByTestId("inner-arc");
    await expect(svg).toHaveAttribute("viewBox", "0 0 64 64");
    await expect(innerArc).toHaveAttribute("pathLength", "1");
    await expect(innerArc).toHaveCSS("stroke-width", "8px");
    await expect(innerArc).toHaveCSS("animation-duration", "0.783s");
  });

  test("sparkle loader renders six paths and honours motion controls", async ({
    mount,
    page,
  }) => {
    await mount(
      <Loader
        loaderType="star"
        animationTime={6}
        hasMotion={false}
        showLabel={false}
      />,
    );

    const stars = page.getByTestId("sparkle-star");
    await expect(stars).toHaveCount(6);
    await expect(stars.first()).toHaveCSS("animation-duration", "6s");
    await expect(stars.first()).toHaveCSS("animation-play-state", "paused");
  });

  test("each SVG loader instance has private definitions", async ({
    mount,
    page,
  }) => {
    await mount(
      <>
        <Loader loaderType="ring" variant="ai-inline" showLabel={false} />
        <Loader loaderType="ring" variant="ai-inline" showLabel={false} />
        <Loader loaderType="star" showLabel={false} />
        <Loader loaderType="star" showLabel={false} />
      </>,
    );

    const ids = await page
      .locator("linearGradient[id], mask[id]")
      .evaluateAll((definitions) => definitions.map(({ id }) => id));
    expect(new Set(ids).size).toBe(ids.length);
  });
});
