import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  checkAccessibility,
  verifyRequiredAsteriskForLabel,
} from "../../../playwright/support/helper";
import {
  getDataElementByValue,
  getDataRoleByValue,
  characterLimit,
  visuallyHiddenCharacterCount,
} from "../../../playwright/components";
import {
  TextboxComponent,
  TextboxComponentWithPositionedChildren,
  TextboxValidationsAsABoolean,
  TextboxValidationsAsAString,
  TextboxNewValidationsAsAStringOnGreyBackground,
  TextboxComponentWithCharacterLimit,
} from "./components.test-pw";
import { textbox, textboxInput } from "../../../playwright/components/textbox";

import { CHARACTERS } from "../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("Prop checks for Textbox component", () => {
  test("should render with data-element prop", async ({ mount, page }) => {
    await mount(<TextboxComponent data-element={CHARACTERS.STANDARD} />);

    await expect(
      getDataElementByValue(page, CHARACTERS.STANDARD),
    ).toBeVisible();
  });

  test("should render with data-role prop", async ({ mount, page }) => {
    await mount(<TextboxComponent data-role={CHARACTERS.STANDARD} />);

    await expect(getDataRoleByValue(page, CHARACTERS.STANDARD)).toBeVisible();
  });

  test("should render with id prop", async ({ mount, page }) => {
    await mount(<TextboxComponent id={CHARACTERS.STANDARD} />);

    await expect(textboxInput(page)).toHaveId(CHARACTERS.STANDARD);
  });

  testData.forEach((labelVals) => {
    test(`should render with label prop ${labelVals}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent label={labelVals} />);

      const label = getDataElementByValue(page, "label");

      await expect(label).toHaveText(labelVals);
    });
  });

  test(`should render with a visually hidden character count when the characterLimit prop is passed`, async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent characterLimit={4} />);

    await expect(visuallyHiddenCharacterCount(page)).toHaveCount(1);
  });

  test(`should not render with a visually hidden character count when the characterLimit prop is not passed`, async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent />);

    await expect(visuallyHiddenCharacterCount(page)).toHaveCount(0);
  });

  test("should render with required prop", async ({ mount, page }) => {
    await mount(<TextboxComponent required />);

    await verifyRequiredAsteriskForLabel(page);
  });

  test("should render character count when the number of characters typed is under the characterLimit", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent characterLimit={15} />);

    await textboxInput(page).fill("12345678901");

    await expect(characterLimit(page)).toHaveText("4 characters left");
    await expect(characterLimit(page)).toHaveCSS(
      "color",
      "rgba(0, 0, 0, 0.55)",
    );
  });

  test("should render character count when exactly 1 character is left under the characterLimit", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent characterLimit={12} />);

    await textboxInput(page).fill("12345678901");

    await expect(characterLimit(page)).toHaveText("1 character left");
    await expect(characterLimit(page)).toHaveCSS(
      "color",
      "rgba(0, 0, 0, 0.55)",
    );
  });

  test("should render warning when the number of characters typed exceeds the characterLimit", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent characterLimit={5} />);

    await textboxInput(page).fill("12345678901");

    await expect(characterLimit(page)).toHaveText("6 characters too many");
    await expect(characterLimit(page)).toHaveCSS("color", "rgb(203, 55, 74)");
  });

  test("should render warning when the number of characters typed exceeds the characterLimit by exactly 1", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent characterLimit={10} />);

    await textboxInput(page).fill("12345678901");

    await expect(characterLimit(page)).toHaveText("1 character too many");
    await expect(characterLimit(page)).toHaveCSS("color", "rgb(203, 55, 74)");
  });

  test("should render with autoFocus prop", async ({ mount, page }) => {
    await mount(<TextboxComponent autoFocus />);

    await expect(textboxInput(page)).toBeFocused();
  });

  test("should render with positionedChildren prop", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponentWithPositionedChildren />);

    const textboxParent = textbox(page).locator("..");
    await expect(textboxParent.locator("button")).toBeVisible();
  });
});

test.describe("Accessibility tests for Textbox component", () => {
  test("should pass accessibility tests for default component with a set value and label", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when autoFocus prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent autoFocus />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when characterLimit prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent characterLimit={5} />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when disabled prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent disabled />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when prefix prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent prefix="foo" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when readOnly prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent readOnly />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when required prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent required />);

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

  test("should pass accessibility tests when string validations are passed and used against a grey background", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxNewValidationsAsAStringOnGreyBackground />);

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
