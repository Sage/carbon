import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import Fieldset from ".";
import Form, { FormProps } from "../form";
import FieldsetComponent from "./components.test-pw";
import Textbox from "../textbox";
import { getDataElementByValue } from "../../../playwright/components/index";
import { checkAccessibility } from "../../../playwright/support/helper";
import { VALIDATION, CHARACTERS } from "../../../playwright/support/constants";
import { ICON } from "../../../playwright/components/locators";

const specialCharacters = [
  CHARACTERS.STANDARD,
  CHARACTERS.DIACRITICS,
  CHARACTERS.SPECIALCHARACTERS,
];

test.describe("should render Fieldset component", () => {
  specialCharacters.forEach((chars) => {
    test(`should verify preview text is ${chars}`, async ({ mount, page }) => {
      await mount(<FieldsetComponent legend={chars} />);

      await expect(getDataElementByValue(page, "legend")).toHaveText(chars);
    });
  });

  test(`should verify preview is not displayed`, async ({ mount, page }) => {
    await mount(<FieldsetComponent legend="" />);

    await expect(getDataElementByValue(page, "legend")).not.toBeVisible();
  });

  ["error", "warning", "info"].forEach((type) => {
    test(`should verify ${type} validation icon is displayed on input`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Fieldset legend={`Fieldset ${type} on component`}>
          <Textbox
            label="Address"
            labelInline
            labelAlign="right"
            {...{ [type]: "Message" }}
            value=""
            onChange={() => {}}
          />
        </Fieldset>,
      );

      const validationIcon = getDataElementByValue(page, "input")
        .first()
        .locator("..")
        .locator(ICON);
      await expect(validationIcon).toHaveAttribute("data-element", type);
    });
  });

  ["error", "warning", "info"].forEach((type) => {
    test(`should verify ${type} validation icon is displayed on label`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Fieldset legend={`Fieldset ${type} on label`}>
          <Textbox
            label="Address"
            labelInline
            labelAlign="right"
            validationOnLabel
            {...{ [type]: "Message" }}
            value=""
            onChange={() => {}}
          />
        </Fieldset>,
      );

      const validationIcon = getDataElementByValue(page, "label")
        .first()
        .locator("..")
        .locator(ICON);
      await expect(validationIcon).toHaveAttribute("data-element", type);
    });
  });

  (
    [
      [VALIDATION.ERROR, "error", true],
      [VALIDATION.WARNING, "warning", true],
      [VALIDATION.INFO, "info", true],
      ["rgb(102, 132, 148)", "error", false],
      ["rgb(102, 132, 148)", "warning", false],
      ["rgb(102, 132, 148)", "info", false],
    ] as [string, string, boolean][]
  ).forEach(([borderColor, type, bool]) => {
    test(`should verify input border color is ${borderColor} when validation is ${type} and boolean prop is ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Fieldset legend={`Fieldset ${type} as boolean`}>
          <Textbox
            label="Address"
            labelInline
            labelAlign="right"
            {...{ [type]: bool }}
            value=""
            onChange={() => {}}
          />
        </Fieldset>,
      );

      const input = getDataElementByValue(page, "input").first().locator("..");
      await expect(input).toHaveCSS("border-bottom-color", borderColor);
    });
  });

  (
    [
      [0, 0],
      [32, 4],
      [56, 7],
    ] as [number, FormProps["fieldSpacing"]][]
  ).forEach(([margin, spacing]) => {
    test(`should verify component is displayed inside a Form and field spacing is ${margin}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Form fieldSpacing={spacing} data-element="form">
          <Fieldset>
            <Textbox
              label="Fieldset 1 Field 1"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Fieldset 1 Field 2"
              labelInline
              value=""
              onChange={() => {}}
            />
          </Fieldset>
          <Textbox
            label="Separate Field"
            labelInline
            value=""
            onChange={() => {}}
          />
        </Form>,
      );

      const form = getDataElementByValue(page, "form").locator("fieldset");
      await expect(form).toHaveAttribute("data-component", "fieldset");
      await expect(form).toHaveCSS("margin-bottom", `${margin}px`);
    });
  });
});

test.describe("Accessibility tests for Fieldset component", () => {
  test(`should pass accessibility tests for default story`, async ({
    mount,
    page,
  }) => {
    await mount(<FieldsetComponent />);

    await checkAccessibility(page);
  });

  specialCharacters.forEach((chars) => {
    test(`should pass accessibility tests when preview text is ${chars}`, async ({
      mount,
      page,
    }) => {
      await mount(<FieldsetComponent legend={chars} />);

      await checkAccessibility(page);
    });
  });

  [
    [VALIDATION.ERROR, "error", true],
    [VALIDATION.WARNING, "warning", true],
    [VALIDATION.INFO, "info", true],
    ["rgb(102, 132, 148)", "error", false],
    ["rgb(102, 132, 148)", "warning", false],
    ["rgb(102, 132, 148)", "info", false],
  ].forEach((borderColor, type, bool) => {
    test(`should pass accessibility tests with input border color ${borderColor} when validation is ${type} and boolean prop is ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Fieldset legend={`Fieldset ${type} as boolean`}>
          <Textbox
            label="Address"
            labelInline
            labelAlign="right"
            {...{ [type]: bool }}
            value=""
            onChange={() => {}}
          />
        </Fieldset>,
      );

      await checkAccessibility(page);
    });
  });

  ([0, 4, 7] as FormProps["fieldSpacing"][]).forEach((spacing) => {
    test(`should pass accessibility tests inside a Form when field spacing is ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Form fieldSpacing={spacing} data-element="form">
          <Fieldset>
            <Textbox
              label="Fieldset 1 Field 1"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Fieldset 1 Field 2"
              labelInline
              value=""
              onChange={() => {}}
            />
          </Fieldset>
          <Textbox
            label="Separate Field"
            labelInline
            value=""
            onChange={() => {}}
          />
        </Form>,
      );
      await checkAccessibility(page);
    });
  });

  ["error", "warning", "info"].forEach((type) => {
    test(`should pass accessibility tests with ${type} validation icon on input`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Fieldset legend={`Fieldset ${type} on component`}>
          <Textbox
            label="Address"
            labelInline
            labelAlign="right"
            {...{ [type]: "Message" }}
            value=""
            onChange={() => {}}
          />
        </Fieldset>,
      );

      await checkAccessibility(page);
    });
  });

  ["error", "warning", "info"].forEach((type) => {
    test(`should pass accessibility tests with ${type} validation icon on label`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Fieldset legend={`Fieldset ${type} on label`}>
          <Textbox
            label="Address"
            labelInline
            labelAlign="right"
            validationOnLabel
            {...{ [type]: "Message" }}
            value=""
            onChange={() => {}}
          />
        </Fieldset>,
      );

      await checkAccessibility(page);
    });
  });
});
