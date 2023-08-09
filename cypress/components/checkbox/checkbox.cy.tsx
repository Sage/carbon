/* eslint-disable no-shadow, jest/valid-expect, no-unused-expressions */
import React from "react";
import Box from "../../../src/components/box";
import {
  Checkbox,
  CheckboxProps,
  CheckboxGroupProps,
} from "../../../src/components/checkbox";
import {
  CheckboxComponent,
  CheckboxGroupComponent,
  CheckboxGroupComponentNewValidation,
} from "../../../src/components/checkbox/checkbox-test.stories";

import * as stories from "../../../src/components/checkbox/checkbox.stories";
import {
  checkboxComponent,
  checkboxRole,
  checkboxGroup,
  checkboxLabel,
  checkboxgroupLegend,
  checkboxInlineFieldHelp,
  checkboxIcon,
  checkboxGroupIcon,
  checkboxSvg,
  checkboxHelpIcon,
} from "../../locators/checkbox";
import {
  fieldHelpPreview,
  getComponent,
  tooltipPreview,
} from "../../locators/index";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  verifyRequiredAsteriskForLegend,
  verifyRequiredAsteriskForLabel,
  assertCssValueIsApproximately,
} from "../../support/component-helper/common-steps";
import {
  SIZE,
  VALIDATION,
  COLOR,
  CHARACTERS,
} from "../../support/component-helper/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Testing Checkbox component", () => {
  describe("when focused", () => {
    it("should have the expected styling when the focusRedesignOptOut is false", () => {
      CypressMountWithProviders(
        <CheckboxComponent data-component={CHARACTERS.STANDARD} />
      );
      checkboxRole()
        .focus()
        .next()
        .should(
          "have.css",
          "box-shadow",
          "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
        )
        .and("have.css", "outline", "rgba(0, 0, 0, 0) solid 3px");
    });

    it("should have the expected styling when the focusRedesignOptOut is true", () => {
      CypressMountWithProviders(
        <CheckboxComponent data-component={CHARACTERS.STANDARD} />,
        undefined,
        undefined,
        {
          focusRedesignOptOut: true,
        }
      );
      checkboxRole()
        .focus()
        .next()
        .should("have.css", "box-shadow", "rgb(255, 188, 25) 0px 0px 0px 3px");
    });
  });

  describe("should render Checkbox component", () => {
    it("should render Checkbox component with data-component", () => {
      CypressMountWithProviders(
        <CheckboxComponent data-component={CHARACTERS.STANDARD} />
      );
      getComponent(CHARACTERS.STANDARD).should(
        "have.attr",
        "data-component",
        CHARACTERS.STANDARD
      );
    });

    it("should render Checkbox component with data-element", () => {
      CypressMountWithProviders(
        <CheckboxComponent data-element={CHARACTERS.STANDARD} />
      );
      checkboxComponent().should(
        "have.attr",
        "data-element",
        CHARACTERS.STANDARD
      );
    });

    it("should render Checkbox component with data-role", () => {
      CypressMountWithProviders(
        <CheckboxComponent data-role={CHARACTERS.STANDARD} />
      );
      checkboxComponent().should("have.attr", "data-role", CHARACTERS.STANDARD);
    });

    it.each([
      [true, "be.checked"],
      [false, "not.be.checked"],
    ])(
      "should render Checkbox component with checked state set to %s",
      (booleanValue, assertion) => {
        CypressMountWithProviders(<CheckboxComponent checked={booleanValue} />);
        checkboxRole().should(assertion);
      }
    );

    it.each(testData)(
      "should render Checkbox component with %s as a label",
      (label) => {
        CypressMountWithProviders(<CheckboxComponent label={label} />);

        checkboxLabel().should("have.text", label);
      }
    );

    it.each(testData)(
      "should render Checkbox component with %s as fieldHelp",
      (fieldHelp) => {
        CypressMountWithProviders(<CheckboxComponent fieldHelp={fieldHelp} />);

        fieldHelpPreview().should("have.text", fieldHelp);
      }
    );

    it("should render Checkbox component with inline fieldHelp", () => {
      CypressMountWithProviders(
        <CheckboxComponent fieldHelp="Inline fieldhelp" fieldHelpInline />
      );

      checkboxInlineFieldHelp().should("have.text", "Inline fieldhelp");
    });

    it("should render Checkbox component with helpAriaLabel", () => {
      CypressMountWithProviders(
        <CheckboxComponent
          label="Label For CheckBox"
          labelHelp="Label Help"
          helpAriaLabel="This text provides more information for the label"
        />
      );

      checkboxIcon().trigger("mouseover");
      checkboxHelpIcon().should(
        "have.attr",
        "aria-label",
        "This text provides more information for the label"
      );
    });

    it.each([
      [true, "be.disabled"],
      [false, "not.be.disabled"],
    ])(
      "should render Checkbox component with disabled prop set to %s",
      (booleanValue, assertion) => {
        CypressMountWithProviders(
          <CheckboxComponent disabled={booleanValue} />
        );
        checkboxRole().should(assertion);
      }
    );

    it("should render Checkbox component with id", () => {
      CypressMountWithProviders(<CheckboxComponent id={CHARACTERS.STANDARD} />);
      checkboxRole().should("have.id", CHARACTERS.STANDARD);
    });

    it("should render Checkbox component with name", () => {
      CypressMountWithProviders(
        <CheckboxComponent name="confirm permission" />
      );
      checkboxRole().should("have.attr", "name", "confirm permission");
    });

    it("should render Checkbox component with value prop", () => {
      CypressMountWithProviders(<CheckboxComponent value="checkboxvalue" />);
      checkboxRole().should("have.value", "checkboxvalue");
    });

    it.each([
      [SIZE.SMALL, 16],
      [SIZE.LARGE, 24],
    ])(
      "should render Checkbox component with size set to %s",
      (size, sizeInPx) => {
        CypressMountWithProviders(<CheckboxComponent size={size} />);
        checkboxRole().then(($el) => {
          assertCssValueIsApproximately($el, "height", sizeInPx);
          assertCssValueIsApproximately($el, "width", sizeInPx);
        });
      }
    );

    it.each([
      [1, "8px"],
      [2, "16px"],
    ])(
      "should render Checkbox component with %s as labelSpacing",
      (spacing, padding) => {
        CypressMountWithProviders(<CheckboxComponent labelSpacing={spacing} />);

        checkboxLabel().parent().should("have.css", "padding-left", padding);
      }
    );

    it.each([
      ["10", "90", 135, 1229],
      ["30", "70", 409, 956],
      ["80", "20", 1092, 273],
    ])(
      "should render Checkbox using %s as labelWidth, %s as inputWidth and render it with correct label and input width ratios",
      (labelWidth, inputWidth, labelRatio, inputRatio) => {
        CypressMountWithProviders(
          <CheckboxComponent
            labelInline
            labelWidth={labelWidth}
            inputWidth={inputWidth}
          />
        );

        checkboxLabel()
          .parent()
          .then(($el) => {
            assertCssValueIsApproximately($el, "width", labelRatio);
          });
        checkboxRole()
          .parent()
          .then(($el) => {
            assertCssValueIsApproximately($el, "width", inputRatio);
          });
      }
    );

    it("should render Checkbox component as a required field", () => {
      CypressMountWithProviders(
        <CheckboxComponent label="Required Checkbox" required />
      );
      verifyRequiredAsteriskForLabel();
    });

    it("should render Checkbox component with autoFocus", () => {
      CypressMountWithProviders(<CheckboxComponent autoFocus />);
      checkboxRole().should("be.focused");
    });

    it("should render Checkbox component with error", () => {
      CypressMountWithProviders(<CheckboxComponent error />);

      checkboxSvg().should("have.css", "border-bottom-color", VALIDATION.ERROR);
    });

    it("should render Checkbox component with warning", () => {
      CypressMountWithProviders(<CheckboxComponent warning />);

      checkboxSvg().should(
        "have.css",
        "border-bottom-color",
        VALIDATION.WARNING
      );
    });

    it("should render Checkbox component with info", () => {
      CypressMountWithProviders(<CheckboxComponent info />);

      checkboxSvg().should("have.css", "border-bottom-color", VALIDATION.INFO);
    });

    it("should render Checkbox component with error icon", () => {
      CypressMountWithProviders(
        <CheckboxComponent error="Error has occurred" />
      );

      checkboxIcon().should("have.attr", "data-element", "error");
    });

    it("should render Checkbox component with warning icon", () => {
      CypressMountWithProviders(
        <CheckboxComponent warning="Warning has occurred" />
      );

      checkboxIcon().should("have.attr", "data-element", "warning");
    });

    it("should render Checkbox component with info icon", () => {
      CypressMountWithProviders(<CheckboxComponent info="Info has occurred" />);

      checkboxIcon().should("have.attr", "data-element", "info");
    });

    it.each([
      [true, 0],
      [false, 1],
    ])(
      "should render Checkbox with reverse prop set to %s",
      (reverseValue, position) => {
        CypressMountWithProviders(
          <CheckboxComponent label="Checkbox Label" reverse={reverseValue} />
        );

        checkboxComponent()
          .find("div:nth-child(1) > div > div:nth-child(1)")
          .children()
          .eq(position)
          .should("have.text", "Checkbox Label");
      }
    );

    it.each(["bottom", "left", "right", "top"])(
      "should render CheckboxComponent component with tooltip positioned to the %s",
      (position) => {
        CypressMountWithProviders(
          <Box m="250px">
            <CheckboxComponent
              labelHelp="Tooltip info"
              tooltipPosition={position}
            />
          </Box>
        );
        checkboxIcon().trigger("mouseover");
        tooltipPreview()
          .should("have.text", "Tooltip info")
          .should("have.attr", "data-placement", `${position}`);
      }
    );

    it("should render Checkbox component with tick color set to black by default", () => {
      CypressMountWithProviders(<CheckboxComponent checked />);
      checkboxRole()
        .should("be.checked")
        .should("have.css", "color", COLOR.BLACK);
    });

    it.each(["small", "large"])(
      "should render with the expected border radius styling when size is %s",
      (size) => {
        CypressMountWithProviders(<CheckboxComponent size={size} />);
        checkboxSvg().should(
          "have.css",
          "border-radius",
          size === "small" ? "2px" : "4px"
        );
      }
    );
  });

  describe("should render CheckBox component and check events", () => {
    it("should call onBlur callback when a blur event is triggered", () => {
      const callback: CheckboxProps["onBlur"] = cy.stub();
      CypressMountWithProviders(<CheckboxComponent onBlur={callback} />);

      checkboxRole()
        .focus()
        .blur()
        .then(() => {
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onChange callback when a check event is triggered", () => {
      const callback: CheckboxProps["onChange"] = cy.stub();
      CypressMountWithProviders(<CheckboxComponent onChange={callback} />);

      checkboxRole()
        .check()
        .then(() => {
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onChange callback when an uncheck event is triggered", () => {
      const callback: CheckboxProps["onChange"] = cy.stub();
      CypressMountWithProviders(
        <CheckboxComponent checked onChange={callback} />
      );

      checkboxRole()
        .uncheck()
        .then(() => {
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      const callback: CheckboxProps["onFocus"] = cy.stub();
      CypressMountWithProviders(<CheckboxComponent onFocus={callback} />);

      checkboxRole()
        .focus()
        .then(() => {
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClick callback when a click event is triggered", () => {
      const callback: CheckboxProps["onClick"] = cy.stub();
      CypressMountWithProviders(<CheckboxComponent onClick={callback} />);

      checkboxRole()
        .click()
        .then(() => {
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("Testing CheckboxGroup component", () => {
    it.each(testData)(
      "should render CheckboxGroup component with %s as legend",
      (legendValue) => {
        CypressMountWithProviders(
          <CheckboxGroupComponent legend={legendValue} />
        );
        checkboxgroupLegend().should("have.text", legendValue);
      }
    );

    it("should render CheckboxGroup component with error", () => {
      CypressMountWithProviders(<CheckboxGroupComponent error />);

      checkboxSvg().should("have.css", "border-bottom-color", VALIDATION.ERROR);
    });

    it("should render CheckboxGroup component with warning", () => {
      CypressMountWithProviders(<CheckboxGroupComponent warning />);

      checkboxSvg().should(
        "have.css",
        "border-bottom-color",
        VALIDATION.WARNING
      );
    });

    it("should render CheckboxGroup component with info", () => {
      CypressMountWithProviders(<CheckboxGroupComponent info />);

      checkboxSvg().should("have.css", "border-bottom-color", VALIDATION.INFO);
    });

    it("should render CheckboxGroup component with error message", () => {
      CypressMountWithProviders(
        <CheckboxGroupComponent error="Error has occurred" />
      );

      checkboxGroupIcon().should("have.attr", "data-element", "error");
    });

    it("should render CheckboxGroup component with warning message", () => {
      CypressMountWithProviders(
        <CheckboxGroupComponent warning="Warning has occurred" />
      );

      checkboxGroupIcon().should("have.attr", "data-element", "warning");
    });

    it("should render CheckboxGroup component with info message", () => {
      CypressMountWithProviders(
        <CheckboxGroupComponent info="Info has occurred" />
      );

      checkboxGroupIcon().should("have.attr", "data-element", "info");
    });

    it.each([
      ["left", "flex-start"],
      ["right", "flex-end"],
    ] as [CheckboxGroupProps["legendAlign"], string][])(
      "should render CheckboxGroup component with inline legend aligned to %s",
      (position, assertion) => {
        CypressMountWithProviders(
          <CheckboxGroupComponent
            legend="CheckBox Legend"
            legendWidth={20}
            legendAlign={position}
            legendInline
          />
        );
        checkboxgroupLegend().should("have.css", "justify-content", assertion);
      }
    );

    it.each([20, 40])(
      "should render CheckboxGroup component with inline legend width set to %s",
      (width) => {
        CypressMountWithProviders(
          <CheckboxGroupComponent
            legend="CheckBox Legend"
            legendWidth={width}
            legendInline
          />
        );
        checkboxgroupLegend().should("have.attr", "width", width);
      }
    );

    it("should render CheckboxGroup component with children", () => {
      CypressMountWithProviders(
        <CheckboxGroupComponent>
          <Checkbox
            id="checkbox_id three"
            key="checkbox_id-three"
            name="checkbox_id-three"
            label="Checkbox 3"
          />
        </CheckboxGroupComponent>
      );
      checkboxGroup().should("contain.text", "Checkbox 3");
    });

    it.each([
      [1, "8px"],
      [2, "16px"],
    ] as [CheckboxGroupProps["legendSpacing"], string][])(
      "should render CheckboxGroup component with legendSpacing set to %s",
      (spacing, padding) => {
        CypressMountWithProviders(
          <CheckboxGroupComponent
            legend="AVeryVeryLongLegend"
            legendSpacing={spacing}
            legendWidth={10}
            legendInline
          />
        );
        checkboxgroupLegend().should("have.css", "padding-right", padding);
      }
    );

    it.each([
      "top",
      "bottom",
      "left",
      "right",
    ] as CheckboxGroupProps["tooltipPosition"][])(
      "should render CheckboxGroupComponent component with tooltip positioned to the %s",
      (position) => {
        CypressMountWithProviders(
          <CheckboxGroupComponent
            legend="Checkbox Legend"
            error="Something is wrong"
            tooltipPosition={position}
          />
        );
        checkboxGroupIcon().trigger("mouseover");
        tooltipPreview()
          .should("have.text", "Something is wrong")
          .should("have.attr", "data-placement", position);
      }
    );

    it("should render CheckboxGroup component as a required field", () => {
      CypressMountWithProviders(
        <CheckboxGroupComponent legend="Required CheckboxGroup" required />
      );

      verifyRequiredAsteriskForLegend();
    });

    it("should render CheckboxGroup component with new validation error", () => {
      CypressMountWithProviders(
        <CheckboxGroupComponentNewValidation error="Error Message (Fix is required)" />
      );

      checkboxGroup()
        .children()
        .eq(2)
        .children()
        .should("contain.text", "Error Message (Fix is required)")
        .and("have.css", "color", "rgb(199, 56, 79)");
      checkboxGroup()
        .children()
        .eq(2)
        .children()
        .eq(1)
        .should("have.css", "background-color", "rgb(199, 56, 79)")
        .and("have.css", "position", "absolute");
    });

    it("should render CheckboxGroup component with new validation warning", () => {
      CypressMountWithProviders(
        <CheckboxGroupComponentNewValidation warning="Warning Message (Fix is optional)" />
      );

      checkboxGroup()
        .children()
        .eq(2)
        .children()
        .should("contain.text", "Warning Message (Fix is optional)")
        .and("have.css", "color", "rgb(191, 82, 0)");
      checkboxGroup()
        .children()
        .eq(2)
        .children()
        .eq(1)
        .should("have.css", "background-color", "rgb(233, 100, 0)")
        .and("have.css", "position", "absolute");
    });

    it.each([
      [true, "row"],
      [false, "column"],
    ])(
      "should render CheckboxGroup component with new validation and inline prop set to %s",
      (bool, flex) => {
        CypressMountWithProviders(
          <CheckboxGroupComponentNewValidation required inline={bool} />
        );

        checkboxGroup()
          .children()
          .eq(2)
          .children()
          .should("have.css", "flex-direction", flex);
      }
    );
  });

  describe("should check accessibility for Checkbox", () => {
    it.each([true, false])(
      "should pass accessibility tests for Checkbox component with checked state set to %s",
      (booleanValue) => {
        CypressMountWithProviders(<CheckboxComponent checked={booleanValue} />);

        cy.checkAccessibility();
      }
    );

    it("should pass accessibility tests for Checkbox component with fieldHelp", () => {
      CypressMountWithProviders(
        <CheckboxComponent fieldHelp="Inline fieldhelp" />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Checkbox component with inline fieldHelp", () => {
      CypressMountWithProviders(
        <CheckboxComponent fieldHelp="Inline fieldhelp" fieldHelpInline />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Checkbox component with help icon", () => {
      CypressMountWithProviders(
        <CheckboxComponent label="Label For CheckBox" labelHelp="Label Help" />
      );

      checkboxIcon().trigger("mouseover");
      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Checkbox disabled", () => {
      CypressMountWithProviders(<CheckboxComponent disabled />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Checkbox with different sizes", () => {
      CypressMountWithProviders(<stories.Sizes />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Checkbox reversed", () => {
      CypressMountWithProviders(<stories.Reversed />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Checkbox with custom label width", () => {
      CypressMountWithProviders(<stories.WithCustomLabelWidth />);

      cy.checkAccessibility();
    });

    it.each([1, 2])(
      "should pass accessibility tests for Checkbox component with %s as labelSpacing",
      (spacing) => {
        CypressMountWithProviders(<CheckboxComponent labelSpacing={spacing} />);

        cy.checkAccessibility();
      }
    );

    it("should pass accessibility tests for Checkbox component as a required field", () => {
      CypressMountWithProviders(
        <CheckboxComponent label="Required Checkbox" required />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Checkbox component with autoFocus", () => {
      CypressMountWithProviders(<CheckboxComponent autoFocus />);

      cy.checkAccessibility();
    });

    it.each(["bottom", "left", "right", "top"])(
      "should render CheckboxComponent component with tooltip positioned to the %s",
      (position) => {
        CypressMountWithProviders(
          <Box m="250px">
            <CheckboxComponent
              labelHelp="Tooltip info"
              tooltipPosition={position}
            />
          </Box>
        );

        checkboxIcon()
          .trigger("mouseover")
          .then(() => {
            cy.checkAccessibility();
          });
      }
    );

    it("should pass accessibility tests for Checkbox component with error message", () => {
      CypressMountWithProviders(
        <CheckboxComponent error="Error has occurred" />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Checkbox component with warning message", () => {
      CypressMountWithProviders(
        <CheckboxComponent warning="Warning has occurred" />
      );

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Checkbox component with info message", () => {
      CypressMountWithProviders(<CheckboxComponent info="Info has occurred" />);

      cy.checkAccessibility();
    });
  });

  describe("should check accessibility for Checkbox Group", () => {
    it("should pass accessibility tests for CheckboxGroup component with !@#$%^*()_+-=~[];:.,?{}&\"'<> as legend", () => {
      CypressMountWithProviders(
        <CheckboxGroupComponent legend={CHARACTERS.SPECIALCHARACTERS} />
      );

      cy.checkAccessibility();
    });

    it.each(["left", "right"] as CheckboxGroupProps["legendAlign"][])(
      "should pass accessibility tests for CheckboxGroup component with inline legend aligned to %s",
      (position) => {
        CypressMountWithProviders(
          <CheckboxGroupComponent
            legend="CheckBox Legend"
            legendWidth={20}
            legendAlign={position}
            legendInline
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each([20, 40])(
      "should pass accessibility tests for CheckboxGroup component with inline legend width set to %s",
      (width) => {
        CypressMountWithProviders(
          <CheckboxGroupComponent
            legend="CheckBox Legend"
            legendWidth={width}
            legendInline
          />
        );

        cy.checkAccessibility();
      }
    );

    it.each([1, 2] as CheckboxGroupProps["legendSpacing"][])(
      "should pass accessibility tests for CheckboxGroup component with legendSpacing set to %s",
      (spacing) => {
        CypressMountWithProviders(
          <CheckboxGroupComponent
            legend="AVeryVeryLongLegend"
            legendSpacing={spacing}
            legendWidth={10}
            legendInline
          />
        );

        cy.checkAccessibility();
      }
    );

    it("should pass accessibility tests for CheckboxGroup component as a required field", () => {
      CypressMountWithProviders(
        <CheckboxGroupComponent legend="Required CheckboxGroup" required />
      );

      cy.checkAccessibility();
    });

    it.each([
      "top",
      "bottom",
      "left",
      "right",
    ] as CheckboxGroupProps["tooltipPosition"][])(
      "should pass accessibility tests for CheckboxGroup component with tooltip positioned to the %s",
      (position) => {
        CypressMountWithProviders(
          <CheckboxGroupComponent
            legend="Checkbox Legend"
            error="Something is wrong"
            tooltipPosition={position}
          />
        );

        checkboxGroupIcon()
          .trigger("mouseover")
          .then(() => {
            cy.checkAccessibility();
          });
      }
    );
  });
});
