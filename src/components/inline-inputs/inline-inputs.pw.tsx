import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import Textbox from "../textbox";
import InlineInputs, { InlineInputsProps } from "./inline-inputs.component";
import { Default, Required } from "./components.test-pw";
import { Default as InlineInputComponent } from "./inline-inputs-test.stories";
import {
  inlineInputContainer,
  inlineLabel,
  inlinelabelWidth,
  inlineChildren,
} from "../../../playwright/components/inline-inputs";
import { CHARACTERS } from "../../../playwright/support/constants";
import { checkAccessibility } from "../../../playwright/support/helper";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const gutters = [
  "none",
  "extra-small",
  "small",
  "medium-small",
  "medium",
  "medium-large",
  "large",
  "extra-large",
] as InlineInputsProps["gutter"][];

const marginSpacings = [
  "0px",
  "-8px",
  "-16px",
  "-20px",
  "-24px",
  "-28px",
  "-32px",
  "-40px",
];

const gutterSizes = gutters.map((gutter, index) => [
  gutter,
  marginSpacings[index],
]) as [InlineInputsProps["gutter"], string][];

test.describe("InlineInputs", () => {
  gutterSizes.forEach(([size, margin]) => {
    test(`should have expected spacing when gutter is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<InlineInputComponent gutter={size} />);

      await expect(inlineInputContainer(page)).toHaveCSS("margin-left", margin);

      await expect(inlineInputContainer(page)).toBeVisible();
    });
  });

  testData.forEach((label) => {
    test(`should check label as ${label}`, async ({ mount, page }) => {
      await mount(<InlineInputComponent label={label} />);

      await expect(inlineLabel(page)).toHaveText(label);
    });
  });

  [30, 60, 50, 90].forEach((inputWidth) => {
    test(`should check inputWidth as ${inputWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(<InlineInputComponent inputWidth={inputWidth} />);

      await expect(inlineInputContainer(page)).toHaveCSS(
        "flex",
        `0 0 ${inputWidth}%`,
      );
    });
  });

  testData.forEach((children) => {
    test(`should check children as ${children}`, async ({ mount, page }) => {
      await mount(
        <InlineInputs label="Inline Input">
          <Textbox value={""} onChange={() => {}}>
            {children}
          </Textbox>
        </InlineInputs>,
      );

      await expect(inlineChildren(page)).toHaveText(children);

      await expect(inlineChildren(page)).toBeVisible();
    });
  });

  [45, 25, 35, 15].forEach((labelwidth) => {
    test(`should check labelWidth as ${labelwidth}`, async ({
      mount,
      page,
    }) => {
      await mount(<InlineInputComponent labelWidth={labelwidth} />);
      await expect(inlinelabelWidth(page)).toHaveCSS(
        "flex",
        `0 0 ${labelwidth}%`,
      );
    });
  });

  testData.forEach((htmlFor) => {
    test(`should check htmlFor as ${htmlFor}`, async ({ mount, page }) => {
      await mount(<InlineInputComponent htmlFor={htmlFor} />);
      await expect(inlineLabel(page)).toHaveAttribute("for", htmlFor);
    });
  });
});

test.describe("Accessibility tests for InlineInputs component", () => {
  test("should pass accessibility tests for InlineInputs Default example", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for InlineInputs Required example", async ({
    mount,
    page,
  }) => {
    await mount(<Required />);

    await checkAccessibility(page);
  });
});
