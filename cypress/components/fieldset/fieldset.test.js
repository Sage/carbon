import React from "react";
import Fieldset from "../../../src/components/fieldset";
import { FieldsetComponent } from "../../../src/components/fieldset/fieldset-test.stories";
import legendPreview from "../../locators/fieldset";
import Textbox from "../../../src/components/textbox";
import Form from "../../../src/components/form";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import { getDataElementByValue } from "../../locators/index";
import { positionOfElement } from "../../../cypress/support/helper";
import {
  VALIDATION,
  CHARACTERS,
} from "../../support/component-helper/constants";
import { useJQueryCssValueAndAssert } from "../../support/component-helper/common-steps";
import { ICON } from "../../locators/locators";

const specialCharacters = [
  CHARACTERS.STANDARD,
  CHARACTERS.DIACRITICS,
  CHARACTERS.SPECIALCHARACTERS,
];

context("Testing Fieldset component", () => {
  describe("should render Fieldset component", () => {
    it.each(specialCharacters)(
      "should verify Fieldset preview text is %s",
      (chars) => {
        CypressMountWithProviders(<FieldsetComponent legend={chars} />);

        legendPreview().should("have.text", chars);
      }
    );

    it("should verify Fieldset preview is not displayed", () => {
      CypressMountWithProviders(<FieldsetComponent legend="" />);

      legendPreview().should("not.exist");
    });

    it.each([
      ["inline", true, 33, 37, 73],
      ["as a column", false, 16, 70, 930],
    ])(
      "should verify Fieldset is displayed %s if inline prop is %s",
      (state, bool, labelHeight, labelWidth, inputWidth) => {
        CypressMountWithProviders(<FieldsetComponent inline={bool} />);

        getDataElementByValue("label").then(($el) => {
          useJQueryCssValueAndAssert($el, "height", labelHeight);
          useJQueryCssValueAndAssert($el, "width", labelWidth);
        });
        getDataElementByValue("input").then(($el) => {
          useJQueryCssValueAndAssert($el, "width", inputWidth);
        });
      }
    );

    it.each(["error", "warning", "info"])(
      "should verify Fieldset is displayed with %s validation icon on input",
      (type) => {
        CypressMountWithProviders(
          <Fieldset
            key={`${type}-string-component`}
            legend={`Fieldset ${type} on component`}
          >
            <Textbox
              label="Address"
              labelInline
              labelAlign="right"
              {...{ [type]: "Message" }}
            />
          </Fieldset>
        );

        getDataElementByValue("input")
          .eq(positionOfElement("first"))
          .parent()
          .find(ICON)
          .should("have.attr", "data-element", type);
      }
    );

    it.each(["error", "warning", "info"])(
      "should verify Fieldset is displayed with %s validation icon on label",
      (type) => {
        CypressMountWithProviders(
          <Fieldset
            key={`${type}-string-label`}
            legend={`Fieldset ${type} on label`}
          >
            <Textbox
              label="Address"
              labelInline
              labelAlign="right"
              validationOnLabel
              {...{ [type]: "Message" }}
            />
          </Fieldset>
        );

        getDataElementByValue("label")
          .eq(positionOfElement("first"))
          .parent()
          .find(ICON)
          .should("have.attr", "data-element", type);
      }
    );

    it.each([
      [VALIDATION.ERROR, "error", true],
      [VALIDATION.WARNING, "warning", true],
      [VALIDATION.INFO, "info", true],
      ["rgb(102, 132, 148)", "error", false],
      ["rgb(102, 132, 148)", "warning", false],
      ["rgb(102, 132, 148)", "info", false],
    ])(
      "should verify Fieldset input border colour is %s when validation is %s and boolean prop is %s",
      (borderColor, type, bool) => {
        CypressMountWithProviders(
          <Fieldset
            key={`${type}-boolean`}
            legend={`Fieldset ${type} as boolean`}
          >
            <Textbox
              label="Address"
              labelInline
              labelAlign="right"
              {...{ [type]: bool }}
            />
          </Fieldset>
        );

        getDataElementByValue("input")
          .parent()
          .should("have.css", "border-bottom-color", borderColor);
      }
    );

    it.each([
      [0, 0],
      [32, 4],
      [56, 7],
    ])(
      "should verify Fieldset displayed inside a Form and field spacing is %spx",
      (margin, spacing) => {
        CypressMountWithProviders(
          <Form fieldSpacing={spacing} data-element="form">
            <Fieldset>
              <Textbox label="Fieldset 1 Field 1" labelInline />
              <Textbox label="Fieldset 1 Field 2" labelInline />
            </Fieldset>
            <Textbox label="Separate Field" labelInline />
          </Form>
        );

        getDataElementByValue("form")
          .children()
          .children()
          .should("have.attr", "data-component", "fieldset")
          .and("have.css", "margin-bottom", `${margin}px`);
      }
    );
  });

  describe("Accessibility tests for Fieldset component", () => {
    it("should pass accessibility tests for Fieldset default story", () => {
      CypressMountWithProviders(<FieldsetComponent />);

      cy.checkAccessibility();
    });

    it.each(specialCharacters)(
      "should pass accessibility tests for Fieldset when preview text is %s",
      (chars) => {
        CypressMountWithProviders(<FieldsetComponent legend={chars} />);

        cy.checkAccessibility();
      }
    );

    it.each([
      ["inline", true],
      ["as a column", false],
    ])(
      "should pass accessibility tests for Fieldset when displayed %s",
      (state, bool) => {
        CypressMountWithProviders(<FieldsetComponent inline={bool} />);

        cy.checkAccessibility();
      }
    );

    it.each([
      [VALIDATION.ERROR, "error", true],
      [VALIDATION.WARNING, "warning", true],
      [VALIDATION.INFO, "info", true],
      ["rgb(102, 132, 148)", "error", false],
      ["rgb(102, 132, 148)", "warning", false],
      ["rgb(102, 132, 148)", "info", false],
    ])(
      "should pass accessibility tests for Fieldset with input border colour %s when validation is %s and boolean prop is %s",
      (borderColor, type, bool) => {
        CypressMountWithProviders(
          <Fieldset
            key={`${type}-boolean`}
            legend={`Fieldset ${type} as boolean`}
          >
            <Textbox
              label="Address"
              labelInline
              labelAlign="right"
              {...{ [type]: bool }}
            />
          </Fieldset>
        );

        cy.checkAccessibility();
      }
    );

    it.each([0, 4, 7])(
      "should pass accessibility tests for Fieldset displayed inside a Form when field spacing is %s",
      (spacing) => {
        CypressMountWithProviders(
          <Form fieldSpacing={spacing} data-element="form">
            <Fieldset>
              <Textbox label="Fieldset 1 Field 1" labelInline />
              <Textbox label="Fieldset 1 Field 2" labelInline />
            </Fieldset>
            <Textbox label="Separate Field" labelInline />
          </Form>
        );

        cy.checkAccessibility();
      }
    );

    // FE-5382
    describe.skip("skip", () => {
      it.each(["error", "warning", "info"])(
        "should pass accessibility tests for Fieldset with %s validation icon on input",
        (type) => {
          CypressMountWithProviders(
            <Fieldset
              key={`${type}-string-component`}
              legend={`Fieldset ${type} on component`}
            >
              <Textbox
                label="Address"
                labelInline
                labelAlign="right"
                {...{ [type]: "Message" }}
              />
            </Fieldset>
          );

          cy.checkAccessibility();
        }
      );

      it.each(["error", "warning", "info"])(
        "should pass accessibility tests for Fieldset with %s validation icon on label",
        (type) => {
          CypressMountWithProviders(
            <Fieldset
              key={`${type}-string-label`}
              legend={`Fieldset ${type} on label`}
            >
              <Textbox
                label="Address"
                labelInline
                labelAlign="right"
                validationOnLabel
                {...{ [type]: "Message" }}
              />
            </Fieldset>
          );

          cy.checkAccessibility();
        }
      );
    });
  });
});
