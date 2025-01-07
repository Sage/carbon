import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import ContentComponent from "./components.test-pw";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  contentBody,
  contentTitle,
} from "../../../playwright/components/content";
import {
  checkAccessibility,
  getStyle,
} from "../../../playwright/support/helper";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const totalWidth = 1366;
const alignmentData = ["left", "center", "right"];

test.describe("check Content component properties", () => {
  [
    ["primary", "rgba(0, 0, 0, 0.9)"],
    ["secondary", "rgba(0, 0, 0, 0.55)"],
  ].forEach(([variant, titleColor]) => {
    test(`should check ${variant} as variant for Content components`, async ({
      mount,
      page,
    }) => {
      await mount(<ContentComponent variant={variant} />);

      await expect(contentTitle(page)).toHaveCSS("color", `${titleColor}`);
    });
  });

  testData.forEach((children) => {
    test(`should check ${children} as children for Content component`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ContentComponent title="Title">{children}</ContentComponent>,
      );

      await expect(contentBody(page)).toHaveText(children);
    });
  });

  testData.forEach((title) => {
    test(`should check ${title} as title for Content component`, async ({
      mount,
      page,
    }) => {
      await mount(<ContentComponent title={title} />);

      await expect(contentTitle(page)).toHaveText(title);
    });
  });

  test(`should check inline parameter is enabled for Content component`, async ({
    mount,
    page,
  }) => {
    await mount(<ContentComponent inline />);

    await expect(contentTitle(page)).toHaveCSS("display", "inline-block");
  });

  alignmentData.forEach((alignment) => {
    test(`should check ${alignment} as alignment for Content component`, async ({
      mount,
      page,
    }) => {
      await mount(<ContentComponent align={alignment} />);

      await expect(contentTitle(page)).toHaveCSS("text-align", alignment);
    });
  });

  (
    [
      [70, (totalWidth * 70) / 100],
      [50, (totalWidth * 50) / 100],
    ] as [number, number][]
  ).forEach(([titleWidth, computedWidth]) => {
    test(`should check titleWidth as ${titleWidth} for Content component`, async ({
      mount,
      page,
    }) => {
      await mount(<ContentComponent titleWidth={titleWidth} />);
      const cssWidth = await getStyle(contentTitle(page), "width");
      expect(parseInt(cssWidth)).toBeLessThanOrEqual(computedWidth - 30);
      expect(parseInt(cssWidth)).toBeGreaterThanOrEqual(computedWidth - 31);
    });
  });

  (
    [
      [true, 70, totalWidth],
      [false, 50, totalWidth],
    ] as [boolean, number, number][]
  ).forEach(([bodyFullWidth, titleWidth]) => {
    test(`should check Content component has bodyFullWidth as ${bodyFullWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ContentComponent
          bodyFullWidth={bodyFullWidth}
          titleWidth={titleWidth}
        />,
      );
      const cssWidth = await getStyle(contentBody(page), "width");
      if (bodyFullWidth === true) {
        expect(parseInt(cssWidth)).toEqual(totalWidth);
      } else {
        expect(parseInt(cssWidth)).not.toEqual(totalWidth);
      }
    });
  });
});

test.describe("Accessibility tests for Content component", () => {
  test("should pass accessibility tests for Content default story", async ({
    mount,
    page,
  }) => {
    await mount(<ContentComponent />);

    await checkAccessibility(page);
  });
});
