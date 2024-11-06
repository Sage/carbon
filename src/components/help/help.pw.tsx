import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import Help, { HelpProps } from "../../../src/components/help/help.component";
import HelpComponentTest from "./component.test-pw";
import Box from "../../../src/components/box";
import {
  getDataElementByValue,
  icon,
  tooltipPreview,
} from "../../../playwright/components/index";
import helpComponent from "../../../playwright/components/help";
import {
  checkAccessibility,
  containsClass,
} from "../../../playwright/support/helper";
import { COLOR, CHARACTERS } from "../../../playwright/support/constants";
import { HooksConfig } from "../../../playwright";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const tooltipText = "Some helpful text goes here";
const colors = [
  ["orange", COLOR.ORANGE],
  ["red", COLOR.RED],
  ["black", COLOR.BLACK],
  ["brown", COLOR.BROWN],
];

test.describe("when focused", () => {
  test("should have the expected styling when the focusRedesignOptOut is false", async ({
    mount,
    page,
  }) => {
    await mount(<HelpComponentTest />);

    const elementLocator = helpComponent(page);
    await elementLocator.focus();
    await expect(helpComponent(page).locator("span")).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(helpComponent(page).locator("span")).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
  });

  test("should have the expected styling when the focusRedesignOptOut is true", async ({
    mount,
    page,
  }) => {
    await mount<HooksConfig>(<HelpComponentTest />, {
      hooksConfig: { focusRedesignOptOut: true },
    });

    const elementLocator = helpComponent(page);
    await elementLocator.focus();
    await expect(helpComponent(page).locator("span")).toHaveCSS(
      "outline",
      "rgb(255, 188, 25) solid 2px",
    );
  });
});

test.describe("Testing Help component properties", () => {
  testData.forEach((ariaLabel) => {
    test(`should check ariaLabel as ${ariaLabel}`, async ({ mount, page }) => {
      await mount(<HelpComponentTest ariaLabel={ariaLabel} />);

      await expect(helpComponent(page)).toHaveAttribute(
        "aria-label",
        ariaLabel,
      );
    });
  });

  testData.forEach((className) => {
    test(`should check className as ${className}`, async ({ mount, page }) => {
      await mount(<HelpComponentTest className={className} />);

      await containsClass(helpComponent(page), className);
    });
  });

  testData.forEach((children) => {
    test(`should check children as ${children}`, async ({ mount, page }) => {
      await mount(<Help> {children} </Help>);

      await helpComponent(page).hover();
      const tooltip = getDataElementByValue(page, "tooltip");
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveText(children);
    });
  });

  testData.forEach((helpId) => {
    test(`should check id as ${helpId}`, async ({ mount, page }) => {
      await mount(<HelpComponentTest helpId={helpId} />);

      await expect(helpComponent(page)).toHaveId(helpId);
    });
  });

  ["https://carbon.sage.com", "https://www.google.com"].forEach((hrefLink) => {
    test(`should check href link as ${hrefLink}`, async ({ mount, page }) => {
      await mount(<HelpComponentTest href={hrefLink} />);

      await expect(helpComponent(page)).toHaveAttribute("href", hrefLink);
    });
  });

  [true, false].forEach((boolVal) => {
    test(`should check when isFocused prop is passed as ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <HelpComponentTest isFocused={boolVal}>
          {tooltipText}
        </HelpComponentTest>,
      );

      const tooltip = getDataElementByValue(page, "tooltip");
      if (boolVal === true) {
        await expect(tooltip).toBeVisible();
      } else {
        await expect(tooltip).not.toBeVisible();
      }
    });
  });

  [-1, 0, 1].forEach((tabIndex) => {
    test(`should check tabIndex as ${tabIndex}`, async ({ mount, page }) => {
      await mount(<HelpComponentTest tabIndex={tabIndex} />);

      await page.keyboard.press("Tab");
      if (tabIndex === -1) {
        await expect(helpComponent(page)).not.toBeFocused();
      } else {
        await expect(helpComponent(page)).toBeFocused();
      }
    });
  });

  colors.forEach(([names, color]) => {
    test(`should check tooltipBgColor as ${names}`, async ({ mount, page }) => {
      await mount(
        <HelpComponentTest tooltipBgColor={color} isFocused>
          {tooltipText}
        </HelpComponentTest>,
      );

      const tooltip = getDataElementByValue(page, "tooltip");
      await expect(tooltip).toHaveCSS("background-color", color);
    });
  });

  colors.forEach(([names, color]) => {
    test(`should check tooltipFontColor as ${names}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <HelpComponentTest tooltipFontColor={color} isFocused>
          {tooltipText}
        </HelpComponentTest>,
      );

      const tooltip = getDataElementByValue(page, "tooltip");
      await expect(tooltip).toHaveCSS("color", color);
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

        await page.evaluate(() => window.scrollTo(50, 50));
        const tooltip = getDataElementByValue(page, "tooltip");
        await expect(tooltip).toHaveAttribute("data-placement", position);
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

      const tooltip = getDataElementByValue(page, "tooltip");
      await expect(tooltip).toHaveId(tooltipId);
    });
  });

  (
    ["top", "bottom", "left", "right"] as ["top", "bottom", "left", "right"]
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

      await expect(helpComponent(page)).toBeVisible();
      const tooltip = getDataElementByValue(page, "tooltip");
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveAttribute("data-placement", tooltipPosition);
    });
  });

  (
    ["error", "add", "minus", "settings"] as [
      "error",
      "add",
      "minus",
      "settings",
    ]
  ).forEach((iconType) => {
    test(`should render with iconType prop passed as ${iconType}`, async ({
      mount,
      page,
    }) => {
      await mount(<HelpComponentTest isFocused type={iconType} />);

      await expect(icon(page)).toBeVisible();
      await expect(icon(page)).toHaveAttribute("type", iconType);
    });
  });
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

  colors.forEach(([names, color]) => {
    test(`should check tooltipBgColor as ${names}`, async ({ mount, page }) => {
      await mount(
        <HelpComponentTest tooltipBgColor={color} isFocused>
          {tooltipText}
        </HelpComponentTest>,
      );

      // color-contrast ignored until we can investigate and fix FE-6245
      await checkAccessibility(page, undefined, "color-contrast");
    });
  });

  colors.forEach(([names, color]) => {
    test(`should check tooltipFontColor as ${names}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <HelpComponentTest tooltipFontColor={color} isFocused>
          {tooltipText}
        </HelpComponentTest>,
      );

      // color-contrast ignored until we can investigate and fix FE-6245
      await checkAccessibility(page, undefined, "color-contrast");
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

        // color-contrast ignored until we can investigate and fix FE-6245
        await checkAccessibility(page, undefined, "color-contrast");
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

      // color-contrast ignored until we can investigate and fix FE-6245
      await checkAccessibility(page, undefined, "color-contrast");
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
