import React from "react";
import NumeralDate from ".";
import Box from "../box";
import { NumeralDateComponent } from "./numeral-date-test.stories";
import * as stories from "./numeral-date.stories";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  useJQueryCssValueAndAssert,
  verifyRequiredAsteriskForLabel,
} from "../../../cypress/support/component-helper/common-steps";

import {
  getComponent,
  cyRoot,
  getDataElementByValue,
  tooltipPreview,
  fieldHelpPreview,
  errorIcon,
  warningIcon,
} from "../../../cypress/locators";
import {
  numeralDateComponent,
  numeralDateInputByPosition,
} from "../../../cypress/locators/numeralDate";

import {
  CHARACTERS,
  SIZE,
  VALIDATION,
} from "../../../cypress/support/component-helper/constants";
import { ICON } from "../../../cypress/locators/locators";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const ALLOWED_DATE_FORMATS = [
  ["dd", "mm", "yyyy"],
  ["mm", "dd", "yyyy"],
  ["dd", "mm"],
  ["mm", "dd"],
  ["mm", "yyyy"],
];

context("Tests for NumeralDate component", () => {
  describe("check props for NumeralDate component", () => {
    it("should render NumeralDate with data-component prop", () => {
      CypressMountWithProviders(
        <NumeralDateComponent data-component={CHARACTERS.STANDARD} />
      );

      getComponent(CHARACTERS.STANDARD).should("be.visible");
    });

    it("should render NumeralDate with data-element prop", () => {
      CypressMountWithProviders(
        <NumeralDateComponent data-element={CHARACTERS.STANDARD} />
      );
      cyRoot()
        .children()
        .children()
        .should("have.attr", "data-element", CHARACTERS.STANDARD);
    });

    it("should render NumeralDate with data-role prop", () => {
      CypressMountWithProviders(
        <NumeralDateComponent data-role={CHARACTERS.STANDARD} />
      );

      cyRoot()
        .children()
        .children()
        .should("have.attr", "data-role", CHARACTERS.STANDARD);
    });

    it("should render NumeralDate with id prop", () => {
      CypressMountWithProviders(
        <NumeralDateComponent id={CHARACTERS.STANDARD} />
      );

      numeralDateInputByPosition(0).should(
        "have.attr",
        "id",
        CHARACTERS.STANDARD
      );
    });

    it.each(testData)(
      "should render NumeralDate with label prop set to %s",
      (label) => {
        CypressMountWithProviders(<NumeralDateComponent label={label} />);

        getDataElementByValue("label").should("have.text", label);
      }
    );

    it("should render NumeralDate with labelInline prop", () => {
      CypressMountWithProviders(<NumeralDateComponent labelInline />);

      getDataElementByValue("label")
        .parent()
        .should("have.css", "justify-content", "flex-end");
    });

    it.each([
      ["left", "start"],
      ["right", "end"],
    ])(
      "should render NumeralDate with labelAlign prop set to %s",
      (labelAlign, cssValue) => {
        CypressMountWithProviders(
          <NumeralDateComponent labelInline labelAlign={labelAlign} />
        );

        getDataElementByValue("label")
          .parent()
          .should(($element) =>
            expect($element).to.have.css("justify-content", `flex-${cssValue}`)
          );
      }
    );

    it.each(testData)(
      "should render NumeralDate with labelHelp prop set to %s",
      (labelHelp) => {
        CypressMountWithProviders(
          <NumeralDateComponent labelInline labelHelp={labelHelp} />
        );

        getDataElementByValue("question").trigger("mouseover");
        tooltipPreview().should("have.text", labelHelp);
      }
    );

    it.each([
      [1, "8px"],
      [2, "16px"],
    ])(
      "should render NumeralDate with labelSpacing prop set to %s",
      (spacing, padding) => {
        CypressMountWithProviders(
          <NumeralDateComponent labelInline labelSpacing={spacing} />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "padding-right", padding);
      }
    );

    it.each([
      ["10", 135],
      ["30", 409],
      ["80", 1092],
    ])(
      "should use %s as labelWidth and render it with correct label ratio",
      (label, labelRatio) => {
        CypressMountWithProviders(
          <NumeralDateComponent labelInline labelWidth={label} />
        );

        getDataElementByValue("label")
          .parent()
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", labelRatio);
          });
      }
    );

    it("should render NumeralDate with required prop", () => {
      CypressMountWithProviders(<NumeralDateComponent required />);

      verifyRequiredAsteriskForLabel();
    });

    it("should render NumeralDate with name prop", () => {
      CypressMountWithProviders(
        <NumeralDateComponent name={CHARACTERS.STANDARD} />
      );

      numeralDateComponent().should("have.attr", "name", CHARACTERS.STANDARD);
    });

    it("should render NumeralDate with disabled prop", () => {
      CypressMountWithProviders(<NumeralDateComponent disabled />);

      numeralDateInputByPosition(0)
        .should("be.disabled")
        .and("have.attr", "disabled");
    });

    it("should render NumeralDate with readOnly prop", () => {
      CypressMountWithProviders(<NumeralDateComponent readOnly />);

      numeralDateInputByPosition(0).should("have.attr", "readOnly");
    });

    it.each(["error", "warning", "info"])(
      "should verify NumeralDate is displayed with %s validation icon on input",
      (type) => {
        CypressMountWithProviders(
          <NumeralDateComponent
            labelInline
            labelAlign="right"
            {...{ [type]: "Message" }}
          />
        );

        numeralDateInputByPosition(2)
          .parent()
          .find(ICON)
          .and("have.attr", "data-element", type);
      }
    );

    it.each(["error", "warning", "info"])(
      "should verify NumeralDate is displayed with %s validation icon on label",
      (type) => {
        CypressMountWithProviders(
          <NumeralDateComponent
            labelInline
            labelAlign="right"
            validationOnLabel
            {...{ [type]: "Message" }}
          />
        );

        getDataElementByValue("label")
          .parent()
          .find(ICON)
          .and("have.attr", "data-element", type);
      }
    );

    it("should input into NumeralDate and verify the value", () => {
      CypressMountWithProviders(<NumeralDateComponent />);

      numeralDateInputByPosition(0)
        .type("15")
        .should("have.attr", "value", "15");
    });

    it("should render NumeralDate with defaultValue prop", () => {
      CypressMountWithProviders(
        <NumeralDate defaultValue={{ dd: "12", mm: "12", yyyy: "2022" }} />
      );

      numeralDateInputByPosition(0).should("have.attr", "value", "12");
      numeralDateInputByPosition(1).should("have.attr", "value", "12");
      numeralDateInputByPosition(2).should("have.attr", "value", "2022");
    });

    it.each([
      [0, "Day should be a number within a 1-31 range."],
      [1, "Month should be a number within a 1-12 range."],
      [2, "Year should be a number within a 1800-2200 range."],
    ])(
      "should render NumeralDate with enableInternalError prop",
      (inputIndex, tooltipText) => {
        CypressMountWithProviders(<NumeralDateComponent enableInternalError />);

        const errorInput = "55";

        numeralDateInputByPosition(inputIndex).type(errorInput).blur();
        numeralDateInputByPosition(2)
          .parent()
          .find(ICON)
          .and("have.attr", "data-element", "error");
        errorIcon().realHover();
        tooltipPreview().should("contain.text", tooltipText);
      }
    );

    it.each([
      [0, "Day should be a number within a 1-31 range."],
      [1, "Month should be a number within a 1-12 range."],
      [2, "Year should be a number within a 1800-2200 range."],
    ])(
      "should render NumeralDate with enableInternalWarning prop",
      (inputIndex, tooltipText) => {
        CypressMountWithProviders(
          <NumeralDateComponent enableInternalWarning />
        );

        const errorInput = "55";

        numeralDateInputByPosition(inputIndex).type(errorInput).blur();
        numeralDateInputByPosition(2)
          .parent()
          .find(ICON)
          .and("have.attr", "data-element", "warning");
        warningIcon().realHover();
        tooltipPreview().should("contain.text", tooltipText);
      }
    );

    it.each(ALLOWED_DATE_FORMATS)(
      "should render NumeralDate with dateFormat prop",
      (firstInput, secondInput, thirdInput) => {
        const outputFormat = thirdInput
          ? [firstInput, secondInput, thirdInput]
          : [firstInput, secondInput];

        CypressMountWithProviders(
          <NumeralDateComponent dateFormat={outputFormat} />
        );

        numeralDateInputByPosition(0).should(
          "have.attr",
          "placeholder",
          firstInput
        );
        numeralDateInputByPosition(1).should(
          "have.attr",
          "placeholder",
          secondInput
        );
        if (thirdInput) {
          numeralDateInputByPosition(2).should(
            "have.attr",
            "placeholder",
            thirdInput
          );
        }
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
      "should verify NumeralDate input border colour is %s when validation is %s and boolean prop is %s",
      (borderColor, type, bool) => {
        CypressMountWithProviders(
          <NumeralDateComponent
            labelInline
            labelAlign="right"
            {...{ [type]: bool }}
          />
        );

        numeralDateInputByPosition(2)
          .parent()
          .should(($el) => {
            expect($el).to.have.css("border-top-color").to.equals(borderColor);
            expect($el)
              .to.have.css("border-bottom-color")
              .to.equals(borderColor);
            expect($el).to.have.css("border-left-color").to.equals(borderColor);
            expect($el)
              .to.have.css("border-right-color")
              .to.equals(borderColor);
          });
      }
    );

    it.each([
      [SIZE.SMALL, 30],
      [SIZE.MEDIUM, 38],
      [SIZE.LARGE, 46],
    ])(
      "should use %s as size and render NumeralDate with %s as height",
      (size, height) => {
        CypressMountWithProviders(<NumeralDateComponent size={size} />);

        numeralDateInputByPosition(0).then(($el) => {
          useJQueryCssValueAndAssert($el, "height", height);
        });
      }
    );

    it.each([
      ["flex", 399],
      ["flex", 400],
      ["block", 401],
    ])(
      "should check NumeralDate label alignment is %s with adaptiveLabelBreakpoint %s and viewport 400",
      (displayValue, breakpoint) => {
        cy.viewport(400, 300);

        CypressMountWithProviders(
          <NumeralDateComponent adaptiveLabelBreakpoint={breakpoint} />
        );

        getDataElementByValue("label")
          .parent()
          .parent()
          .should("have.css", "display", displayValue);
      }
    );

    it.each(testData)(
      "should render NumeralDate with fieldHelp prop set to %s",
      (fieldHelp) => {
        CypressMountWithProviders(
          <NumeralDateComponent fieldHelp={fieldHelp} />
        );

        fieldHelpPreview().should("have.text", fieldHelp);
      }
    );

    it.each(["top", "bottom", "left", "right"])(
      "should render NumeralDate component with tooltip positioned to the %s",
      (position) => {
        CypressMountWithProviders(
          <Box m="250px">
            <NumeralDateComponent
              error={CHARACTERS.STANDARD}
              tooltipPosition={position}
            />
          </Box>
        );

        getDataElementByValue("error").trigger("mouseover");
        tooltipPreview()
          .should("have.text", CHARACTERS.STANDARD)
          .should("have.attr", "data-placement", position);
      }
    );

    it("should render NumeralDate with helpAriaLabel prop", () => {
      CypressMountWithProviders(
        <NumeralDateComponent
          labelHelp="field help"
          helpAriaLabel={CHARACTERS.STANDARD}
        />
      );

      getComponent("help").contains(CHARACTERS.STANDARD).should("exist");
    });
  });

  describe("check events for NumeralDate component", () => {
    const inputValue = "1";
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onChange callback when a type event is triggered", () => {
      CypressMountWithProviders(<NumeralDateComponent onChange={callback} />);

      numeralDateInputByPosition(0)
        .type(inputValue)
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<NumeralDateComponent onBlur={callback} />);

      numeralDateInputByPosition(0)
        .focus()
        .blur()
        .wait(50)
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("check accessibility for NumeralDate component", () => {
    it("should pass accessibility tests for NumeralDate Default story", () => {
      CypressMountWithProviders(<stories.Default />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NumeralDate Controlled story", () => {
      CypressMountWithProviders(<stories.Controlled />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NumeralDate AllowedDateFormats story", () => {
      CypressMountWithProviders(<stories.AllowedDateFormats />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NumeralDate InternalValidationError story", () => {
      CypressMountWithProviders(<stories.InternalValidationError />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NumeralDate InternalValidationWarning story", () => {
      CypressMountWithProviders(<stories.InternalValidationWarning />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NumeralDate InlineLabel story", () => {
      CypressMountWithProviders(<stories.InlineLabel />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NumeralDate EnablingAdaptiveBehaviour story", () => {
      CypressMountWithProviders(<stories.EnablingAdaptiveBehaviour />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NumeralDate WithLabelHelp story", () => {
      CypressMountWithProviders(<stories.WithLabelHelp />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NumeralDate WithFieldHelp story", () => {
      CypressMountWithProviders(<stories.WithFieldHelp />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for NumeralDate Size story", () => {
      CypressMountWithProviders(<stories.Size />);

      cy.checkAccessibility();
    });
  });
});
