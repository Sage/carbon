import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import LinkPreviewComponentTest from "./components.test-pw";
import { LinkPreviewProps } from ".";
import {
  linkPreview,
  linkPreviewCloseIcon,
  linkPreviewAs,
} from "../../../playwright/components/link-preview";
import { checkAccessibility } from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testPlaywright = "test-playwright";
const urlProp = "./carbon-by-sage-logo.png";
const keysToTrigger = ["Space", "Enter"];

test.describe("check styling for Link Preview component", () => {
  test("should have the expected focus styling", async ({ mount, page }) => {
    await mount(<LinkPreviewComponentTest aria-label={CHARACTERS.STANDARD} />);

    const previewElement = linkPreview(page);
    await previewElement.focus();

    await expect(previewElement).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
  });

  test("should render with the expected border radius styling", async ({
    mount,
    page,
  }) => {
    await mount(<LinkPreviewComponentTest />);

    await expect(linkPreview(page)).toHaveCSS("border-radius", "8px");

    await expect(
      page.locator('[data-component="link preview image placeholder"]'),
    ).toHaveCSS("border-radius", "8px 0px 0px 8px");
  });
});

test.describe("check props for Link Preview component", () => {
  (["div", "a"] as LinkPreviewProps["as"][]).forEach((as) => {
    test(`should render Link Preview as prop using ${as}`, async ({
      mount,
      page,
    }) => {
      await mount(<LinkPreviewComponentTest as={as} />);

      await expect(linkPreviewAs(page, as)).toBeVisible();
    });
  });

  testData.forEach((title) => {
    test(`should render Link Preview title prop using ${title} as special character`, async ({
      mount,
      page,
    }) => {
      await mount(<LinkPreviewComponentTest title={title} />);

      await expect(page.getByText(title)).toBeAttached();
    });
  });

  testData.forEach((description) => {
    test(`should render Link Preview description prop using ${description} as special character`, async ({
      mount,
      page,
    }) => {
      await mount(<LinkPreviewComponentTest description={description} />);

      await expect(page.getByText(description)).toBeAttached();
    });
  });

  test("should render Link Preview with isLoading prop", async ({
    mount,
    page,
  }) => {
    await mount(<LinkPreviewComponentTest isLoading />);

    const previewComponent = page.locator(`[data-component="preview"]`);

    const count = await previewComponent.count();

    expect(count).toBe(4);
  });

  test("should render Link Preview with Image props", async ({
    mount,
    page,
  }) => {
    await mount(
      <LinkPreviewComponentTest
        image={{ url: urlProp, alt: testPlaywright }}
      />,
    );

    await expect(page.locator("img")).toHaveAttribute("src", urlProp);

    await expect(page.locator("img")).toHaveAttribute("alt", testPlaywright);
  });

  test("should render Link Preview with url prop", async ({ mount, page }) => {
    await mount(<LinkPreviewComponentTest url="https://www.foo.com" />);

    await expect(page.getByText("www.foo.com")).toBeAttached();
  });
});

test.describe("check functionality for Link Preview component", () => {
  test("should verify hover color", async ({ mount, page }) => {
    await mount(<LinkPreviewComponentTest />);

    const previewElement = linkPreview(page);
    await previewElement.hover();

    await expect(previewElement).toHaveCSS(
      "background-color",
      "rgb(204, 214, 219)",
    );
  });
});

test.describe("check events for Link Preview component", () => {
  test("should call onClose callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <LinkPreviewComponentTest
        as="div"
        onClose={() => {
          callbackCount += 1;
        }}
      />,
    );

    await linkPreviewCloseIcon(page).click();

    expect(callbackCount).toEqual(1);
  });

  keysToTrigger.forEach((key) => {
    test(`should call onClose callback when a keyboard key ${key} event is triggered`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;

      await mount(
        <LinkPreviewComponentTest
          as="div"
          onClose={() => {
            callbackCount += 1;
          }}
        />,
      );

      await page.keyboard.press("Tab");
      await page.keyboard.press(key);

      await linkPreviewCloseIcon(page).waitFor();
      expect(callbackCount).toEqual(1);
    });
  });
});

test.describe("Accessibility tests for LinkPreview component", () => {
  test("should pass accessibility tests for default example", async ({
    mount,
    page,
  }) => {
    await mount(<LinkPreviewComponentTest />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for loading state", async ({
    mount,
    page,
  }) => {
    await mount(<LinkPreviewComponentTest isLoading />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for close icon", async ({
    mount,
    page,
  }) => {
    await mount(<LinkPreviewComponentTest onClose={() => {}} />);

    await checkAccessibility(page);
  });
});
