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

  test("ring loader uses normalized SVG geometry and timing", async ({
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

  test("motion-disabled loading rings keep a partial foreground arc", async ({
    mount,
    page,
  }) => {
    await mount(
      <Loader loaderType="ring" hasMotion={false} showLabel={false} />,
    );

    const innerArc = page.getByTestId("inner-arc");
    await expect(innerArc).toHaveCSS("stroke-dasharray", "0.34px, 1px");
    await expect(innerArc).toHaveCSS("stroke-dashoffset", "-0.66px");
  });

  test("AI ring uses the v5 tokenized gradient", async ({ mount, page }) => {
    await mount(
      <Loader loaderType="ring" variant="ai-stacked" showLabel={false} />,
    );

    const gradient = page.getByTestId("ai-ring-gradient");
    await expect(gradient).toHaveAttribute("x1", "18.5");
    await expect(gradient).toHaveAttribute("x2", "65");
    await expect(gradient).toHaveAttribute("gradientUnits", "userSpaceOnUse");
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
    const gradients = page.getByTestId("star-gradient");
    await expect(stars).toHaveCount(6);
    await expect(gradients).toHaveCount(5);
    await expect(gradients.nth(2)).toHaveAttribute("x1", "-30.25");
    await expect(gradients.nth(3)).toHaveAttribute("y2", "13.625");
    await expect(stars.nth(4).locator("..")).toHaveAttribute(
      "transform",
      "translate(3.375 30.679) rotate(-90) translate(10 10)",
    );
    await expect(stars.first()).toHaveCSS("animation-name", "none");
    await expect(stars.first()).toHaveCSS("opacity", "1");
    await expect(stars.first()).toHaveCSS(
      "transform",
      "matrix(1, 0, 0, 1, 0, 0)",
    );
  });

  test("sparkle loader uses the reference pop timing and stagger", async ({
    mount,
    page,
  }) => {
    await mount(<Loader loaderType="star" showLabel={false} />);

    const stars = page.getByTestId("sparkle-star");
    await expect(stars.first()).toHaveCSS("animation-duration", "3.159s");
    await expect(stars.nth(1)).toHaveCSS("animation-delay", "0.483011s");
    await expect(stars.nth(5)).toHaveCSS("animation-delay", "2.39989s");
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
