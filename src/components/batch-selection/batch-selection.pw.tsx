import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import BatchSelectionComponent from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";

const BATCH_SELECTION_COLOR = [
  "dark",
  "light",
  "white",
  "transparent",
] as const;

test.describe("Accessibility tests", () => {
  [
    BATCH_SELECTION_COLOR[0],
    BATCH_SELECTION_COLOR[1],
    BATCH_SELECTION_COLOR[2],
    BATCH_SELECTION_COLOR[3],
  ].forEach((colorTheme) => {
    test(`should pass accessibility test for BatchSelection component when colorTheme is ${colorTheme}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <BatchSelectionComponent colorTheme={colorTheme} selectedCount={3} />,
      );

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility test for hidden BatchSelection", async ({
    mount,
    page,
  }) => {
    await mount(<BatchSelectionComponent hidden selectedCount={3} />);
    await checkAccessibility(page);
  });

  // Due to the colour of the disabled styling, this fails the colour contrast checker. No reason we cannot check the rest of the accessibility though.
  test("should pass accessibility test for disabled BatchSelection", async ({
    mount,
    page,
  }) => {
    await mount(<BatchSelectionComponent disabled selectedCount={3} />);
    await checkAccessibility(page, undefined, "color-contrast");
  });
});
