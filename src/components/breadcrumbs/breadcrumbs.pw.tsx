import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import {
  breadcrumbsComponent,
  allCrumbs,
  crumbAtIndex,
} from "../../../playwright/components/breadcrumbs/index";
import {
  Default,
  DefaultCrumb,
  FocusedCrumbBecomesCurrent,
} from "./components.test-pw";
import {
  checkAccessibility,
  expectEventWasNotCalled,
  expectEventWasCalledOnce,
} from "../../../playwright/support/helper";
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
      "rgb(255, 218, 128)"
    );
    await expect(crumbAtIndex(page, 0).locator("span").first()).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px"
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
      "rgb(255, 218, 128)"
    );
    await expect(crumbAtIndex(page, 0).locator("span").first()).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px"
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
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px"
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
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px"
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
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px"
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
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px"
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
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px"
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
      "rgb(255, 218, 128)"
    );
    await expect(crumbAtIndex(page, 0).locator("span").first()).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 4px 0px 0px"
    );
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
  const messages: string[] = [];

  await mount(
    <DefaultCrumb
      onClick={(data) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        messages.push(data);
      }}
    />
  );

  const crumbToClick = crumbAtIndex(page, 0);
  await crumbToClick.click();

  await expectEventWasCalledOnce(messages, "onClick");
});

test("should not set the onClick or href props when isCurrent is true", async ({
  mount,
  page,
}) => {
  const messages: string[] = [];

  await mount(
    <DefaultCrumb
      href={CHARACTERS.STANDARD}
      onClick={(data) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        messages.push(data);
      }}
      isCurrent
    />
  );

  const crumbToClick = crumbAtIndex(page, 0);
  await crumbToClick.click();

  await expectEventWasNotCalled(messages);
  await expect(crumbToClick.locator("a")).not.toHaveAttribute("href", "/");
});

test.describe("Accessibility tests for Breadcrumbs component", async () => {
  test("should pass accessibility tests for Breadcrumbs default story", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Crumb default story", async ({
    mount,
    page,
  }) => {
    await mount(<DefaultCrumb />);
    await checkAccessibility(page);
  });
});
