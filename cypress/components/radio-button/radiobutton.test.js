import React from "react";
import RadioButton from "../../../src/components/radio-button/radio-button.component";
import {
  RadioButtonComponent,
  RadioButtonGroupComponent,
} from "../../../src/components/radio-button/radio-button-test.stories";
import * as stories from "../../../src/components/radio-button/radio-button.stories";
import {
  SIZE,
  VALIDATION,
  COLOR,
  CHARACTERS,
} from "../../support/component-helper/constants";
import {
  radiobuttonGroup,
  radiobuttonComponent,
  radiobuttonLabel,
  radiobuttonInlineFieldHelp,
  radiobuttonIcon,
  radiobuttonSvg,
  radiobuttonGroupLegend,
  radiobuttonGroupIcon,
  radiobuttonRole,
  radiobutton,
} from "../../locators/radiobutton";

import {
  fieldHelpPreview,
  getComponent,
  tooltipPreview,
} from "../../locators/index";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  useJQueryCssValueAndAssert,
  verifyRequiredAsteriskForLegend,
} from "../../support/component-helper/common-steps";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const radioContainerWidth = 400;
const radioInputWidth = 16;
const labelContainerWidth = 40;

context("Testing RadioButton component", () => {
  describe("should render RadioButton component", () => {
    it("should render RadioButton component with data-component", () => {
      CypressMountWithProviders(
        <RadioButtonComponent data-component={CHARACTERS.STANDARD} />
      );
      getComponent(CHARACTERS.STANDARD).should(
        "have.attr",
        "data-component",
        CHARACTERS.STANDARD
      );
    });

    it("should render RadioButton component with data-element", () => {
      CypressMountWithProviders(
        <RadioButtonComponent data-element={CHARACTERS.STANDARD} />
      );
      radiobuttonComponent().should(
        "have.attr",
        "data-element",
        CHARACTERS.STANDARD
      );
    });

    it("should render RadioButton component with data-role", () => {
      CypressMountWithProviders(
        <RadioButtonComponent data-role={CHARACTERS.STANDARD} />
      );
      radiobuttonComponent().should(
        "have.attr",
        "data-role",
        CHARACTERS.STANDARD
      );
    });

    it.each([
      [true, "be.checked"],
      [false, "not.be.checked"],
    ])(
      "should render RadioButton component with checked state set to %s",
      (booleanValue, assertion) => {
        CypressMountWithProviders(
          <RadioButtonComponent checked={booleanValue} />
        );
        radiobuttonRole().should(assertion);
      }
    );

    it.each(testData)(
      "should render RadioButton component with %s as a label",
      (label) => {
        CypressMountWithProviders(<RadioButtonComponent label={label} />);

        radiobuttonLabel().should("have.text", label);
      }
    );

    it.each(testData)(
      "should render RadioButton component with %s as fieldHelp",
      (fieldHelp) => {
        CypressMountWithProviders(
          <RadioButtonComponent fieldHelp={fieldHelp} />
        );

        fieldHelpPreview().should("have.text", fieldHelp);
      }
    );

    it("should render RadioButton component with inline fieldHelp", () => {
      CypressMountWithProviders(
        <RadioButtonComponent fieldHelp="Inline fieldhelp" fieldHelpInline />
      );

      radiobuttonInlineFieldHelp().should("have.text", "Inline fieldhelp");
    });

    it.each([
      [true, "be.disabled"],
      [false, "not.be.disabled"],
    ])(
      "should render RadioButton component with disabled prop set to %s",
      (booleanValue, assertion) => {
        CypressMountWithProviders(
          <RadioButtonComponent disabled={booleanValue} />
        );
        radiobuttonRole().should(assertion);
      }
    );

    it("should render RadioButton component with id", () => {
      CypressMountWithProviders(
        <RadioButtonComponent id={CHARACTERS.STANDARD} />
      );
      radiobuttonRole().should("have.id", CHARACTERS.STANDARD);
    });

    it("should render RadioButton component with name", () => {
      CypressMountWithProviders(
        <RadioButtonComponent name="radiobutton name" />
      );
      radiobuttonRole().should("have.attr", "name", "radiobutton name");
    });

    it("should render RadioButton component with value prop", () => {
      CypressMountWithProviders(
        <RadioButtonComponent value="radiobuttonvalue" />
      );
      radiobuttonRole().should("have.value", "radiobuttonvalue");
    });

    it.each([
      [SIZE.SMALL, 16],
      [SIZE.LARGE, 24],
    ])(
      "should render RadioButton component with size set to %s",
      (size, heightAndWidth) => {
        CypressMountWithProviders(<RadioButtonComponent size={size} />);
        radiobuttonRole().then(($el) => {
          useJQueryCssValueAndAssert($el, "height", heightAndWidth);
          useJQueryCssValueAndAssert($el, "width", heightAndWidth);
        });
      }
    );

    it.each([
      [1, "8px"],
      [2, "16px"],
    ])(
      "should render RadioButton component with %s as labelSpacing",
      (spacing, padding) => {
        CypressMountWithProviders(
          <RadioButtonComponent labelSpacing={spacing} />
        );

        radiobuttonLabel().parent().should("have.css", "padding-left", padding);
      }
    );

    it.each([100, 75, 50, 25, 10])(
      "should render RadioButton using %s as labelWidth with correct width",
      (labelWidth) => {
        CypressMountWithProviders(
          <RadioButtonComponent
            labelWidth={labelWidth}
            reverse
            inputWidth={labelWidth === 100 ? undefined : 10}
          />
        );

        // if labelWidth is 100% it will still need to allow for input width of 16px
        const parentWidth =
          labelWidth === 100
            ? radioContainerWidth - radioInputWidth
            : radioContainerWidth * (labelWidth / 100);
        radiobuttonLabel()
          .parent()
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", parentWidth);
          });
      }
    );

    it.each([100, 75, 50, 25, 10])(
      "should render RadioButton using %s as inputWidth and render it with correct width",
      (inputWidth) => {
        CypressMountWithProviders(
          <RadioButtonComponent
            labelWidth={10}
            reverse
            inputWidth={inputWidth}
          />
        );

        // if inputWidth is 100% it will still need to allow for label container width of 32px + 8px
        const parentWidth =
          inputWidth === 100
            ? radioContainerWidth - labelContainerWidth
            : radioContainerWidth * (inputWidth / 100);
        radiobuttonRole()
          .parent()
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", parentWidth);
          });
      }
    );

    it("should render RadioButton component with autoFocus", () => {
      CypressMountWithProviders(<RadioButtonComponent autoFocus />);
      radiobuttonRole().should("be.focused");
    });

    it("should render RadioButton component with error", () => {
      CypressMountWithProviders(<RadioButtonComponent error />);

      radiobuttonSvg().should(
        "have.css",
        "border-bottom-color",
        VALIDATION.ERROR
      );
    });

    it("should render RadioButton component with warning", () => {
      CypressMountWithProviders(<RadioButtonComponent warning />);

      radiobuttonSvg().should(
        "have.css",
        "border-bottom-color",
        VALIDATION.WARNING
      );
    });

    it("should render RadioButton component with info", () => {
      CypressMountWithProviders(<RadioButtonComponent info />);

      radiobuttonSvg().should(
        "have.css",
        "border-bottom-color",
        VALIDATION.INFO
      );
    });

    it("should render RadioButton component with error message", () => {
      CypressMountWithProviders(
        <RadioButtonComponent error="Error has occurred" />
      );

      radiobuttonIcon().should("have.attr", "data-element", "error");
    });

    it("should render RadioButton component with warning message", () => {
      CypressMountWithProviders(
        <RadioButtonComponent warning="Warning has occurred" />
      );

      radiobuttonIcon().should("have.attr", "data-element", "warning");
    });

    it("should render RadioButton component with info message", () => {
      CypressMountWithProviders(
        <RadioButtonComponent info="Info has occurred" />
      );

      radiobuttonIcon().should("have.attr", "data-element", "info");
    });

    it.each([
      [true, "0"],
      [false, "1"],
    ])(
      "should render RadioButton with reverse prop set to %s",
      (reverseValue, position) => {
        CypressMountWithProviders(
          <RadioButtonComponent
            label="Radiobutton Label"
            reverse={reverseValue}
          />
        );

        radiobuttonComponent()
          .find("div:nth-child(1) > div > div:nth-child(1)")
          .children()
          .eq(position)
          .should("have.text", "Radiobutton Label");
      }
    );

    it.each(["bottom", "left", "right", "top"])(
      "should render RadioButton component with tooltip positioned to the %s",
      (position) => {
        CypressMountWithProviders(
          <RadioButtonComponent
            labelHelp="Tooltip info"
            tooltipPosition={position}
          />
        );
        radiobuttonIcon().trigger("mouseover");
        tooltipPreview()
          .should("have.text", "Tooltip info")
          .should("have.attr", "data-placement", position);
      }
    );

    it("should render RadioButton component with fill color set to black by default", () => {
      CypressMountWithProviders(<RadioButtonComponent checked />);
      radiobuttonRole()
        .should("be.checked")
        .should("have.css", "color", COLOR.BLACK);
    });
  });

  describe("should render RadioButton component and check events", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<RadioButtonComponent onBlur={callback} />);

      radiobuttonRole()
        .focus()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onChange callback when a check event is triggered", () => {
      CypressMountWithProviders(<RadioButtonComponent onChange={callback} />);

      radiobuttonRole()
        .check()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      CypressMountWithProviders(<RadioButtonComponent onFocus={callback} />);

      radiobuttonRole()
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClick callback when a click event is triggered", () => {
      CypressMountWithProviders(<RadioButtonComponent onClick={callback} />);

      radiobuttonRole()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });

  describe("Testing RadioButtonGroup component", () => {
    it.each(testData)(
      "should render RadioButtonGroup component with %s as legend",
      (legendValue) => {
        CypressMountWithProviders(
          <RadioButtonGroupComponent legend={legendValue} />
        );
        radiobuttonGroupLegend().should("have.text", legendValue);
      }
    );

    it("should render RadioButtonGroup component with error", () => {
      CypressMountWithProviders(<RadioButtonGroupComponent error />);

      radiobuttonSvg().should(
        "have.css",
        "border-bottom-color",
        VALIDATION.ERROR
      );
    });

    it("should render RadioButtonGroup component with warning", () => {
      CypressMountWithProviders(<RadioButtonGroupComponent warning />);

      radiobuttonSvg().should(
        "have.css",
        "border-bottom-color",
        VALIDATION.WARNING
      );
    });

    it("should render RadioButtonGroup component with info", () => {
      CypressMountWithProviders(<RadioButtonGroupComponent info />);

      radiobuttonSvg().should(
        "have.css",
        "border-bottom-color",
        VALIDATION.INFO
      );
    });

    it("should render RadioButtonGroup component with error message", () => {
      CypressMountWithProviders(
        <RadioButtonGroupComponent error="Error has occurred" />
      );

      radiobuttonGroupIcon().should("have.attr", "data-element", "error");
    });

    it("should render RadioButtonGroup component with warning message", () => {
      CypressMountWithProviders(
        <RadioButtonGroupComponent warning="Warning has occurred" />
      );

      radiobuttonGroupIcon().should("have.attr", "data-element", "warning");
    });

    it("should render RadioButtonGroup component with info message", () => {
      CypressMountWithProviders(
        <RadioButtonGroupComponent info="Info has occurred" />
      );

      radiobuttonGroupIcon().should("have.attr", "data-element", "info");
    });

    it.each([
      ["left", "start"],
      ["right", "end"],
    ])(
      "should render RadioButtonGroup component with inline legend aligned to %s",
      (position, assertion) => {
        CypressMountWithProviders(
          <RadioButtonGroupComponent
            legendWidth={20}
            legendAlign={position}
            legendInline
          />
        );
        radiobuttonGroupLegend().should(
          "have.css",
          "justify-content",
          `flex-${assertion}`
        );
      }
    );

    it.each([20, 40])(
      "should render RadioButtonGroup component with inline legend width set to %s",
      (width) => {
        CypressMountWithProviders(
          <RadioButtonGroupComponent legendWidth={width} legendInline />
        );
        radiobuttonGroupLegend().should("have.attr", "width", width);
      }
    );

    it("should render RadioButtonGroup component with children", () => {
      CypressMountWithProviders(
        <RadioButtonGroupComponent>
          <RadioButton id="radio-4" value="radio4" label="Don't Know" />
        </RadioButtonGroupComponent>
      );
      radiobuttonGroup().should("contain.text", "Don't Know");
    });

    it.each([
      [1, "8px"],
      [2, "16px"],
    ])(
      "should render RadioButtonGroup component with legendSpacing set to %s",
      (spacing, padding) => {
        CypressMountWithProviders(
          <RadioButtonGroupComponent
            legendSpacing={spacing}
            legendWidth="10"
            legendInline
          />
        );
        radiobuttonGroupLegend().should("have.css", "padding-right", padding);
      }
    );

    it.each(["top", "bottom", "left", "right"])(
      "should render RadioButtonGroup component with tooltip positioned to the %s",
      (position) => {
        CypressMountWithProviders(
          <RadioButtonGroupComponent
            error="Something is wrong"
            tooltipPosition={position}
          />
        );

        radiobuttonGroupIcon().trigger("mouseover");
        tooltipPreview()
          .should("have.text", "Something is wrong")
          .should("have.attr", "data-placement", position);
      }
    );

    it("should render RadioButtonGroup component as a required field", () => {
      CypressMountWithProviders(<RadioButtonGroupComponent required />);

      verifyRequiredAsteriskForLegend();
    });

    it("should render RadioButtonGroup component with radiobuttons inline", () => {
      CypressMountWithProviders(<RadioButtonGroupComponent inline />);

      radiobutton(0)
        .should("have.css", "margin-bottom", "12px")
        .should("have.css", "margin-left", "0px");

      radiobutton(1)
        .should("have.css", "margin-bottom", "12px")
        .should("have.css", "margin-left", "32px");

      radiobutton(2)
        .should("have.css", "margin-bottom", "0px")
        .should("have.css", "margin-left", "32px");
    });

    it.each([
      ["inline", "399", "left"],
      ["inline", "400", "left"],
      ["above", "401", "none"],
    ])(
      "should check RadioButtonGroup legend is %s with adaptiveLabelBreakpoint %s and viewport 400",
      (alignment, breakpoint, float) => {
        cy.viewport(400, 300);

        CypressMountWithProviders(
          <RadioButtonGroupComponent
            adaptiveLegendBreakpoint={breakpoint}
            adaptiveSpacingBreakpoint={breakpoint}
          />
        );

        radiobuttonGroupLegend().should("have.css", "float", float);
      }
    );
  });

  describe("Accessibility tests for RadioButton component", () => {
    it("should pass accessibilty tests for RadioButton Default story", () => {
      CypressMountWithProviders(<stories.Default />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for RadioButton WithLegendAndLabels story", () => {
      CypressMountWithProviders(<stories.WithLegendAndLabels />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for RadioButton WithInlineLegend story", () => {
      CypressMountWithProviders(<stories.WithInlineLegend />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for RadioButton WithLeftMargin story", () => {
      CypressMountWithProviders(<stories.WithLeftMargin />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for RadioButton EnableAdaptiveBehaviour story", () => {
      CypressMountWithProviders(<stories.EnableAdaptiveBehaviour />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for RadioButton DifferentLabelSpacing story", () => {
      CypressMountWithProviders(<stories.DifferentLabelSpacing />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for RadioButton InlineRadioButtons story", () => {
      CypressMountWithProviders(<stories.InlineRadioButtons />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for RadioButton ReverseRadioButtons story", () => {
      CypressMountWithProviders(<stories.ReverseRadioButtons />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for RadioButton DisableRadioButtons story", () => {
      CypressMountWithProviders(<stories.DisableRadioButtons />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for RadioButton WithFieldHelp story", () => {
      CypressMountWithProviders(<stories.WithFieldHelp />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for RadioButton WithLargeRadioButtons story", () => {
      CypressMountWithProviders(<stories.WithLargeRadioButtons />);

      cy.checkAccessibility();
    });

    it("should pass accessibilty tests for RadioButton WithCustomStyledLabels story", () => {
      CypressMountWithProviders(<stories.WithCustomStyledLabels />);

      cy.checkAccessibility();
    });
  });
});
