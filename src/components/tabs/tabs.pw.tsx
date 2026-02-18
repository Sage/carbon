import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import { tabById, tabContentById } from "../../../playwright/components/tabs";
import {
  TabsComponent,
  TabsComponentValidations,
  TabsComponentValidationsUnregistering,
  WithAdditionalTitleSiblings,
  WithAdditionalTitleSiblingsSizeLarge,
  WithCustomLayout,
  Responsive,
  WithUpdatingChild,
} from "./components.test-pw";
import { getDataElementByValue } from "../../../playwright/components";
import { ICON, PILL_PREVIEW } from "../../../playwright/components/locators";
import { checkAccessibility } from "../../../playwright/support/helper";

const validationTypes = ["error", "warning", "info"] as const;

test.describe("Tabs component", () => {
  [1, 2, 3, 4, 5].forEach((id) => {
    test(`should verify when Tab ${id} is clicked that it is visible and content text is displayed`, async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent />);

      await tabById(page, id).click();

      await expect(tabContentById(page, id)).toBeVisible();
      await expect(tabContentById(page, id)).toHaveText(
        `Content for tab ${id}`,
      );
    });
  });

  test("should verify the first Tab has a link property", async ({
    mount,
    page,
  }) => {
    await mount(<TabsComponent href="https://carbon.sage.com/" />);

    await expect(tabById(page, 1)).toHaveAttribute(
      "href",
      "https://carbon.sage.com/",
    );
    await expect(tabById(page, 1)).toHaveAttribute("target", "_blank");
  });

  test("should not render Tabs hidden content when renderHiddenTabs prop is false", async ({
    mount,
    page,
  }) => {
    await mount(<TabsComponent renderHiddenTabs={false} />);

    await expect(tabContentById(page, 1)).toBeVisible();
    await expect(tabContentById(page, 2)).not.toBeAttached();
  });

  [5, 4, 3, 2, 1].forEach((id) => {
    test(`should render the correct Tab and content when selectedTabId prop is set to ${id}`, async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent selectedTabId={`tab-${id}`} />);

      await tabById(page, id).click();

      await expect(tabContentById(page, id)).toBeVisible();
      await expect(tabContentById(page, id)).toHaveText(
        `Content for tab ${id}`,
      );
    });
  });

  test("should render Tabs with customLayout prop", async ({ mount, page }) => {
    await mount(<WithCustomLayout />);

    await expect(tabById(page, 1).locator(ICON).nth(0)).toBeVisible();
    await expect(tabById(page, 1).locator(ICON).nth(1)).toBeVisible();
    await expect(page.getByText("Tab 1", { exact: true })).toBeVisible();
  });

  test("should render Tabs with siblings prop", async ({ mount, page }) => {
    await mount(<WithAdditionalTitleSiblings />);

    const pill = tabById(page, 1).locator(PILL_PREVIEW);

    await expect(pill).toBeVisible();
    await expect(pill).toHaveText("12");
  });

  test("when the children of a Tab update, the selected tab does not change", async ({
    mount,
    page,
  }) => {
    await mount(<WithUpdatingChild />);

    await page.getByRole("button").click();

    await expect(page.getByText("Content for tab 2")).toBeVisible();
    await expect(page.getByText("Content for tab 1")).toBeHidden();
  });

  validationTypes.forEach((validation) => {
    test(`should no longer report ${validation} validation of children no longer mounted`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TabsComponentValidationsUnregistering validationType={validation} />,
      );

      const icon = tabById(page, 1).locator(ICON);
      await expect(icon).toBeVisible();

      await getDataElementByValue(page, "foo-button").click();
      await expect(icon).toBeHidden();
    });
  });

  test.describe("Accessibility tests for Tabs component", () => {
    test("should pass accessibility tests with link as a tab", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent href="https://carbon.sage.com/" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests with selectedTabId", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponent selectedTabId="tab-2" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is top and validations", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponentValidations position="top" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is top, size is large and validations", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponentValidations position="top" size="large" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is left and validations", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponentValidations position="left" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests when position is left, size is large and validations", async ({
      mount,
      page,
    }) => {
      await mount(<TabsComponentValidations position="left" size="large" />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests with additional title siblings example", async ({
      mount,
      page,
    }) => {
      await mount(<WithAdditionalTitleSiblings />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests with additional title siblings and size is large example", async ({
      mount,
      page,
    }) => {
      await mount(<WithAdditionalTitleSiblingsSizeLarge />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests with headerWidth prop", async ({
      mount,
      page,
    }) => {
      await mount(
        <TabsComponent headerWidth="400px" align="left" position="left" />,
      );

      await checkAccessibility(page);
    });

    test("should pass accessibility tests on responsive tabs", async ({
      mount,
      page,
    }) => {
      await mount(<Responsive />);

      await checkAccessibility(page);
    });
  });
});
