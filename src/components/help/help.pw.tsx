import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import Help, { HelpProps } from "../../../src/components/help/help.component";
import HelpComponentTest from "./component.test-pw";
import Box from "../../../src/components/box";
import {
  getDataElementByValue,
  tooltipPreview,
} from "../../../playwright/components/index";
import helpComponent from "../../../playwright/components/help";
import { checkAccessibility } from "../../../playwright/support/helper";
import { COLOR, CHARACTERS } from "../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const tooltipText = "Some helpful text goes here";

const colors = [
  ["orange", COLOR.ORANGE, COLOR.BLACK],
  ["red", COLOR.RED, COLOR.WHITE],
  ["black", COLOR.BLACK, COLOR.WHITE],
  ["brown", COLOR.BROWN, COLOR.WHITE],
];

test.describe("Testing Help component properties", () => {
  (["top", "bottom", "left", "right"] as HelpProps["position"][]).forEach(
    (position) => {
      test(`should render tooltipFlipOverrides as ${position}`, async ({
        mount,
        page,
      }) => {
        await page.setViewportSize({ width: 700, height: 120 });
        await mount(
          <Box ml="250px">
            <Help tooltipFlipOverrides={[position]} isFocused>
              {`This tooltip is positioned ${position}`}
            </Help>
          </Box>,
        );

        await page.evaluate(() => window.scrollTo(50, 50));
        const tooltip = getDataElementByValue(page, "tooltip");
        await expect(tooltip).toHaveAttribute("data-placement", position);
      });
    },
  );
});

test.describe("Accessibility tests for Help component", () => {
  testData.forEach((ariaLabel) => {
    test(`should check ariaLabel as ${ariaLabel}`, async ({ mount, page }) => {
      await mount(<HelpComponentTest ariaLabel={ariaLabel} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((className) => {
    test(`should check className as ${className}`, async ({ mount, page }) => {
      await mount(<HelpComponentTest className={className} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((children) => {
    test(`should check children as ${children}`, async ({ mount, page }) => {
      await mount(<Help> {children} </Help>);

      await checkAccessibility(page);
    });
  });

  testData.forEach((helpId) => {
    test(`should check id as ${helpId}`, async ({ mount, page }) => {
      await mount(<HelpComponentTest helpId={helpId} />);

      await checkAccessibility(page);
    });
  });

  ["https://carbon.sage.com", "https://www.google.com"].forEach((hrefLink) => {
    test(`should check href link as ${hrefLink}`, async ({ mount, page }) => {
      await mount(<HelpComponentTest href={hrefLink} />);

      await checkAccessibility(page);
    });
  });

  test(`should check when isFocused prop is true`, async ({ mount, page }) => {
    await mount(<HelpComponentTest isFocused>{tooltipText}</HelpComponentTest>);

    await checkAccessibility(page, tooltipPreview(page));
  });

  test(`should check when isFocused prop is false`, async ({ mount, page }) => {
    await mount(
      <HelpComponentTest isFocused={false}>{tooltipText}</HelpComponentTest>,
    );

    await checkAccessibility(page);
  });

  colors.forEach(([names, color, contrastingColors]) => {
    test(`should check tooltipBgColor as ${names}`, async ({ mount, page }) => {
      await mount(
        <HelpComponentTest
          tooltipBgColor={color}
          tooltipFontColor={contrastingColors}
          isFocused
        >
          {tooltipText}
        </HelpComponentTest>,
      );
      const tooltip = getDataElementByValue(page, "tooltip");

      await checkAccessibility(page, tooltip);
    });
  });

  colors.forEach(([names, color, contrastingColor]) => {
    test(`should check tooltipFontColor as ${names}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <HelpComponentTest
          tooltipBgColor={contrastingColor}
          tooltipFontColor={color}
          isFocused
        >
          {tooltipText}
        </HelpComponentTest>,
      );
      const tooltip = getDataElementByValue(page, "tooltip");

      await checkAccessibility(page, tooltip);
    });
  });

  (["top", "bottom", "left", "right"] as HelpProps["position"][]).forEach(
    (position) => {
      test(`should render tooltipFlipOverrides as ${position}`, async ({
        mount,
        page,
      }) => {
        await page.setViewportSize({ width: 700, height: 120 });
        await mount(
          <Box ml="250px">
            <Help tooltipFlipOverrides={[position]} isFocused>
              {`This tooltip is positioned ${position}`}
            </Help>
          </Box>,
        );
        const tooltip = getDataElementByValue(page, "tooltip");

        await checkAccessibility(page, tooltip);
      });
    },
  );

  testData.forEach((tooltipId) => {
    test(`should check tooltipId as ${tooltipId}`, async ({ mount, page }) => {
      await mount(
        <HelpComponentTest tooltipId={tooltipId} isFocused>
          {tooltipText}
        </HelpComponentTest>,
      );

      await helpComponent(page).hover();
      await checkAccessibility(page, tooltipPreview(page));
    });
  });

  (
    ["top", "bottom", "left", "right"] as HelpProps["tooltipPosition"][]
  ).forEach((tooltipPosition) => {
    test(`should render with tooltip positioned ${tooltipPosition}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <HelpComponentTest tooltipPosition={tooltipPosition} isFocused>
          {`This tooltip is positioned ${tooltipPosition}`}
        </HelpComponentTest>,
      );
      const tooltip = getDataElementByValue(page, "tooltip");

      await checkAccessibility(page, tooltip);
    });
  });

  (["error", "add", "minus", "settings"] as HelpProps["type"][]).forEach(
    (iconType) => {
      test(`should render with iconType prop passed as ${iconType}`, async ({
        mount,
        page,
      }) => {
        await mount(<HelpComponentTest isFocused type={iconType} />);

        await checkAccessibility(page);
      });
    },
  );
});
