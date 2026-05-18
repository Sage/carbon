import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import { tabById } from "../../../playwright/components/tabs";
import {
  TabsComponent,
  TabsComponentValidations,
  TabsComponentValidationsUnregistering,
  WithAdditionalTitleSiblings,
  WithAdditionalTitleSiblingsSizeLarge,
  Responsive,
  WithUpdatingChild,
} from "./components.test-pw";
import { getDataElementByValue } from "../../../playwright/components";
import { ICON } from "../../../playwright/components/locators";
import { checkAccessibility } from "../../../playwright/support/helper";

const validationTypes = ["error", "warning", "info"] as const;

test.describe("Tabs component", () => {
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
