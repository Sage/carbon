import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import {
  ButtonToggleGroupComponent,
  ButtonToggleIconOnly,
} from "./components.test-pw";
import { buttonTogglePreview } from "../../../playwright/components/button-toggle";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("Accessibility tests", () => {
  test("should pass accessibility tests when aria-label is set on the group", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent aria-label="aria-label" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when label and inputHint are set", async ({
    mount,
    page,
  }) => {
    await mount(
      <ButtonToggleGroupComponent label="label" inputHint="inputHint" />,
    );

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when a button is active", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent />);

    await buttonTogglePreview(page).nth(1).click();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when group is disabled", async ({
    mount,
    page,
  }) => {
    await mount(
      <ButtonToggleGroupComponent label="label" inputHint="inputHint" />,
    );

    // disable colour contrast until FE-7622 is merged
    await checkAccessibility(page, undefined, "color-contrast");
  });

  test("should pass accessibility tests when buttons are icon-only", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleIconOnly />);

    await checkAccessibility(page);
  });
});
