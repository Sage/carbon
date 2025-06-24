import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  breadcrumbsComponent,
  allCrumbs,
  crumbAtIndex,
} from "../../../playwright/components/breadcrumbs/index";
import {
  Default,
  DefaultCrumb,
  FocusedCrumbBecomesCurrent,
  OnDarkBackground,
} from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../playwright/support/constants";

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

  test("should have correct focus styling when a crumb is focused but not current", async ({
    mount,
    page,
  }) => {
    await mount(<FocusedCrumbBecomesCurrent />);

    await crumbAtIndex(page, 0).locator("button").focus();
    await expect(crumbAtIndex(page, 0).locator("button")).toHaveCSS(
      "background-color",
      "rgb(255, 218, 128)",
    );
    await expect(crumbAtIndex(page, 0).locator("button")).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px",
    );
  });

  test("should have correct focus styling when a crumb with href set is focused but not current", async ({
    mount,
    page,
  }) => {
    await mount(<FocusedCrumbBecomesCurrent hasHref />);

    await crumbAtIndex(page, 0).locator("a").focus();
    await expect(crumbAtIndex(page, 0).locator("a")).toHaveCSS(
      "background-color",
      "rgb(255, 218, 128)",
    );
    await expect(crumbAtIndex(page, 0).locator("a")).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px",
    );
  });

  test("should not have any focus styling when a crumb is clicked and becomes current", async ({
    mount,
    page,
  }) => {
    await mount(<FocusedCrumbBecomesCurrent />);

    await crumbAtIndex(page, 0).locator("button").click();
    await expect(crumbAtIndex(page, 0).locator("span").first()).not.toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px",
    );
  });

  test("should not have any focus styling when a crumb with href set is clicked and becomes current", async ({
    mount,
    page,
  }) => {
    await mount(<FocusedCrumbBecomesCurrent hasHref />);

    await crumbAtIndex(page, 0).locator("a").click();
    await expect(crumbAtIndex(page, 0).locator("span").first()).not.toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px",
    );
  });

  test("should not have any focus styling when user presses Enter key on focused crumb and it becomes current", async ({
    mount,
    page,
  }) => {
    await mount(<FocusedCrumbBecomesCurrent />);

    await crumbAtIndex(page, 0).locator("button").focus();
    await crumbAtIndex(page, 0).locator("button").press("Enter");
    await expect(crumbAtIndex(page, 0).locator("span").first()).not.toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px",
    );
  });

  test("should not have any focus styling when user presses Enter key on focused crumb with href set and it becomes current", async ({
    mount,
    page,
  }) => {
    await mount(<FocusedCrumbBecomesCurrent hasHref />);

    await crumbAtIndex(page, 0).locator("a").focus();
    await crumbAtIndex(page, 0).locator("a").press("Enter");
    await expect(crumbAtIndex(page, 0).locator("span").first()).not.toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px",
    );
  });

  test("should not have any focus styling when user presses Space key on focused crumb and it becomes current", async ({
    mount,
    page,
  }) => {
    await mount(<FocusedCrumbBecomesCurrent />);

    await crumbAtIndex(page, 0).locator("button").focus();
    await crumbAtIndex(page, 0).locator("button").press("Space");
    await expect(crumbAtIndex(page, 0).locator("span").first()).not.toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px",
    );
  });

  test("should have focus styling when user presses Space key on focused crumb with href set and it becomes current", async ({
    mount,
    page,
  }) => {
    await mount(<FocusedCrumbBecomesCurrent hasHref />);

    await crumbAtIndex(page, 0).locator("a").focus();
    await crumbAtIndex(page, 0).locator("a").press("Space");
    await expect(crumbAtIndex(page, 0).locator("a")).toHaveCSS(
      "background-color",
      "rgb(255, 218, 128)",
    );
    await expect(crumbAtIndex(page, 0).locator("a")).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px",
    );
  });

  test("should have correct color when Crumb is current and isDarkBackground is true", async ({
    mount,
    page,
  }) => {
    await mount(<OnDarkBackground />);

    const currentCrumb = crumbAtIndex(page, 3).locator("a");
    await expect(currentCrumb).toHaveCSS("color", "rgb(255, 255, 255)");
    await currentCrumb.hover();
    await expect(currentCrumb).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(currentCrumb).toHaveCSS("cursor", "text");
  });

  [
    {
      isCurrent: true,
      expectedAttribute: "aria-current",
      expectedValue: "page",
    },
    {
      isCurrent: false,
      expectedAttribute: "href",
      expectedValue: "#",
    },
  ].forEach(({ isCurrent, expectedAttribute, expectedValue }) => {
    test(`should check Crumb with isCurrent prop is ${isCurrent}`, async ({
      mount,
      page,
    }) => {
      await mount(<DefaultCrumb isCurrent={isCurrent} />);
      await expect(crumbAtIndex(page, 0).locator("a")).toHaveAttribute(
        expectedAttribute,
        expectedValue,
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
      CHARACTERS.STANDARD,
    );
  });
});

test("when Crumb's isCurrent prop is true, Crumb divider should not exist", async ({
  mount,
  page,
}) => {
  await mount(<DefaultCrumb isCurrent />);

  const crumbElement = crumbAtIndex(page, 0);

  await expect(crumbElement.locator("a")).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(crumbElement.locator("span").nth(0)).toHaveCSS(
    "color",
    "rgba(0, 0, 0, 0.9)",
  );
});

test.describe("Accessibility tests for Breadcrumbs component", async () => {
  test("should pass accessibility tests for default breadcrumbs", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for default crumbs", async ({
    mount,
    page,
  }) => {
    await mount(<DefaultCrumb />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for breadcrumbs on a dark background", async ({
    mount,
    page,
  }) => {
    await mount(<OnDarkBackground />);
    await checkAccessibility(page);
  });
});
