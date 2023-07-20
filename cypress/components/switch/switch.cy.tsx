import React from "react";
import Box from "../../../src/components/box";
import Switch, { SwitchProps } from "../../../src/components/switch";
import { WithMargin } from "../../../src/components/switch/switch.stories";
import {
  SwitchComponent,
  SwitchComponentValidations,
} from "../../../src/components/switch/switch-test.stories";
import {
  switchDataComponent,
  switchInput,
  switchLabel,
  switchIcon,
  switchHelpIcon,
  switchLoading,
} from "../../locators/switch/index";
import CypressMountWithProviders from "../../support/component-helper/cypress-mount";
import {
  getComponent,
  fieldHelpPreview,
  tooltipPreview,
  getDataElementByValue,
} from "../../locators/index";
import { keyCode } from "../../support/helper";
import {
  assertCssValueIsApproximately,
  verifyRequiredAsteriskForLabel,
} from "../../support/component-helper/common-steps";
import {
  CHARACTERS,
  VALIDATION,
  SIZE,
} from "../../support/component-helper/constants";
import { ICON } from "../../locators/locators";

const testCypress = CHARACTERS.STANDARD;
const validationTypes = [
  ["error", VALIDATION.ERROR],
  ["warning", VALIDATION.WARNING],
  ["info", VALIDATION.INFO],
] as [string, string][];

const verifyBorderColor = (
  element: Cypress.Chainable<JQuery<HTMLElement>>,
  color: string
) =>
  element.then(($els: JQuery<Element>) => {
    // get Window reference from element
    const win = $els[0].ownerDocument.defaultView;
    // use getComputedStyle to read the pseudo selector
    const after = win?.getComputedStyle($els[0], "before");
    // read the value of the `content` CSS property
    const contentValue = after?.getPropertyValue("color");
    // the returned value will have double quotes around it, but this is correct
    cy.wrap(contentValue).should("equal", color);
  });

