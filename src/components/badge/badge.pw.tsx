import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  BadgeComponent,
  BadgeOnDarkBackground,
  BadgeWithChildren,
} from "./components.test-pw";

test.describe("should render Badge component", () => {
  test("should render with provided id when used as button", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent counter={9} id="badge-button-id" />);

    const badgeButton = page.locator("#badge-button-id");
    await expect(badgeButton).toBeVisible();
    await expect(badgeButton).toHaveAttribute("id", "badge-button-id");
  });
});
test.describe("Badge accessibility tests", () => {
  test("should pass accessibility tests for 'typical'", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent counter={9} variant="typical" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for 'subtle'", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent counter={9} variant="subtle" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for inverse 'typical'", async ({
    mount,
    page,
  }) => {
    await mount(
      <BadgeOnDarkBackground counter={9} inverse variant="typical" />,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for inverse 'subtle'", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeOnDarkBackground counter={9} inverse variant="subtle" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for children", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeWithChildren />);
    await checkAccessibility(page);
  });
});
