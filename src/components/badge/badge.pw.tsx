import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  BadgeComponent,
  BadgeOnDarkBackground,
  BadgeWithChildren,
} from "./components.test-pw";

test.describe("Badge accessibility tests", () => {
  test("should pass accessibility tests for 'typical' Badge", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent counter={9} variant="typical" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for 'subtle' Badge", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeComponent counter={9} variant="subtle" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for inverse 'typical' Badge", async ({
    mount,
    page,
  }) => {
    await mount(
      <BadgeOnDarkBackground counter={9} inverse variant="typical" />,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for inverse 'subtle' Badge", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeOnDarkBackground counter={9} inverse variant="subtle" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Badge with children", async ({
    mount,
    page,
  }) => {
    await mount(<BadgeWithChildren />);
    await checkAccessibility(page);
  });
});
