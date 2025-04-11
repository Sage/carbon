import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  getDataElementByValue,
  icon,
  link,
  tooltipPreview,
} from "../../../playwright/components";
import { skipLink, linkChildren } from "../../../playwright/components/link";
import { ICON } from "../../../playwright/components/locators";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  checkAccessibility,
  containsClass,
} from "../../../playwright/support/helper";
import Box from "../../../src/components/box";
import Link, { LinkProps } from "../../../src/components/link";
import {
  LinkComponent,
  LinkComponentAsButton,
  LinkComponentWithDarkBackground,
} from "../../../src/components/link/components.test-pw";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testPlaywright = "test-playwright";

test.describe("check props for Link component", () => {
  testData.forEach((className) => {
    test(`should render className using ${className} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<LinkComponent className={className} />);

      const linkWrapperElement = link(page);
      await containsClass(linkWrapperElement, className);
    });
  });

  test("should render disabled when rendering a button", async ({
    mount,
    page,
  }) => {
    await mount(<LinkComponentAsButton disabled />);

    const buttonElement = linkChildren(page);
    await expect(buttonElement).toBeDisabled();
    await expect(buttonElement).toHaveCSS("color", "rgba(0, 0, 0, 0.3)");
  });

  test("when `disabled` prop is true and component is hovered over, it should apply the expected cursor", async ({
    mount,
    page,
  }) => {
    await mount(
      <LinkComponent disabled href="#">
        Test Content
      </LinkComponent>,
    );

    const linkElement = linkChildren(page);
    await linkElement.hover();

    await expect(linkElement).toHaveCSS("cursor", "not-allowed");
  });

  test("should render with icon prop", async ({ mount, page }) => {
    await mount(<LinkComponent icon="add" />);

    const iconElement = getDataElementByValue(page, "add");
    await expect(iconElement).toBeVisible();
  });

  (
    [
      ["left", 0],
      ["right", 1],
    ] as [LinkProps["iconAlign"], number][]
  ).forEach(([iconAlign, iconPosition]) => {
    test(`should render with iconAlign prop set to ${iconAlign}`, async ({
      mount,
      page,
    }) => {
      await mount(<LinkComponent icon="add" iconAlign={iconAlign} />);

      const iconElement = link(page).locator("span").nth(iconPosition);
      await expect(iconElement).toHaveAttribute("data-component", "icon");
      await expect(iconElement).toBeVisible();
    });
  });

  test("should render with href prop", async ({ mount, page }) => {
    await mount(<LinkComponent href={testPlaywright} />);

    const linkElement = linkChildren(page);
    await expect(linkElement).toHaveAttribute("href", testPlaywright);
  });

  test("should render with tooltipMessage prop", async ({ mount, page }) => {
    await mount(<LinkComponent icon="add" tooltipMessage={testPlaywright} />);

    const iconElement = icon(page);
    await iconElement.hover();
    const tooltipPreviewElement = tooltipPreview(page);
    await expect(tooltipPreviewElement).toHaveText(testPlaywright);
  });

  test("when no children are passed, there should be no text decoration on the anchor element", async ({
    mount,
    page,
  }) => {
    await mount(<Link icon="bin" href="www.sage.com" />);

    const linkElement = linkChildren(page);
    await expect(linkElement).toHaveCSS("text-decoration-line", "none");
  });

  test("when no children are passed, should have the inline display property", async ({
    mount,
    page,
  }) => {
    await mount(<Link icon="bin" href="www.sage.com" />);

    const linkElement = link(page).locator(ICON);
    await expect(linkElement).toHaveCSS("display", "inline");
  });

  (["top", "bottom", "left", "right"] as const).forEach((tooltipPosition) => {
    test(`should render with tooltipPosition prop set to ${tooltipPosition}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box m="250px">
          <LinkComponent
            icon="add"
            tooltipMessage={testPlaywright}
            tooltipPosition={tooltipPosition}
          />
        </Box>,
      );

      const iconElement = icon(page);
      await iconElement.hover();
      await expect(iconElement).toBeVisible();

      const tooltipElement = tooltipPreview(page);
      await expect(tooltipElement).toHaveAttribute(
        "data-placement",
        tooltipPosition,
      );
    });
  });

  ["_blank", "_self", "_parent", "_top"].forEach((target) => {
    test(`should render with target prop set to ${target}`, async ({
      mount,
      page,
    }) => {
      await mount(<LinkComponent target={target} />);

      const linkElement = linkChildren(page);
      await expect(linkElement).toHaveAttribute("target", target);
    });
  });

  test("should render with ariaLabel prop", async ({ mount, page }) => {
    await mount(<LinkComponent ariaLabel={testPlaywright} />);

    const linkElement = linkChildren(page);
    await expect(linkElement).toHaveAttribute("aria-label", testPlaywright);
  });

  ["noopener", "noreferrer", "opener"].forEach((rel) => {
    test(`should render with rel prop set to ${rel}`, async ({
      mount,
      page,
    }) => {
      await mount(<LinkComponent rel={rel} />);

      const linkElement = linkChildren(page);
      await expect(linkElement).toHaveAttribute("rel", rel);
    });
  });

  test("should render with isSkipLink prop", async ({ mount, page }) => {
    await mount(<LinkComponent isSkipLink />);

    await page.keyboard.press("Tab");
    const skipLinkElement = skipLink(page);
    await expect(skipLinkElement).toBeVisible();
    await expect(skipLinkElement).toHaveCSS(
      "background-color",
      "rgb(255, 188, 25)",
    );
    await expect(skipLinkElement).toHaveCSS("font-size", "14px");
    await expect(skipLinkElement).toHaveCSS("padding-left", "24px");
    await expect(skipLinkElement).toHaveCSS("padding-right", "24px");
    await expect(skipLinkElement).toHaveCSS(
      "box-shadow",
      "rgba(0, 20, 30, 0.1) 0px 10px 30px 0px, rgba(0, 20, 30, 0.1) 0px 30px 60px 0px",
    );
  });

  test("should apply correct focus styling to skip link", async ({
    mount,
    page,
  }) => {
    await mount(<LinkComponent isSkipLink />);

    await page.keyboard.press("Tab");
    const skipLinkElement = skipLink(page);
    await expect(skipLinkElement).toBeVisible();
    await expect(skipLinkElement).toHaveCSS("top", "8px");
    await expect(skipLinkElement).toHaveCSS("left", "0px");
    await expect(skipLinkElement).toHaveCSS(
      "text-decoration",
      "underline 4px solid rgb(0, 0, 0)",
    );
    await expect(skipLinkElement).toHaveCSS("text-decoration-thickness", "4px");
    await expect(skipLinkElement).toHaveCSS("text-underline-offset", "3px");
  });

  (
    [
      ["default", "rgb(0, 126, 69)"],
      ["negative", "rgb(203, 55, 74)"],
      ["neutral", "rgba(0, 0, 0, 0.9)"],
    ] as [LinkProps["variant"], string][]
  ).forEach(([variant, defaultColor]) => {
    test(`should render with variant prop set to ${variant}`, async ({
      mount,
      page,
    }) => {
      await mount(<LinkComponent variant={variant} />);

      const linkElement = linkChildren(page);
      await expect(linkElement).toHaveCSS("color", defaultColor);
    });
  });

  (
    [
      ["default", "rgb(0, 103, 56)"],
      ["negative", "rgb(162, 44, 59)"],
      ["neutral", "rgb(0, 103, 56)"],
    ] as [LinkProps["variant"], string][]
  ).forEach(([variant, hoverColor]) => {
    test(`should render with correct hover state with variant prop set to ${variant}`, async ({
      mount,
      page,
    }) => {
      await mount(<LinkComponent variant={variant} />);

      const linkElement = linkChildren(page);
      await linkElement.hover();
      await expect(linkElement).toHaveCSS("color", hoverColor);
    });
  });

  (
    [
      ["default", "rgb(25, 142, 89)"],
      ["negative", "rgb(208, 75, 92)"],
      ["neutral", "rgb(25, 142, 89)"],
    ] as [LinkProps["variant"], string][]
  ).forEach(([variant, hoverColor]) => {
    test(`should render with correct hover state with isDarkBackground prop set with ${variant} variant`, async ({
      mount,
      page,
    }) => {
      await mount(<LinkComponent variant={variant} isDarkBackground />);

      const linkElement = linkChildren(page);
      await linkElement.hover();
      await expect(linkElement).toHaveCSS("color", hoverColor);
    });
  });
});