context("Testing Switch component", () => {
  describe("check props for Switch component", () => {
    it.each([
      CHARACTERS.STANDARD,
      CHARACTERS.DIACRITICS,
      CHARACTERS.SPECIALCHARACTERS,
    ])("verify Switch component with %s as fieldHelp", (fieldHelp) => {
      CypressMountWithProviders(<SwitchComponent fieldHelp={fieldHelp} />);

      fieldHelpPreview().should("have.text", fieldHelp);
    });

    it.each([
      CHARACTERS.STANDARD,
      CHARACTERS.DIACRITICS,
      CHARACTERS.SPECIALCHARACTERS,
    ])("verify Switch component with %s as a label", (label) => {
      CypressMountWithProviders(<SwitchComponent label={label} />);

      switchLabel().should("have.text", label);
    });

    it.each([
      [true, "have.attr", "have.attr"],
      [false, "not.have.attr", "not.exist"],
    ])(
      "verify Switch component with loading prop %s",
      (boolVal, attribute, component) => {
        CypressMountWithProviders(<SwitchComponent loading={boolVal} />);

        switchInput().should(attribute, "disabled");
        switchLoading().should(component, "data-component", "loader");
      }
    );

    it("verify Switch component with data-component", () => {
      CypressMountWithProviders(
        <SwitchComponent data-component={CHARACTERS.STANDARD} />
      );

      getComponent(CHARACTERS.STANDARD).should(
        "have.attr",
        "data-component",
        CHARACTERS.STANDARD
      );
    });

    it("verify Switch component with data-element", () => {
      CypressMountWithProviders(
        <SwitchComponent data-element={CHARACTERS.STANDARD} />
      );

      switchDataComponent().should(
        "have.attr",
        "data-element",
        CHARACTERS.STANDARD
      );
    });

    it("verify Switch component with data-role", () => {
      CypressMountWithProviders(
        <SwitchComponent data-role={CHARACTERS.STANDARD} />
      );

      switchDataComponent().should(
        "have.attr",
        "data-role",
        CHARACTERS.STANDARD
      );
    });

    it("verify Switch component with autoFocus", () => {
      CypressMountWithProviders(<SwitchComponent autoFocus />);

      switchInput().should("be.focused");
    });

    it.each([
      [true, "be.checked"],
      [false, "not.be.checked"],
    ])(
      "verify Switch component with checked state set to %s",
      (boolVal, assertion) => {
        CypressMountWithProviders(<SwitchComponent checked={boolVal} />);

        switchInput().should(assertion);
      }
    );

    it.each([
      [true, "have.attr"],
      [false, "not.have.attr"],
    ])("verify Switch with disabled prop %s", (boolVal, attribute) => {
      CypressMountWithProviders(<SwitchComponent disabled={boolVal} />);

      switchInput().should(attribute, "disabled");
      switchLabel().should(attribute, "disabled");
    });

    it.each([true, false])(
      "verify Switch component with inline fieldHelp",
      (boolVal) => {
        CypressMountWithProviders(
          <SwitchComponent
            fieldHelp="Inline fieldhelp"
            fieldHelpInline={boolVal}
          />
        );

        if (boolVal === true) {
          switchDataComponent()
            .children()
            .children()
            .children()
            .children()
            .eq(1)
            .should("have.attr", "data-element", "help");
        } else {
          switchDataComponent()
            .children()
            .children()
            .children()
            .eq(1)
            .should("have.attr", "data-element", "help");
        }
      }
    );

    it("verify Switch component with id", () => {
      CypressMountWithProviders(<SwitchComponent id={CHARACTERS.STANDARD} />);

      switchInput().should("have.id", CHARACTERS.STANDARD);
    });

    it.each([
      [true, "have.css", 24, 0, 8],
      [false, "not.have.css", 16, 8, 0],
    ])(
      "verify Switch component with labelInline prop %s",
      (boolVal, have, height, margin, padding) => {
        CypressMountWithProviders(<SwitchComponent labelInline={boolVal} />);

        switchLabel()
          .parent()
          .should(have, "box-sizing", "border-box")
          .then(($el) => {
            assertCssValueIsApproximately($el, "height", height);
            assertCssValueIsApproximately($el, "margin-bottom", margin);
            assertCssValueIsApproximately($el, "padding-right", padding);
          });
      }
    );

    it.each([
      [10, 130],
      [30, 390],
      [80, 1041],
    ] as [SwitchProps["labelWidth"], number][])(
      "verify Switch with labelWidth %s and render it with correct label width ratio",
      (labelWidth, labelRatio) => {
        CypressMountWithProviders(<SwitchComponent labelWidth={labelWidth} />);

        switchLabel()
          .parent()
          .then(($el) => {
            assertCssValueIsApproximately($el, "width", labelRatio);
          });
      }
    );

    it.each([
      [90, 1171],
      [70, 911],
      [20, 260],
    ] as [SwitchProps["inputWidth"], number][])(
      "verify Switch with inputWidth %s and render it with correct input width ratio",
      (inputWidth, inputRatio) => {
        CypressMountWithProviders(
          <SwitchComponent labelInline inputWidth={inputWidth} />
        );

        switchInput()
          .parent()
          .then(($el) => {
            assertCssValueIsApproximately($el, "width", inputRatio);
          });
      }
    );

    // skipped because of https://jira.sage.com/browse/FE-5530
    it.skip("verify Switch component with labelAlign %s", () => {
      CypressMountWithProviders(<SwitchComponent labelAlign="right" />);

      switchLabel().parent().should("have.css", "align-items", "right");
    });

    it("verify Switch component with labelHelp", () => {
      CypressMountWithProviders(
        <SwitchComponent label="Label For Switch" labelHelp="Label Help" />
      );

      switchIcon().trigger("mouseover");
      tooltipPreview().should("have.text", "Label Help");
    });

    it.each([
      [1, 8],
      [2, 17],
    ] as [SwitchProps["labelSpacing"], number][])(
      "verify Switch component with labelSpacing %s",
      (spacing, padding) => {
        CypressMountWithProviders(
          <SwitchComponent labelInline label="label" labelSpacing={spacing} />
        );

        switchLabel()
          .parent()
          .then(($el) => {
            assertCssValueIsApproximately($el, "padding-right", padding);
          });
      }
    );

    it("verify Switch component with name", () => {
      CypressMountWithProviders(<SwitchComponent name={CHARACTERS.STANDARD} />);

      switchInput().should("have.attr", "name", CHARACTERS.STANDARD);
    });

    it.each([
      ["error", VALIDATION.ERROR],
      ["warning", VALIDATION.WARNING],
      ["info", VALIDATION.INFO],
    ])(
      "verify Switch component is verifyed with appropriate border color for validations",
      (type, validation) => {
        CypressMountWithProviders(<SwitchComponentValidations />);

        verifyBorderColor(getDataElementByValue(type), validation);
      }
    );

    it.each(["error", "warning", "info"])(
      "verify Switch component with validation icon",
      (validation) => {
        CypressMountWithProviders(<SwitchComponentValidations />);

        getDataElementByValue(validation).should(
          "have.attr",
          "data-component",
          "icon"
        );
      }
    );

    it.each(["error", "warning", "info"])(
      "verify Switch component with validation has %s as tooltip message",
      (type) => {
        CypressMountWithProviders(<SwitchComponentValidations />);

        getDataElementByValue(type).trigger("mouseover");
        tooltipPreview().should("have.text", type);
      }
    );

    it.each([
      ["error", 0],
      ["warning", 1],
      ["info", 2],
    ])(
      "verify Switch component with validation on label",
      (validation, position) => {
        CypressMountWithProviders(
          <SwitchComponentValidations validationOnLabel />
        );

        switchLabel()
          .eq(position)
          .parent()
          .find(ICON)
          .and("have.attr", "data-element", validation);
      }
    );

    it.each([
      [true, "have.attr", "not.have.attr"],
      [false, "not.have.attr", "have.attr"],
    ])(
      "verify Switch component reverse set to %s",
      (boolVal, condition1, condition2) => {
        CypressMountWithProviders(<SwitchComponent reverse={boolVal} />);

        switchDataComponent()
          .children()
          .children()
          .children()
          .children()
          .children()
          .should(condition1, "data-element", "label")
          .and(condition2, "role", "switch");
      }
    );

    it.each([
      [SIZE.SMALL, 60, 24],
      [SIZE.LARGE, 82, 44],
    ] as [SwitchProps["size"], number, number][])(
      "verify Switch component with size set to %s",
      (size, width, height) => {
        CypressMountWithProviders(<SwitchComponent size={size} />);

        switchInput().then(($el) => {
          assertCssValueIsApproximately($el, "height", height);
          assertCssValueIsApproximately($el, "width", width);
        });
      }
    );

    it("verify Switch component with value prop", () => {
      CypressMountWithProviders(<SwitchComponent value="switchvalue" />);
      switchInput().should("have.value", "switchvalue");
    });

    it.each([
      [399, "have.css", 24],
      [400, "have.css", 24],
      [401, "not.have.css", 16],
    ])(
      "check Switch label is %s with adaptiveLabelBreakpoint %s and viewport 400",
      (breakpoint, attribute, height) => {
        cy.viewport(400, 300);

        CypressMountWithProviders(
          <SwitchComponent labelInline adaptiveLabelBreakpoint={breakpoint} />
        );

        switchLabel()
          .parent()
          .should(attribute, "box-sizing", "border-box")
          .then(($el) => {
            assertCssValueIsApproximately($el, "height", height);
          });
      }
    );

    it("verify Switch component as a required field", () => {
      CypressMountWithProviders(<SwitchComponent required />);

      verifyRequiredAsteriskForLabel();
    });

    it.each([
      "bottom",
      "left",
      "right",
      "top",
    ] as SwitchProps["tooltipPosition"][])(
      "verify Switch component with tooltip positioned to the %s",
      (position) => {
        CypressMountWithProviders(
          <Box m="250px">
            <SwitchComponent
              labelHelp="Switch info"
              tooltipPosition={position}
            />
          </Box>
        );
        switchIcon().trigger("mouseover");
        tooltipPreview()
          .should("have.text", "Switch info")
          .should("have.attr", "data-placement", `${position}`);
      }
    );

    it("verify Switch component with helpAriaLabel", () => {
      CypressMountWithProviders(
        <SwitchComponent
          labelHelp="Label Help"
          helpAriaLabel="This text provides more information for the label"
        />
      );

      switchIcon().trigger("mouseover");
      switchHelpIcon().should(
        "have.attr",
        "aria-label",
        "This text provides more information for the label"
      );
    });

    it.each([
      [true, "on"],
      [false, "off"],
    ])("verify Switch component with defaultChecked %s", (boolVal, state) => {
      CypressMountWithProviders(
        <Switch label="Label" name="switch-name" defaultChecked={boolVal} />
      );

      switchInput()
        .parent()
        .children()
        .eq(1)
        .children()
        .should("have.attr", "type", state);
    });
  });

  describe("verify Switch component for event tests", () => {
    it("should call onChange callback when a click event is triggered", () => {
      const callback: SwitchProps["onChange"] = cy.stub().as("onChange");
      CypressMountWithProviders(<SwitchComponent onChange={callback} />);

      switchInput().click();
      cy.get("@onChange").should("have.been.calledOnce");
    });

    // skipped because of https://jira.sage.com/browse/FE-5534
    it.skip("should call onChange callback when a keyboard event is triggered", () => {
      const callback: SwitchProps["onChange"] = cy.stub().as("onChange");
      CypressMountWithProviders(
        <SwitchComponent autoFocus onChange={callback} />
      );

      switchInput().focus().trigger("keydown", keyCode("Space"));
      cy.get("@onChange").should("have.been.calledOnce");
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      const callback: SwitchProps["onBlur"] = cy.stub().as("onBlur");
      CypressMountWithProviders(<SwitchComponent onBlur={callback} />);

      switchInput().focus().blur({ force: true });
      cy.get("@onBlur").should("have.been.calledOnce");
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      const callback: SwitchProps["onFocus"] = cy.stub().as("onFocus");
      CypressMountWithProviders(<SwitchComponent onFocus={callback} />);

      switchInput().focus();
      cy.get("@onFocus").should("have.been.calledOnce");
    });

    it("should call onClick callback when a click event is triggered", () => {
      const callback: SwitchProps["onClick"] = cy.stub().as("onClick");
      CypressMountWithProviders(<SwitchComponent onClick={callback} />);

      switchInput().click();
      cy.get("@onClick").should("have.been.calledOnce");
    });
  });

  describe("Accessibility tests for Switch", () => {
    it.each([
      CHARACTERS.STANDARD,
      CHARACTERS.DIACRITICS,
      CHARACTERS.SPECIALCHARACTERS,
    ])(
      "check Switch component accessibility with %s as fieldHelp",
      (fieldHelp) => {
        CypressMountWithProviders(<SwitchComponent fieldHelp={fieldHelp} />);

        cy.checkAccessibility();
      }
    );

    it.each([
      CHARACTERS.STANDARD,
      CHARACTERS.DIACRITICS,
      CHARACTERS.SPECIALCHARACTERS,
    ])("check Switch component accessibility with %s as a label", (label) => {
      CypressMountWithProviders(<SwitchComponent label={label} />);

      cy.checkAccessibility();
    });

    it.each([true, false])(
      "check Switch component accessibility with loading prop %s",
      (boolVal) => {
        CypressMountWithProviders(<SwitchComponent loading={boolVal} />);

        cy.checkAccessibility();
      }
    );

    it("check Switch component accessibility with data-component", () => {
      CypressMountWithProviders(
        <SwitchComponent data-component={CHARACTERS.STANDARD} />
      );

      cy.checkAccessibility();
    });

    it("check Switch component accessibility with data-element", () => {
      CypressMountWithProviders(
        <SwitchComponent data-element={CHARACTERS.STANDARD} />
      );

      cy.checkAccessibility();
    });

    it("check Switch component accessibility with data-role", () => {
      CypressMountWithProviders(
        <SwitchComponent data-role={CHARACTERS.STANDARD} />
      );

      cy.checkAccessibility();
    });

    it("check Switch component accessibility with autoFocus", () => {
      CypressMountWithProviders(<SwitchComponent autoFocus />);

      cy.checkAccessibility();
    });

    it.each([true, false])(
      "check Switch component accessibility with checked state set to %s",
      (boolVal) => {
        CypressMountWithProviders(<SwitchComponent checked={boolVal} />);

        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "check Switch component accessibility with disabled prop %s",
      (boolVal) => {
        CypressMountWithProviders(<SwitchComponent disabled={boolVal} />);

        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "check Switch component accessibility with inline fieldHelp is %s",
      (boolVal) => {
        CypressMountWithProviders(
          <SwitchComponent
            fieldHelp="Inline fieldhelp"
            fieldHelpInline={boolVal}
          />
        );

        cy.checkAccessibility();
      }
    );

    it("check Switch component accessibility with id", () => {
      CypressMountWithProviders(<SwitchComponent id={CHARACTERS.STANDARD} />);

      cy.checkAccessibility();
    });

    it.each([true, false])(
      "check Switch component accessibility with labelInline prop %s",
      (boolVal) => {
        CypressMountWithProviders(<SwitchComponent labelInline={boolVal} />);

        cy.checkAccessibility();
      }
    );

    it.each([10, 30, 80] as SwitchProps["labelWidth"][])(
      "check Switch component accessibility with labelWidth %s",
      (labelWidth) => {
        CypressMountWithProviders(<SwitchComponent labelWidth={labelWidth} />);

        cy.checkAccessibility();
      }
    );

    it.each([90, 70, 20] as SwitchProps["inputWidth"][])(
      "check Switch component accessibility with inputWidth %s",
      (inputWidth) => {
        CypressMountWithProviders(
          <SwitchComponent labelInline inputWidth={inputWidth} />
        );

        cy.checkAccessibility();
      }
    );

    it("check Switch component accessibility with labelAlign to right", () => {
      CypressMountWithProviders(<SwitchComponent labelAlign="right" />);

      cy.checkAccessibility();
    });

    it("check Switch component accessibility with labelHelp", () => {
      CypressMountWithProviders(
        <SwitchComponent label="Label For Switch" labelHelp="Label Help" />
      );

      cy.checkAccessibility();
    });

    it.each([1, 2] as SwitchProps["labelSpacing"][])(
      "check Switch component accessibility with labelSpacing %s",
      (spacing) => {
        CypressMountWithProviders(
          <SwitchComponent labelInline label="label" labelSpacing={spacing} />
        );

        cy.checkAccessibility();
      }
    );

    it("check Switch component accessibility with name", () => {
      CypressMountWithProviders(<SwitchComponent name={CHARACTERS.STANDARD} />);

      cy.checkAccessibility();
    });

    it("check Switch component accessibility with validation", () => {
      CypressMountWithProviders(<SwitchComponentValidations />);

      cy.checkAccessibility();
    });

    it("check Switch component accessibility with validation on label", () => {
      CypressMountWithProviders(
        <SwitchComponentValidations validationOnLabel />
      );

      cy.checkAccessibility();
    });

    it.each(validationTypes)(
      "should check accessibility for Switch and set type to %s as string",
      (type) => {
        CypressMountWithProviders(
          <SwitchComponent {...{ [type]: "Message" }} />
        );

        cy.checkAccessibility();
      }
    );

    it.each([
      "top",
      "bottom",
      "left",
      "right",
    ] as SwitchProps["tooltipPosition"][])(
      "should check accessibility for Switch with the tooltip in the %s position",
      (tooltipPositionValue) => {
        CypressMountWithProviders(
          <Box width="700px" height="108px">
            <div
              style={{
                padding: "100px",
              }}
            >
              <SwitchComponent
                error={testCypress}
                tooltipPosition={tooltipPositionValue}
              />
            </div>
          </Box>
        );

        cy.checkAccessibility();
      }
    );

    it.each([true, false])(
      "check Switch component accessibility reverse set to %s",
      (boolVal) => {
        CypressMountWithProviders(<SwitchComponent reverse={boolVal} />);

        cy.checkAccessibility();
      }
    );

    it.each([SIZE.SMALL, SIZE.LARGE] as SwitchProps["size"][])(
      "check Switch component accessibility with size set to %s",
      (size) => {
        CypressMountWithProviders(<SwitchComponent size={size} />);

        cy.checkAccessibility();
      }
    );

    it("check Switch component accessibility with value prop", () => {
      CypressMountWithProviders(<SwitchComponent value="switchvalue" />);

      cy.checkAccessibility();
    });

    it.each([399, 400, 401])(
      "check Switch component accessibility when label is inline with adaptiveLabelBreakpoint %s",
      (breakpoint) => {
        cy.viewport(400, 300);

        CypressMountWithProviders(
          <SwitchComponent labelInline adaptiveLabelBreakpoint={breakpoint} />
        );

        cy.checkAccessibility();
      }
    );

    it("check Switch component accessibility as a required field", () => {
      CypressMountWithProviders(<SwitchComponent required />);

      cy.checkAccessibility();
    });

    it.each([
      "bottom",
      "left",
      "right",
      "top",
    ] as SwitchProps["tooltipPosition"][])(
      "check Switch component accessibility with tooltip positioned to the %s",
      (position) => {
        CypressMountWithProviders(
          <Box m="250px">
            <SwitchComponent
              labelHelp="Switch info"
              tooltipPosition={position}
            />
          </Box>
        );

        cy.checkAccessibility();
      }
    );

    it("check Switch component accessibility with helpAriaLabel", () => {
      CypressMountWithProviders(
        <SwitchComponent
          labelHelp="Label Help"
          helpAriaLabel="This text provides more information for the label"
        />
      );

      cy.checkAccessibility();
    });

    it.each([true, false])(
      "check Switch component accessibility with defaultChecked %s",
      (boolVal) => {
        CypressMountWithProviders(
          <Switch label="Label" name="switch-name" defaultChecked={boolVal} />
        );

        cy.checkAccessibility();
      }
    );

    it.each(validationTypes)(
      "should check accessibility for Switch and set type to %s as boolean",
      (type) => {
        CypressMountWithProviders(<SwitchComponent {...{ [type]: true }} />);

        cy.checkAccessibility();
      }
    );

    it("check Switch component accessibility with Margin", () => {
      CypressMountWithProviders(<WithMargin />);

      cy.checkAccessibility();
    });
  });

  it("renders with the expected border radius", () => {
    CypressMountWithProviders(<SwitchComponent />);

    switchDataComponent()
      .find("div > div > div > div > span")
      .should("have.css", "border-radius", "32px");
  });
});
