import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
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

test.describe("should check VerticalDivider component properties", () => {
  height.forEach((propName) => {
    pixels.forEach((pixelVal) => {
      const pixelCssString = `${pixelVal}px`;

      test(`when ${propName} prop is passed as a string - verify that the ${propName} prop is set to ${pixelVal}px for the VerticalDivider component`, async ({
        mount,
        page,
      }) => {
        const props = { [propName]: `${pixelVal}px` };

        await mount(<VerticalDividerComponent {...props} />);

        await expect(verticalDividerComponent(page)).toHaveCSS(
          "height",
          pixelCssString
        );
      });

      test(`when ${propName} prop is passed as a number - verify that the ${propName} prop is set to ${pixelVal} as number for the VerticalDivider component`, async ({
        mount,
        page,
      }) => {
        const props = { [propName]: pixelVal };

        await mount(<VerticalDividerComponent {...props} />);

        await expect(verticalDividerComponent(page)).toHaveCSS(
          "height",
          pixelCssString
        );
      });
    });
  });

  tintData.forEach(([tint, color]) => {
    test(`should check tint set to ${tint} for VerticalDivider component`, async ({
      mount,
      page,
    }) => {
      await mount(<VerticalDividerComponent tint={tint} />);

      await expect(verticalDividerComponent(page).locator("div")).toHaveCSS(
        "border-left-color",
        color
      );
    });
  });

  displayInlineVal.forEach((boolVal) => {
    test(`should check displayInline set to ${boolVal} for VerticalDivider component`, async ({
      mount,
      page,
    }) => {
      await mount(<VerticalDividerComponent displayInline={boolVal} />);

      if (boolVal) {
        await expect(verticalDividerComponent(page)).toHaveCSS(
          "display",
          "inline"
        );
      } else {
        await expect(verticalDividerComponent(page)).not.toHaveCSS(
          "display",
          "inline"
        );
      }
    });
  });
});

test.describe(
  "should check accessibility for the VerticalDivider component",
  () => {
    height.forEach((propName) => {
      pixels.forEach((pixelVal) => {
        test(`check accessibility when the ${propName} prop is set to ${pixelVal}px for the VerticalDivider component`, async ({
          mount,
          page,
        }) => {
          const props = { [propName]: `${pixelVal}px` };

          await mount(<VerticalDividerComponent {...props} />);

          await checkAccessibility(page);
        });

        test(`check accessibility when the ${propName} prop is set to ${pixelVal} as number for the VerticalDivider component`, async ({
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
      test(`check accessibility when the tint prop is set to ${tint} for VerticalDivider component`, async ({
        mount,
        page,
      }) => {
        await mount(<VerticalDividerComponent tint={tint} />);

        await checkAccessibility(page);
      });
    });

    displayInlineVal.forEach((boolVal) => {
      test(`should check accessibility when the displayInline prop is ${boolVal} for VerticalDivider component`, async ({
        mount,
        page,
      }) => {
        await mount(<VerticalDividerComponent displayInline={boolVal} />);

        await checkAccessibility(page);
      });
    });
  }
);
