import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import { visuallyHiddenCharacterCount } from "../../../playwright/components";
import {
  TextboxComponent,
  TextboxValidationsAsABoolean,
  TextboxValidationsAsAString,
  TextboxComponentWithCharacterLimit,
} from "./components.test-pw";
import { textboxInput } from "../../../playwright/components/textbox";

test.describe("Accessibility tests for Textbox component", () => {
  test("should pass accessibility tests for default component with a set value and label", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when characterLimit prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent characterLimit={5} />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when boolean validations are passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxValidationsAsABoolean />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when string validations are passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxValidationsAsAString />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when fieldHelp prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent fieldHelp="Help" />);

    await checkAccessibility(page);
  });
});

test("should set aria-live attribute on Character Count to `polite` when component is focused and then change back to `off` when component is blurred", async ({
  mount,
  page,
}) => {
  await mount(<TextboxComponentWithCharacterLimit />);

  const CharacterCountElement = visuallyHiddenCharacterCount(page);
  const textboxElement = textboxInput(page);
  const buttonElement = page.getByRole("button");

  await expect(CharacterCountElement).toHaveAttribute("aria-live", "off");

  await textboxElement.focus();
  await textboxElement.fill("Foo");

  await expect(CharacterCountElement).toHaveAttribute("aria-live", "polite");

  await buttonElement.click();

  await expect(CharacterCountElement).toHaveAttribute("aria-live", "off");
});
