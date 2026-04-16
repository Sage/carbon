import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import {
  PasswordComponent,
  PasswordValidationsAsAStringWithTooltipDefault,
  PasswordValidationsAsABoolean,
  PasswordValidationsAsAString,
  PasswordValidationsAsAStringWithTooltipCustom,
  PasswordValidationsAsAStringDisplayedOnLabel,
  PasswordNewDesignsValidation,
} from "../../../src/components/password/components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("Accessibility tests for Password component", () => {
  test("should pass accessibility tests for default component with a set value and label", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when AutoFocus prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent autoFocus onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when characterLimit prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent characterLimit={5} onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when disabled prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent disabled onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when forceObscurity prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent forceObscurity onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when inputHint prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent inputHint="foo" onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility when margin prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent m={4} onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when opted into new validation designs", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordNewDesignsValidation />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when boolean validations are passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordValidationsAsABoolean />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when string validations are passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordValidationsAsAString />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when string validations are passed and displayed on label", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordValidationsAsAStringDisplayedOnLabel />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when custom string validations are passed and displayed on tooltip", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordValidationsAsAStringWithTooltipCustom />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when string validations are displayed on tooltip", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordValidationsAsAStringWithTooltipDefault />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when prefix prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent prefix="foo" onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when readOnly prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent readOnly onChange={() => {}} />);
    await checkAccessibility(page);
  });
});
