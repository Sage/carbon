import React from "react";
import { test } from "../../../playwright/helpers/base-test";

import { TabsWithLink, TabsWithTitleSiblings } from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("Accessibility tests for legacy Tabs component", () => {
  test("should pass accessibility tests with a link as a tab", async ({
    mount,
    page,
  }) => {
    await mount(<TabsWithLink />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with title siblings", async ({
    mount,
    page,
  }) => {
    await mount(<TabsWithTitleSiblings />);

    await checkAccessibility(page);
  });
});
