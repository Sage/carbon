import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import LinkPreviewComponentTest from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("Accessibility tests for LinkPreview component", () => {
  test("should pass accessibility tests for default example", async ({
    mount,
    page,
  }) => {
    await mount(<LinkPreviewComponentTest />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for loading state", async ({
    mount,
    page,
  }) => {
    await mount(<LinkPreviewComponentTest isLoading />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for close icon", async ({
    mount,
    page,
  }) => {
    await mount(<LinkPreviewComponentTest onClose={() => {}} />);

    await checkAccessibility(page);
  });
});
