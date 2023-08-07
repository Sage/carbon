import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import {
  breadcrumbsComponent,
  allCrumbs,
  crumbAtIndex,
} from "../../../playwright/components/breadcrumbs/index";
import { Default, DefaultCrumb } from "./components.test-pw";
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
        expectedValue
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

test("when Crumb's isCurrent prop is true, Crumb divider should not exist", async ({
  mount,
  page,
}) => {
  await mount(<DefaultCrumb isCurrent />);

  const crumbElement = crumbAtIndex(page, 0);
  await expect(crumbElement.locator("a")).toHaveAttribute(
    "aria-current",
    "page"
  );
  await expect(crumbElement.locator("span").nth(1)).toHaveCSS(
    "color",
    "rgba(0, 0, 0, 0.9)"
  );
});

test("when Crumb's isCurrent prop is false, Crumb divider should be visible", async ({
  mount,
  page,
}) => {
  await mount(<DefaultCrumb isCurrent={false} />);

  const crumbElement = crumbAtIndex(page, 0);
  await expect(crumbElement.locator("a")).toHaveAttribute("href", "#");
  await expect(crumbElement.locator("span").nth(1)).toHaveCSS(
    "color",
    "rgb(0, 126, 69)"
  );
  await expect(crumbElement.locator("span").nth(2)).toHaveCSS(
    "color",
    "rgba(0, 0, 0, 0.55)"
  );
});

test("should call the onClick callback when clicked", async ({
  mount,
  page,
}) => {
  let hasOnClickBeenCalledCount = 0;
  await mount(
    <DefaultCrumb
      onClick={() => {
        hasOnClickBeenCalledCount += 1;
      }}
    />
  );

  const crumbToClick = crumbAtIndex(page, 0);
  await crumbToClick.click();
  expect(hasOnClickBeenCalledCount).toBe(1);
});

test("should not set the onClick or href props when isCurrent is true", async ({
  mount,
  page,
}) => {
  let hasOnClickBeenCalledCount = 0;
  await mount(
    <DefaultCrumb
      href={CHARACTERS.STANDARD}
      onClick={() => {
        hasOnClickBeenCalledCount += 1;
      }}
      isCurrent
    />
  );

  const crumbToClick = crumbAtIndex(page, 0);
  await crumbToClick.click();
  expect(hasOnClickBeenCalledCount).toBeFalsy();

  await expect(crumbToClick.locator("a")).not.toHaveAttribute("href", "/");
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
