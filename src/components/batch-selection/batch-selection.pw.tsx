import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import BatchSelectionComponent from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("Accessibility tests", () => {
  test("should pass accessibility test for BatchSelection", async ({
    mount,
    page,
  }) => {
    await mount(
      <BatchSelectionComponent
        selectedCount={3}
        totalItems={10}
        onDismiss={() => {}}
      />,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility test for hidden BatchSelection", async ({
    mount,
    page,
  }) => {
    await mount(
      <BatchSelectionComponent
        hidden
        selectedCount={3}
        totalItems={10}
        onDismiss={() => {}}
      />,
    );
    await checkAccessibility(page);
  });
});
