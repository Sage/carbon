import { expect, test } from "@playwright/experimental-ct-react17";
import React from "react";

import { checkAccessibility } from "../../../playwright/support/helper";
import {
  AsAnImg,
  CarbonLogoImage,
  CustomResponsiveBehaviour,
  DecorativeImage,
  Default,
} from "./components.test-pw";

test.describe("check props for Image component", () => {
  test("When hidden prop is false, component should be visible to sighted users", async ({
    mount,
    page,
  }) => {
    await mount(<CarbonLogoImage />);

    const imageElement = page.locator("img");
    await expect(imageElement).toBeInViewport();
  });

  test("When hidden prop is true, component should not be visible to sighted users", async ({
    mount,
    page,
  }) => {
    await mount(<CarbonLogoImage hidden />);

    const imageElement = page.locator("img");
    await expect(imageElement).not.toBeInViewport();
  });

  (["absolute", "fixed", "relative", "static", "sticky"] as const).forEach(
    (positionValue) => {
      test(`When position prop is ${positionValue} it should apply the expected CSS`, async ({
        mount,
        page,
      }) => {
        await mount(<CarbonLogoImage position={positionValue} />);

        const imageElement = page.locator("img");
        await expect(imageElement).toHaveCSS("position", positionValue);
      });
    },
  );

  (["10px", "5%", "auto"] as const).forEach((topValue) => {
    test(`When top prop is ${topValue} it should apply the expected CSS`, async ({
      mount,
      page,
    }) => {
      await mount(<CarbonLogoImage top={topValue} />);

      const imageElement = page.locator("img");
      await expect(imageElement).toHaveCSS("top", topValue);
    });
  });

  (["10px", "5%", "auto"] as const).forEach((rightValue) => {
    test(`When right prop is ${rightValue} it should apply the expected CSS`, async ({
      mount,
      page,
    }) => {
      await mount(<CarbonLogoImage right={rightValue} />);

      const imageElement = page.locator("img");
      await expect(imageElement).toHaveCSS("right", rightValue);
    });
  });

  (["10px", "5%", "auto"] as const).forEach((bottomValue) => {
    test(`When bottom prop is ${bottomValue} it should apply the expected CSS`, async ({
      mount,
      page,
    }) => {
      await mount(<CarbonLogoImage bottom={bottomValue} />);

      const imageElement = page.locator("img");
      await expect(imageElement).toHaveCSS("bottom", bottomValue);
    });
  });

  (["10px", "5%", "auto"] as const).forEach((leftValue) => {
    test(`When left prop is ${leftValue} it should apply the expected CSS`, async ({
      mount,
      page,
    }) => {
      await mount(<CarbonLogoImage left={leftValue} />);

      const imageElement = page.locator("img");
      await expect(imageElement).toHaveCSS("left", leftValue);
    });
  });
});

test.describe("Accessibility tests for Image component", () => {
  test("should pass accessibility tests for default example", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for AsAnImg example", async ({
    mount,
    page,
  }) => {
    await mount(<AsAnImg />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for CustomResponsiveBehaviour example", async ({
    mount,
    page,
  }) => {
    await mount(<CustomResponsiveBehaviour />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for DecorativeImage example", async ({
    mount,
    page,
  }) => {
    await mount(<DecorativeImage />);

    await checkAccessibility(page);
  });
});
