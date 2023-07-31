import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import {
  breadcrumbsComponent,
  crumb,
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

    const badgeOl = await (await breadcrumbsComponent(page))
      .locator("ol")
      .locator("li");
    const badgeOlisVisible = await (
      await breadcrumbsComponent(page)
    ).isVisible();

    await expect(await badgeOl.count()).toEqual(4);
    await expect(badgeOlisVisible).toBeTruthy();
  });

  test("should check Breadcrumbs on hover color", async ({ mount, page }) => {
    await mount(<Default />);

    const crumbElement = await crumb(page, 1);

    await crumbElement.hover();

    const cssValue = await getStyle(crumbElement.locator("a"), "color");

    await expect(cssValue).toEqual("rgb(0, 103, 56)");
  });

  test("should check Breadcrumbs on focus", async ({ mount, page }) => {
    await mount(<Default />);

    await page.locator("body").press("Tab");
    await expect((await crumb(page, 0)).locator("a")).toBeFocused();
    await (await crumb(page, 1)).locator("a").press("Tab");
    await expect((await crumb(page, 2)).locator("a")).toBeFocused();
  });

  isCurrentVar.forEach((array) => {
    const [boolean, attr, value] = array;
    test(`should check Crumb with isCurrent prop is ${boolean}`, async ({
      mount,
      page,
    }) => {
      await mount(<DefaultCrumb isCurrent={boolean} />);

      await expect((await crumb(page, 0)).locator("a")).toHaveAttribute(
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

    await expect((await crumb(page, 0)).locator("a")).toHaveAttribute(
      "href",
      CHARACTERS.STANDARD
    );
  });
});

test.describe("should check Crumb props", async () => {
  const isVisibleAndBoolean = [
    ["not exist", true, "aria-current", "page", "rgb(0, 0, 0, 0.9)"],
    ["is visible", false, "href", "#", "rgb(0, 111, 222)"],
  ] as [string, boolean, string, string, string][];
  isVisibleAndBoolean.forEach((array) => {
    const [state, boolean, attr, parameter, colorOfBreadCrumb] = array;
    test(`should check Crumb divider ${state}`, async ({ mount, page }) => {
      await mount(<DefaultCrumb isCurrent={boolean} />);

      const crumbElement = await crumb(page, 0);
      await expect(crumbElement.locator("a")).toHaveAttribute(attr, parameter);

      const breadCrumbElementColor = await getStyle(
        crumbElement.locator("span").nth(1),
        "color"
      );

      await expect(breadCrumbElementColor).toEqual(colorOfBreadCrumb);

      if (!boolean) {
        const crumbElementColor = await getStyle(
          crumbElement.locator("span").nth(2),
          "color"
        );

        await expect(crumbElementColor).toEqual("rgba(0, 0, 0, 0.55)");
      }
    });
  });

  test("should call the onClick callback when clicked", async ({
    mount,
    page,
  }) => {
    let capturedCallback = false;
    await mount(<DefaultCrumb onClick={() => (capturedCallback = true)} />);

    const crumbToClick = await crumb(page, 0);
    await crumbToClick.click();
    await expect(capturedCallback).toBeTruthy();
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

    const crumbToClick = await crumb(page, 0);
    await crumbToClick.click();
    await expect(capturedCallback).toBeFalsy();

    await expect(await crumbToClick.locator("a")).not.toHaveAttribute(
      "href",
      "/"
    );
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
