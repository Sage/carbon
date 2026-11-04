import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  ButtonToggleGroupComponent,
  ButtonToggleIconOnly,
  ControlledButtonToggleGroup,
} from "./components.test-pw";
import { ButtonToggle } from ".";
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

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when buttons are icon-only", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleIconOnly />);

    await checkAccessibility(page);
  });
});

test.describe("mouse focus", () => {
  test("shows focus styling when a standalone toggle is clicked", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggle pressed>Standalone</ButtonToggle>);

    const toggle = page.getByRole("button", { name: "Standalone" });

    await toggle.click();

    await expect(toggle).toBeFocused();
    await expect(toggle).not.toHaveCSS("box-shadow", "none");
  });

  test("defers focus styling until the indicator finishes sliding", async ({
    mount,
    page,
  }) => {
    await mount(<ControlledButtonToggleGroup />);

    const destination = page.getByRole("button", { name: "Bar" });

    await destination.click();

    await expect(destination).toBeFocused();
    await expect(destination).toHaveCSS("outline-style", "none");
    await expect(destination).toHaveCSS("box-shadow", "none");

    await page
      .getByTestId("button-toggle-active-indicator")
      .dispatchEvent("transitionend");

    await expect(destination).not.toHaveCSS("box-shadow", "none");
  });
});
