import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import {
  FullMenuExample,
  GlobalHeaderWithErrorHandler,
  GlobalHeaderWithLogo,
} from "./component.test-pw";
import navigationBar from "../../../playwright/components/navigation-bar";
import { globalHeaderLogo } from "../../../playwright/components/global-header";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("Global Header component", () => {
  test("should render without causing a ResizeObserver related error", async ({
    mount,
    page,
  }) => {
    await mount(<GlobalHeaderWithErrorHandler />);

    const globalHeader = page.getByRole("navigation");
    await globalHeader.waitFor({ state: "visible" });

    const errorState = page.locator("#error-div");
    await expect(errorState).toHaveText("");
  });

  test("should render with z-index of component greater than z-index of NavigationBar", async ({
    mount,
    page,
  }) => {
    await mount(<FullMenuExample />);

    const globalHeaderZIndex = await page
      .getByRole("navigation")
      .filter({ hasText: "Product Switcher" })
      .evaluate((element) => {
        const style = getComputedStyle(element);
        return style.zIndex;
      });

    const navigationBarZIndex = await navigationBar(page).evaluate(
      (element) => {
        const style = getComputedStyle(element);
        return style.zIndex;
      },
    );

    const globalIndex = parseInt(globalHeaderZIndex.toString());
    const NavIndex = parseInt(navigationBarZIndex.toString());

    expect(globalIndex).toBeGreaterThan(NavIndex);
  });

  test("should render with height of logo element, when the logo prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<GlobalHeaderWithLogo />);

    await expect(globalHeaderLogo(page)).toHaveCSS("height", `41px`);
  });

  test.describe("Accessibility tests", () => {
    test("should pass tests for FullMenuExample", async ({ mount, page }) => {
      await mount(<FullMenuExample />);

      await checkAccessibility(page);
    });

    test("should pass tests for GlobalHeaderWithLogo example", async ({
      mount,
      page,
    }) => {
      await mount(<GlobalHeaderWithLogo />);

      await checkAccessibility(page);
    });
  });
});