test("should render with the correct focus styling", async ({
  mount,
  page,
}) => {
  await mount(<LinkComponent />);

  const linkElement = linkChildren(page);
  await linkElement.focus();
  await expect(linkElement).toHaveCSS("background-color", "rgb(255, 218, 128)");
  await expect(linkElement).toHaveCSS("color", "rgba(0, 0, 0, 0.9)");
  await expect(linkElement).toHaveCSS("border-radius", "2px");
  const linkWrapper = link(page);
  await expect(linkWrapper).toHaveCSS(
    "box-shadow",
    "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px",
  );
  await expect(linkWrapper).toHaveCSS("max-width", "fit-content");
});

test.describe("check events for Link component", () => {
  test("should call onClick callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback = () => {
      callbackCount += 1;
    };
    await mount(<LinkComponent onClick={callback} />);

    const linkComponent = link(page);
    await linkComponent.click();
    expect(callbackCount).toBe(1);
  });

  test("should call onKeyDown callback when a key is pressed", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback = () => {
      callbackCount += 1;
    };
    await mount(<LinkComponent onKeyDown={callback} />);

    const linkComponent = linkChildren(page);
    await linkComponent.press("ArrowRight");
    expect(callbackCount).toBe(1);
  });

  test("should call onMouseDown callback when a keydown event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback = () => {
      callbackCount += 1;
    };
    await mount(<LinkComponent onMouseDown={callback} />);

    const linkElement = linkChildren(page);
    await linkElement.dispatchEvent("mousedown");
    expect(callbackCount).toBe(1);
  });
});

