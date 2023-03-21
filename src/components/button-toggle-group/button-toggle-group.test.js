import React from "react";
import * as stories from "./button-toggle-group-test.stories";
import {
  buttonTogglePreview,
  buttonToggleLabelPreview,
  buttonToggleInput,
} from "../../../cypress/locators/button-toggle";
import {
  buttonToggleGroup,
  buttonToggleGroupHelp,
  buttonToggleGroupHelpIcon,
} from "../../../cypress/locators/button-toggle-group";
import { RADIOGROUP_ROLE } from "../../../cypress/locators/radiobutton/locators.js";
import { ICON } from "../../../cypress/locators/locators.js";
import { positionOfElement } from "../../../cypress/support/helper";
import { getDataElementByValue, icon } from "../../../cypress/locators";
import {
  VALIDATION,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

const testPropValue = CHARACTERS.STANDARD;

context("Testing Button-Toggle-Group component", () => {
  describe("should render Button-Toggle-Group component", () => {
    it("should render Button-Toggle-Group with data-component prop set to cypress_data", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent data-component={testPropValue} />
      );

      buttonToggleGroupHelp()
        .parent()
        .should("have.attr", "data-component", testPropValue);
    });

    it("should render Button-Toggle-Group with data-element prop set to cypress_data", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent data-element={testPropValue} />
      );

      buttonToggleGroup().should("have.attr", "data-element", testPropValue);
    });

    it("should render Button-Toggle-Group with data-role prop set to cypress_data", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent data-role={testPropValue} />
      );

      buttonToggleGroup().should("have.attr", "data-role", testPropValue);
    });

    it("should render Button-Toggle-Group with all button toggle input name props set to cypress_data", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent name={testPropValue} />
      );

      buttonToggleInput().eq(0).should("have.attr", "name", testPropValue);
      buttonToggleInput().eq(1).should("have.attr", "name", testPropValue);
      buttonToggleInput().eq(2).should("have.attr", "name", testPropValue);
    });

    it.each([
      ["error", "Error Message", "", "", VALIDATION.ERROR],
      ["warning", "", "Warning Message", "", VALIDATION.WARNING],
      ["info", "", "", "Info Message", VALIDATION.INFO],
    ])(
      "should render Button-Toggle-Group with %s icon",
      (prop, errorMessage, warningMessage, infoMessage, bottomColor) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent
            error={errorMessage}
            warning={warningMessage}
            info={infoMessage}
          />
        );

        buttonToggleGroup()
          .find(RADIOGROUP_ROLE)
          .find(ICON)
          .should("have.attr", "type", prop);
        icon().parent().should("have.attr", "data-component", "help");
        buttonTogglePreview()
          .children()
          .eq(1)
          .should("have.css", "border-bottom-color", bottomColor);
      }
    );

    it("should render Button-Toggle-Group with validation icon on label", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent
          info="Info Message"
          validationOnLabel
        />
      );

      getDataElementByValue("label")
        .parent()
        .find(ICON)
        .should("have.attr", "data-element", "info");
    });

    it.each([
      CHARACTERS.STANDARD,
      CHARACTERS.DIACRITICS,
      CHARACTERS.SPECIALCHARACTERS,
    ])("should render Button-Toggle-Group with %s as label", (labelText) => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent label={labelText} />
      );

      buttonToggleGroup().should("contain.text", labelText);
    });

    it("should render Button-Toggle-Group with tooltip set to cypress_data", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent labelHelp={testPropValue} />
      );

      buttonToggleGroup().find('[data-element="question"]').realHover();
      getDataElementByValue("tooltip")
        .should("be.visible")
        .and("has.text", testPropValue);
    });

    it.each([
      CHARACTERS.STANDARD,
      CHARACTERS.DIACRITICS,
      CHARACTERS.SPECIALCHARACTERS,
    ])(
      "should render Button-Toggle-Group with %s as field help text",
      (fieldHelpText) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent fieldHelp={fieldHelpText} />
        );

        buttonToggleGroupHelp().should("have.text", fieldHelpText);
      }
    );

    it.each([
      ["inline", true],
      ["outline", false],
    ])(
      "should render Button-Toggle-Group with field help %s if fieldHelpInline is %s",
      (alignment, state) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent
            fieldHelp="fieldHelpText"
            fieldHelpInline={state}
          />
        );

        if (state === true) {
          buttonToggleGroup()
            .children()
            .eq(0)
            .children()
            .eq(1)
            .should("have.attr", "data-element", "help");
        } else {
          buttonToggleGroup()
            .children()
            .eq(1)
            .should("have.attr", "data-element", "help");
        }
      }
    );

    it.each([
      ["inline", true],
      ["outline", false],
    ])(
      "should render Button-Toggle-Group with label %s if labelInline is %s",
      (alignment, state) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent labelInline={state} />
        );

        if (state === true) {
          buttonToggleGroup()
            .children()
            .children()
            .should("have.css", "box-sizing", "border-box")
            .and("have.css", "margin-bottom", "0px");
        } else {
          buttonToggleGroup()
            .children()
            .children()
            .should("not.have.css", "box-sizing", "border-box")
            .and("have.css", "margin-bottom", "8px");
        }
      }
    );

    it.each([
      ["left", "have.css", "justify-content", "flex-start"],
      ["right", "not.have.css", "box-sizing", "flex-end"],
    ])(
      "should render Button-Toggle-Group with label inline and %s aligned",
      (alignment, condition, css, flex) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent
            labelInline
            labelAlign={alignment}
          />
        );

        buttonToggleGroup().children().children().should(condition, css, flex);
      }
    );

    it("should render Button-Toggle-Group with second button toggle checked", () => {
      CypressMountWithProviders(<stories.ButtonToggleGroupDefaultChecked />);

      buttonToggleInput()
        .eq(positionOfElement("second"))
        .should("have.attr", "checked");
    });

    it.each([
      [25, 341],
      [50, 683],
      [100, 1366],
    ])(
      "should render Button-Toggle-Group with labelWidth prop of %s and width of %s",
      (labelWidth, width) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent inputWidth={labelWidth} />
        );

        buttonToggleInput()
          .parent()
          .parent()
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", width);
          });
      }
    );

    it("should render Button-Toggle-Group with helpAriaLabel set to cypress_data", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent helpAriaLabel={testPropValue} />
      );

      buttonToggleGroupHelpIcon().contains(testPropValue).should("exist");
    });

    it.each([
      ["8px", 1],
      ["16px", 2],
    ])(
      "should render Button-Toggle-Group with padding of %s if labelSpacing prop is %s",
      (padding, spacing) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent
            labelInline
            labelSpacing={spacing}
          />
        );

        buttonToggleGroup()
          .children()
          .children()
          .should("have.css", "padding-right", padding);
      }
    );
  });

  describe("should render Button-Toggle-Group component for event tests", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onChange callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent onChange={callback} />
      );

      buttonTogglePreview()
        .eq(positionOfElement("first"))
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent onBlur={callback} />
      );

      buttonToggleInput().eq(positionOfElement("first")).focus();

      buttonToggleInput()
        .eq(positionOfElement("first"))
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("should make css changes when fullWidth prop is passed", () => {
    it("container div should auto flex", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent fullWidth />
      );

      buttonTogglePreview().should("have.css", "flex", "1 1 auto");
    });

    it("width of label should be 100% / 450px", () => {
      CypressMountWithProviders(
        <stories.ButtonToggleGroupComponent fullWidth />
      );

      buttonToggleLabelPreview(1).then(($el) => {
        useJQueryCssValueAndAssert($el, "width", 450);
      });
    });
  });

  describe("Accessibility tests for Button-Toggle-Group component", () => {
    it("should pass accessibility tests for Button-Toggle-Group default story", () => {
      CypressMountWithProviders(<stories.ButtonToggleGroupComponent />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Button-Toggle-Group with second button toggle checked", () => {
      CypressMountWithProviders(<stories.ButtonToggleGroupDefaultChecked />);

      cy.checkAccessibility();
    });

    it.each([
      ["inline", true],
      ["outline", false],
    ])(
      "should pass accessibility tests for Button-Toggle-Group with label %s if labelInline is %s",
      (alignment, state) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent labelInline={state} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(["left", "right"])(
      "should pass accessibility tests for Button-Toggle-Group with label inline and %s aligned",
      (alignment) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent
            labelInline
            labelAlign={alignment}
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each([1, 2])(
      "should pass accessibility tests for Button-Toggle-Group with labelSpacing prop set to %s",
      (padding, spacing) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent
            labelInline
            labelSpacing={spacing}
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each([
      ["error", "Error Message", "", ""],
      ["warning", "", "Warning Message", ""],
      ["info", "", "", "Info Message"],
    ])(
      "should pass accessibility tests for Button-Toggle-Group with %s icon",
      (prop, errorMessage, warningMessage, infoMessage) => {
        CypressMountWithProviders(
          <stories.ButtonToggleGroupComponent
            error={errorMessage}
            warning={warningMessage}
            info={infoMessage}
          />
        );

        cy.checkAccessibility();
      }
    );
  });
});
