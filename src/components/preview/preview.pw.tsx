import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import PreviewComponent from "./components.test-pw";
import Preview from "../../../src/components/preview";
import {
  previewComponent,
  lineComponent,
} from "../../../playwright/components/preview";
import { CHARACTERS } from "../../../playwright/support/constants";
import { dlsRoot } from "../../../playwright/components/index";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
} from "../../../playwright/support/helper";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const pixelsData = [256, 275, 300];
const lines = [5, 6, 8, 10];

test.describe("check Preview component properties", () => {
  pixelsData.forEach((height) => {
    test(`should render preview when height is ${height}px`, async ({
      mount,
      page,
    }) => {
      await mount(<PreviewComponent height={`${height}px`} />);

      await assertCssValueIsApproximately(
        previewComponent(page),
        "height",
        height,
      );
    });
  });

  pixelsData.forEach((width) => {
    test(`should render preview when width is ${width}px`, async ({
      mount,
      page,
    }) => {
      await mount(<PreviewComponent width={`${width}px`} />);

      await assertCssValueIsApproximately(
        previewComponent(page),
        "width",
        width,
      );
    });
  });

  testData.forEach((children) => {
    test(`should render children content as ${children} in the component`, async ({
      mount,
      page,
    }) => {
      await mount(<Preview>{children}</Preview>);

      await expect(dlsRoot(page)).toHaveText(children);
    });
  });

  [true, false].forEach((bool) => {
    test(`should check the visibility when loading is set as ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(<PreviewComponent loading={bool} />);

      if (bool) {
        await expect(previewComponent(page)).toBeVisible();
      } else {
        await expect(previewComponent(page)).not.toBeVisible();
      }
    });
  });

  lines.forEach((line) => {
    test(`should ${line} number of loading lines be rendered`, async ({
      mount,
      page,
    }) => {
      await mount(<PreviewComponent lines={line} />);

      const elementsCount = await lineComponent(page).count();
      expect(elementsCount).toBe(line);
    });
  });

  test("should render with no animation when the user prefers reduced motion", async ({
    mount,
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });

    await mount(<Preview />);

    await expect(lineComponent(page)).toHaveCSS("animation-name", "none");
  });
});

test("should have the expected border radius styling", async ({
  mount,
  page,
}) => {
  await mount(<Preview />);

  await expect(lineComponent(page)).toHaveCSS("border-radius", "8px");
});

test.describe("Accessibility tests for Preview component", () => {
  pixelsData.forEach((height) => {
    test(`should check accessibility when height is ${height}px`, async ({
      mount,
      page,
    }) => {
      await mount(<PreviewComponent height={`${height}px`} />);

      await checkAccessibility(page);
    });
  });

  pixelsData.forEach((width) => {
    test(`should check accessibility when width is ${width}px`, async ({
      mount,
      page,
    }) => {
      await mount(<PreviewComponent width={`${width}px`} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((children) => {
    test(`should check accessibility when children is ${children}`, async ({
      mount,
      page,
    }) => {
      await mount(<Preview>{children}</Preview>);

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((bool) => {
    test(`should check accessibility when loading is set as ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(<PreviewComponent loading={bool} />);

      await checkAccessibility(page);
    });
  });

  lines.forEach((line) => {
    test(`should check accessibility when loading lines is set as ${line}`, async ({
      mount,
      page,
    }) => {
      await mount(<PreviewComponent lines={line} />);

      await checkAccessibility(page);
    });
  });
});
