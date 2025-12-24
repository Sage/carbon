import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { icon, link, tooltipPreview } from "../../../playwright/components";
import { linkChildren } from "../../../playwright/components/link";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  checkAccessibility,
  containsClass,
} from "../../../playwright/support/helper";
import Box from "../../../src/components/box";
import Link, { LinkProps } from "../../../src/components/link";
import {
  LinkComponent,
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

  test("when `underline` prop is 'always', it should apply text-decoration underline", async ({
    mount,
    page,
  }) => {
    await mount(
      <LinkComponent underline="always" href="#">
        Test Content
      </LinkComponent>,
    );
    const linkElement = linkChildren(page);
    await expect(linkElement).toHaveCSS("text-decoration-line", "underline");

    await linkElement.hover();
    await expect(linkElement).toHaveCSS("text-decoration-line", "underline");
  });

  test("when `underline` prop is 'hover', it should apply text-decoration underline on hover", async ({
    mount,
    page,
  }) => {
    await mount(
      <LinkComponent underline="hover" href="#">
        Test Content
      </LinkComponent>,
    );
    const linkElement = linkChildren(page);
    await expect(linkElement).toHaveCSS("text-decoration-line", "none");

    await linkElement.hover();
    await expect(linkElement).toHaveCSS("text-decoration-line", "underline");
  });

  test("when `underline` prop is 'never', it should apply no text-decoration", async ({
    mount,
    page,
  }) => {
    await mount(
      <LinkComponent underline="never" href="#">
        Test Content
      </LinkComponent>,
    );
    const linkElement = linkChildren(page);
    await expect(linkElement).toHaveCSS("text-decoration-line", "none");

    await linkElement.hover();
    await expect(linkElement).toHaveCSS("text-decoration-line", "none");
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

  test("should pass accessibility tests with dark background", async ({
    mount,
    page,
  }) => {
    await mount(<LinkComponentWithDarkBackground inverse />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with icon", async ({ mount, page }) => {
    await mount(<LinkComponent icon="add" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with href", async ({ mount, page }) => {
    await mount(<LinkComponent href={testPlaywright} />);

    await checkAccessibility(page);
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

  (["typical", "negative", "subtle"] as LinkProps["variant"][]).forEach(
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

  (["typical", "negative", "subtle"] as LinkProps["variant"][]).forEach(
    (variant) => {
      test(`should pass accessibility tests with variant prop set to ${variant} and inverse`, async ({
        mount,
        page,
      }) => {
        await mount(
          <LinkComponentWithDarkBackground variant={variant} inverse />,
        );

        await checkAccessibility(page);
      });
    },
  );
});
