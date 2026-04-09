import React from "react";
import { test } from "../../../playwright/helpers/base-test";

import Loader from ".";
import LoaderInsideButton from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("Accessibility tests for Loader component", () => {
  test("should pass accessibility tests for Loader default story", async ({
    mount,
    page,
  }) => {
    await mount(<Loader />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for loading state", async ({
    mount,
    page,
  }) => {
    await mount(<LoaderInsideButton />);

    await checkAccessibility(page);
  });
});
