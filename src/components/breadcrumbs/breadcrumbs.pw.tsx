import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import {
  breadcrumbsComponent,
  allCrumbs,
  crumbAtIndex,
} from "../../../playwright/components/breadcrumbs/index";
import { Default, DefaultCrumb } from "./components.test-pw";
import {
  checkAccessibility,
  getStyle,
} from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";

const isCurrentVar = [
  [true, "aria-current", "page"],
  [false, "href", "#"],
] as [boolean, string, string][];

test.describe("should render Breadcrumbs component", async () => {
  test("should check Breadcrumbs children is set visible", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);

    await expect(breadcrumbsComponent(page)).toBeVisible();

    const numberOfCrumbs = await allCrumbs(page).count();
    expect(numberOfCrumbs).toEqual(4);
  });

  test("should check Breadcrumbs on hover color", async ({ mount, page }) => {
    await mount(<Default />);

    const crumbElement = crumbAtIndex(page, 1);
    await crumbElement.hover();

    const link = crumbElement.locator("a");
    await expect(link).toHaveCSS("color", "rgb(0, 103, 56)");
  });

  test("should check Breadcrumbs on focus", async ({ mount, page }) => {
    await mount(<Default />);

    await page.locator("body").press("Tab");
    await expect(crumbAtIndex(page, 0).locator("a")).toBeFocused();
    await crumbAtIndex(page, 1).locator("a").press("Tab");
    await expect(crumbAtIndex(page, 2).locator("a")).toBeFocused();
  });

  isCurrentVar.forEach((array) => {
    const [boolean, attr, value] = array;
    test(`should check Crumb with isCurrent prop is ${boolean}`, async ({
      mount,
      page,
    }) => {
      await mount(<DefaultCrumb isCurrent={boolean} />);
      await expect(crumbAtIndex(page, 0).locator("a")).toHaveAttribute(
        attr,
        value
      );
    });
  });

  test("should check Crumb with href prop set to default val", async ({
    mount,
    page,
  }) => {
    await mount(<DefaultCrumb href={CHARACTERS.STANDARD} />);
    await expect(crumbAtIndex(page, 0).locator("a")).toHaveAttribute(
      "href",
      CHARACTERS.STANDARD
    );
  });
});

test.describe("should check Crumb props", async () => {
  const isVisibleAndBoolean = [
    ["not exist", true, "aria-current", "page", "rgba(0, 0, 0, 0.9)"],
    ["is visible", false, "href", "#", "rgb(0, 126, 69)"],
  ] as [string, boolean, string, string, string][];
  isVisibleAndBoolean.forEach((array) => {
    const [state, boolean, attr, parameter, colorOfBreadCrumb] = array;
    test(`should check Crumb divider ${state}`, async ({ mount, page }) => {
      await mount(<DefaultCrumb isCurrent={boolean} />);

      const crumbElement = crumbAtIndex(page, 0);
      await expect(crumbElement.locator("a")).toHaveAttribute(attr, parameter);
      await expect(crumbElement.locator("span").nth(1)).toHaveCSS(
        "color",
        colorOfBreadCrumb
      );

      if (!boolean) {
        await expect(crumbElement.locator("span").nth(2)).toHaveCSS(
          "color",
          "rgba(0, 0, 0, 0.55)"
        );
      }
    });
  });

  test("should call the onClick callback when clicked", async ({
    mount,
    page,
  }) => {
    let capturedCallback = false;
    await mount(<DefaultCrumb onClick={() => (capturedCallback = true)} />);

    const crumbToClick = crumbAtIndex(page, 0);
    await crumbToClick.click();
    expect(capturedCallback).toBeTruthy();
  });

  test("should not set the onClick or href props when isCurrent is true", async ({
    mount,
    page,
  }) => {
    let capturedCallback = false;
    await mount(
      <DefaultCrumb
        href={CHARACTERS.STANDARD}
        onClick={() => (capturedCallback = true)}
        isCurrent
      />
    );

    const crumbToClick = crumbAtIndex(page, 0);
    await crumbToClick.click();
    expect(capturedCallback).toBeFalsy();

    await expect(crumbToClick.locator("a")).not.toHaveAttribute("href", "/");
  });
});

test.describe("Accessibility tests for Breadcrumbs component", async () => {
  test("should pass accessibilty tests for Breadcrumbs default story", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);
    await checkAccessibility(page);
  });

  test("should pass accessibilty tests for Crumb default story", async ({
    mount,
    page,
  }) => {
    await mount(<DefaultCrumb />);
    await checkAccessibility(page);
  });
});
