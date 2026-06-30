import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  PasswordComponent,
  PasswordNewDesignsValidation,
} from "../../../src/components/password/components.test-pw";
import { buttonDataComponent } from "../../../playwright/components/button";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("aria-live region checks", () => {
  test("when user clicks to show password, aria-live region should contain the correct shown text", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent label="password" onChange={() => {}} />);
    await buttonDataComponent(page).click();

    const hiddenStatus = page.getByRole("status");
    await expect(hiddenStatus).toHaveText(
      "Your password has been shown. Focus on the password input to have it read to you, if it is safe to do so.",
    );
  });
});

test.describe("Accessibility tests for Password component", () => {
  test("should pass accessibility tests for default component with a set value and label", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent label="password" onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when AutoFocus prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(
      <PasswordComponent label="password" autoFocus onChange={() => {}} />,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when characterLimit prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(
      <PasswordComponent
        label="password"
        characterLimit={5}
        onChange={() => {}}
      />,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when disabled prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(
      <PasswordComponent label="password" disabled onChange={() => {}} />,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when forceObscurity prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(
      <PasswordComponent label="password" forceObscurity onChange={() => {}} />,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when inputHint prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(
      <PasswordComponent
        label="password"
        inputHint="foo"
        onChange={() => {}}
      />,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when opted into new validation designs", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordNewDesignsValidation />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when prefix prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(
      <PasswordComponent label="password" prefix="foo" onChange={() => {}} />,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when readOnly prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(
      <PasswordComponent label="password" readOnly onChange={() => {}} />,
    );
    await checkAccessibility(page);
  });
});
