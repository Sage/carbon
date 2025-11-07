import React from "react";
import { test } from "../../../../playwright/helpers/base-test";

import Loader from ".";
import { checkAccessibility } from "../../../../playwright/support/helper";

test.describe("Accessibility tests for Loader component", () => {
  (["typical", "ai"] as const).forEach((variant) => {
    test(`should pass accessibility tests for Standalone Loader with variant ${variant}`, async ({
      mount,
      page,
    }) => {
      await mount(<Loader loaderType="standalone" variant={variant} />);

      await checkAccessibility(page);
    });
  });

  (["stacked", "inline"] as const).forEach((variant) => {
    test(`should pass accessibility tests for Ring Loader with variant ${variant}`, async ({
      mount,
      page,
    }) => {
      await mount(<Loader loaderType="ring" variant={variant} />);

      await checkAccessibility(page);
    });
  });

  test(`should pass accessibility tests for Star Loader`, async ({
    mount,
    page,
  }) => {
    await mount(<Loader loaderType="star" />);

    await checkAccessibility(page);
  });
});
