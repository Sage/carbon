import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { PillComponent, PillOnDarkBackground } from "./components.test-pw";

import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("should check for Accessibility tests", () => {
  test("should pass accessibility tests for default pill example", async ({
    mount,
    page,
  }) => {
    await mount(<PillComponent>Pill</PillComponent>);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for pill with dark background", async ({
    mount,
    page,
  }) => {
    await mount(
      <PillOnDarkBackground
        pillRole="status"
        colorVariant="neutral"
        fill
        isDarkBackground
      >
        Pill
      </PillOnDarkBackground>,
    );

    await checkAccessibility(page);
  });
});