test.describe("should check accessibility for Link component", () => {
  test("should pass accessibility tests for default link example", async ({
    mount,
    page,
  }) => {
    await mount(<LinkComponent />);

    await checkAccessibility(page);
  });

  // FE-4647
  test.skip("should pass accessibility tests when disabled", async ({
    mount,
    page,
  }) => {
    await mount(<LinkComponent disabled />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with dark background", async ({
    mount,
    page,
  }) => {
    await mount(<LinkComponentWithDarkBackground isDarkBackground />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with icon", async ({ mount, page }) => {
    await mount(<LinkComponent icon="add" />);

    await checkAccessibility(page);
  });

  (["left", "right"] as LinkProps["iconAlign"][]).forEach((iconAlign) => {
    test(`should pass accessibility tests with iconAlign prop set to ${iconAlign}`, async ({
      mount,
      page,
    }) => {
      await mount(<LinkComponent icon="add" iconAlign={iconAlign} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests with href", async ({ mount, page }) => {
    await mount(<LinkComponent href={testPlaywright} />);

    await checkAccessibility(page);
  });

  (
    ["top", "bottom", "left", "right"] as LinkProps["tooltipPosition"][]
  ).forEach((tooltipPosition) => {
    test(`should pass accessibility tests with tooltipPosition prop set to ${tooltipPosition}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box m="250px">
          <LinkComponent
            icon="add"
            tooltipMessage={testPlaywright}
            tooltipPosition={tooltipPosition}
          />
        </Box>,
      );

      await checkAccessibility(page);
    });
  });

  ["_blank", "_self", "_parent", "_top"].forEach((target) => {
    test(`should pass accessibility tests with target prop set to ${target}`, async ({
      mount,
      page,
    }) => {
      await mount(<LinkComponent target={target} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests with ariaLabel prop", async ({
    mount,
    page,
  }) => {
    await mount(<LinkComponent ariaLabel={testPlaywright} />);

    await checkAccessibility(page);
  });

  ["noopener", "noreferrer", "opener"].forEach((rel) => {
    test(`should pass accessibility tests with rel prop set to ${rel}`, async ({
      mount,
      page,
    }) => {
      await mount(<LinkComponent rel={rel} />);

      await checkAccessibility(page);
    });
  });

  (["default", "negative", "neutral"] as LinkProps["variant"][]).forEach(
    (variant) => {
      test(`should pass accessibility tests with variant prop set to ${variant}`, async ({
        mount,
        page,
      }) => {
        await mount(<LinkComponent variant={variant} />);

        await checkAccessibility(page);
      });
    },
  );
});
