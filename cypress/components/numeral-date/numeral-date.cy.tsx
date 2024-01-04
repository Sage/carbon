import React from "react";
import NumeralDate, {
  NumeralDateProps,
} from "../../../src/components/numeral-date";
import Box from "../../../src/components/box";
import { NumeralDateComponent } from "../../../src/components/numeral-date/numeral-date-test.stories";
import * as stories from "../../../src/components/numeral-date/numeral-date.stories";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  assertCssValueIsApproximately,
  verifyRequiredAsteriskForLabel,
} from "../../support/component-helper/common-steps";

import {
  getComponent,
  cyRoot,
  getDataElementByValue,
  tooltipPreview,
  fieldHelpPreview,
  errorIcon,
  warningIcon,
} from "../../locators";
import {
  numeralDateComponent,
  numeralDateInputByPosition,
  numeralDateLabelByPosition,
} from "../../locators/numeralDate";

import {
  CHARACTERS,
  SIZE,
  VALIDATION,
} from "../../support/component-helper/constants";
import { ICON } from "../../locators/locators";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

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
    ] as [NumeralDateProps["labelAlign"], string][])(
      "should render NumeralDate with labelAlign prop set to %s",
      (labelAlign, cssValue) => {
        CypressMountWithProviders(
          <NumeralDateComponent labelInline labelAlign={labelAlign} />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "justify-content", `flex-${cssValue}`);
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
    ] as [NumeralDateProps["labelSpacing"], string][])(
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
      [10, 135],
      [30, 409],
      [80, 1092],
    ] as [NumeralDateProps["labelWidth"], number][])(
      "should use %s as labelWidth and render it with correct label ratio",
      (label, labelRatio) => {
        CypressMountWithProviders(
          <NumeralDateComponent labelInline labelWidth={label} />
        );

        getDataElementByValue("label")
          .parent()
          .then(($el) => {
            assertCssValueIsApproximately($el, "width", labelRatio);
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

    it('should render NumeralDate with `["dd", "mm", "yyyy"]` dateFormat prop', () => {
      CypressMountWithProviders(
        <NumeralDateComponent dateFormat={["dd", "mm", "yyyy"]} />
      );

      numeralDateLabelByPosition(0).should("have.text", "Day");
      numeralDateLabelByPosition(1).should("have.text", "Month");
      numeralDateLabelByPosition(2).should("have.text", "Year");
    });

    it('should render NumeralDate with `["mm", "dd", "yyyy"]` dateFormat prop', () => {
      CypressMountWithProviders(
        <NumeralDateComponent dateFormat={["mm", "dd", "yyyy"]} />
      );
      numeralDateLabelByPosition(0).should("have.text", "Month");
      numeralDateLabelByPosition(1).should("have.text", "Day");
      numeralDateLabelByPosition(2).should("have.text", "Year");
    });

    it('should render NumeralDate with `["dd", "mm"]` dateFormat prop', () => {
      CypressMountWithProviders(
        <NumeralDateComponent dateFormat={["dd", "mm"]} />
      );
      numeralDateLabelByPosition(0).should("have.text", "Day");
      numeralDateLabelByPosition(1).should("have.text", "Month");
      numeralDateInputByPosition(2).should("not.exist");
    });

    it('should render NumeralDate with `["mm", "dd"]` dateFormat prop', () => {
      CypressMountWithProviders(
        <NumeralDateComponent dateFormat={["mm", "dd"]} />
      );
      numeralDateLabelByPosition(0).should("have.text", "Month");
      numeralDateLabelByPosition(1).should("have.text", "Day");
      numeralDateInputByPosition(2).should("not.exist");
    });

    it('should render NumeralDate with `["mm", "yyyy"]` dateFormat prop', () => {
      CypressMountWithProviders(
        <NumeralDateComponent dateFormat={["mm", "yyyy"]} />
      );
      numeralDateLabelByPosition(0).should("have.text", "Month");
      numeralDateLabelByPosition(1).should("have.text", "Year");
      numeralDateInputByPosition(2).should("not.exist");
    });

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
          .should("have.css", "border-top-color", borderColor)
          .and("have.css", "border-bottom-color", borderColor)
          .and("have.css", "border-left-color", borderColor)
          .and("have.css", "border-right-color", borderColor);
      }
    );

    it.each([
      [SIZE.SMALL, 30],
      [SIZE.MEDIUM, 38],
      [SIZE.LARGE, 46],
    ] as [NumeralDateProps["size"], number][])(
      "should use %s as size and render NumeralDate with %s as height",
      (size, height) => {
        CypressMountWithProviders(<NumeralDateComponent size={size} />);

        numeralDateInputByPosition(0).then(($el) => {
          assertCssValueIsApproximately($el, "height", height);
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

    it.each([
      "top",
      "bottom",
      "left",
      "right",
    ] as NumeralDateProps["tooltipPosition"][])(
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

      getComponent("help").should(
        "have.attr",
        "aria-label",
        CHARACTERS.STANDARD
      );
    });
  });

  describe("check events for NumeralDate component", () => {
    const inputValue = "1";

    it("should call onChange callback when a type event is triggered", () => {
      const callback: NumeralDateProps["onChange"] = cy.stub().as("onChange");

      CypressMountWithProviders(<NumeralDateComponent onChange={callback} />);

      numeralDateInputByPosition(0).type(inputValue);

      cy.get("@onChange").should("have.been.calledOnce");
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      const callback: NumeralDateProps["onBlur"] = cy.stub().as("onBlur");

      CypressMountWithProviders(<NumeralDateComponent onBlur={callback} />);

      numeralDateInputByPosition(0).focus().blur().wait(50);
      cy.get("@onBlur").should("have.been.calledOnce");
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
