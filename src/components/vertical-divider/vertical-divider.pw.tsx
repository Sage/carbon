import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import VerticalDividerComponent from "./components.test-pw";
import { verticalDividerComponent } from "../../../playwright/components/vertical-divider/index";
import { VerticalDividerProps } from "./vertical-divider.component";
import { checkAccessibility } from "../../../playwright/support/helper";

const height = ["h", "height"];
const pixels = [30, 50];
const tintData: [VerticalDividerProps["tint"], string][] = [
  [3, "rgb(8, 57, 78)"],
  [57, "rgb(145, 167, 177)"],
  [71, "rgb(181, 196, 202)"],
  [98, "rgb(250, 251, 251)"],
];
const displayInlineVal = [true, false];

test.describe("VerticalDivider component", () => {
  height.forEach((propName) => {
    pixels.forEach((pixelVal) => {
      const pixelCssString = `${pixelVal}px`;

      test(`when the ${propName} prop is passed as a string - should render with ${propName} set to ${pixelVal}px`, async ({
        mount,
        page,
      }) => {
        const props = { [propName]: `${pixelVal}px` };

        await mount(<VerticalDividerComponent {...props} />);

        await expect(verticalDividerComponent(page)).toHaveCSS(
          "height",
          pixelCssString,
        );

        await expect(verticalDividerComponent(page)).toHaveAttribute(
          "height",
          pixelCssString,
        );
      });

      test(`when the ${propName} prop is passed as a number - should render with ${propName} set to ${pixelVal}`, async ({
        mount,
        page,
      }) => {
        const props = { [propName]: pixelVal };

        await mount(<VerticalDividerComponent {...props} />);

        await expect(verticalDividerComponent(page)).toHaveCSS(
          "height",
          pixelCssString,
        );

        await expect(verticalDividerComponent(page)).toHaveAttribute(
          "height",
          pixelVal.toString(),
        );
      });
    });
  });

  tintData.forEach(([tint, color]) => {
    test(`should render with tint set to ${tint}`, async ({ mount, page }) => {
      await mount(<VerticalDividerComponent tint={tint} />);

      await expect(verticalDividerComponent(page).locator("div")).toHaveCSS(
        "border-left-color",
        color,
      );
    });
  });

  displayInlineVal.forEach((boolVal) => {
    test(`should render with displayInline set to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<VerticalDividerComponent displayInline={boolVal} />);

      if (boolVal) {
        await expect(verticalDividerComponent(page)).toHaveCSS(
          "display",
          "inline",
        );
      } else {
        await expect(verticalDividerComponent(page)).not.toHaveCSS(
          "display",
          "inline",
        );
      }
    });
  });
});

test.describe("should render VerticalDivider component and check accessibility issues", () => {
  height.forEach((propName) => {
    pixels.forEach((pixelVal) => {
      test(`should pass accessibility checks when the ${propName} prop is passed as a string and set to ${pixelVal}px`, async ({
        mount,
        page,
      }) => {
        const props = { [propName]: `${pixelVal}px` };

        await mount(<VerticalDividerComponent {...props} />);

        await checkAccessibility(page);
      });

      test(`should pass accessibility checks when the ${propName} prop is passed as a number and set to ${pixelVal}`, async ({
        mount,
        page,
      }) => {
        const props = { [propName]: pixelVal };

        await mount(<VerticalDividerComponent {...props} />);

        await checkAccessibility(page);
      });
    });
  });

  tintData.forEach(([tint]) => {
    test(`should pass accessibility checks when the tint prop is set to ${tint}`, async ({
      mount,
      page,
    }) => {
      await mount(<VerticalDividerComponent tint={tint} />);

      await checkAccessibility(page);
    });
  });

  displayInlineVal.forEach((boolVal) => {
    test(`should pass accessibility checks when the displayInline prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<VerticalDividerComponent displayInline={boolVal} />);

      await checkAccessibility(page);
    });
  });
});
