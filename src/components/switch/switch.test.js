import React from "react";
import Box from "../box";
import Switch from "./switch.component";
import {
  switchDataComponent,
  switchInput,
  switchLabel,
  switchIcon,
  switchHelpIcon,
  switchLoading,
} from "../../../cypress/locators/switch/index";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  getComponent,
  fieldHelpPreview,
  tooltipPreview,
  getDataElementByValue,
} from "../../../cypress/locators/index";
import { keyCode } from "../../../cypress/support/helper";
import {
  useJQueryCssValueAndAssert,
  verifyRequiredAsteriskForLabel,
} from "../../../cypress/support/component-helper/common-steps";
import {
  CHARACTERS,
  VALIDATION,
  SIZE,
} from "../../../cypress/support/component-helper/constants";
import { ICON } from "../../../cypress/locators/locators";

const verifyBorderColor = (element, color) =>
  element.then(($els) => {
    // get Window reference from element
    const win = $els[0].ownerDocument.defaultView;
    // use getComputedStyle to read the pseudo selector
    const after = win.getComputedStyle($els[0], "before");
    // read the value of the `content` CSS property
    const contentValue = after.getPropertyValue("color");
    // the returned value will have double quotes around it, but this is correct
    expect(contentValue).to.eq(color);
  });

const SwitchComponent = ({ ...props }) => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <>
      <div
        style={{
          marginTop: "64px",
          marginLeft: "64px",
        }}
      >
        <Switch
          label="Label"
          name="switch-name"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          {...props}
        />
      </div>
    </>
  );
};

const SwitchComponentValidations = ({ ...props }) => {
  const [setIsChecked] = React.useState(false);
  return ["error", "warning", "info"].map((type) => (
    <Switch
      id={`switch${type}`}
      key={`switch-${type}`}
      {...{ [type]: `${type}` }}
      label={`Example switch (${type})`}
      name={`switch-${type}`}
      onChange={() => setIsChecked((state) => !state)}
      {...props}
    />
  ));
};

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
            useJQueryCssValueAndAssert($el, "height", height);
            useJQueryCssValueAndAssert($el, "margin-bottom", margin);
            useJQueryCssValueAndAssert($el, "padding-right", padding);
          });
      }
    );

    it.each([
      ["10", 130],
      ["30", 390],
      ["80", 1041],
    ])(
      "verify Switch with labelWidth %s and render it with correct label width ratio",
      (labelWidth, labelRatio) => {
        CypressMountWithProviders(<SwitchComponent labelWidth={labelWidth} />);

        switchLabel()
          .parent()
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", labelRatio);
          });
      }
    );

    it.each([
      ["90", 1171],
      ["70", 911],
      ["20", 260],
    ])(
      "verify Switch with inputWidth %s and render it with correct input width ratio",
      (inputWidth, inputRatio) => {
        CypressMountWithProviders(
          <SwitchComponent labelInline inputWidth={inputWidth} />
        );

        switchInput()
          .parent()
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", inputRatio);
          });
      }
    );

    // skipped because of https://jira.sage.com/browse/FE-5530
    it.skip("verify Switch component with labelAlign %s", () => {
      CypressMountWithProviders(<SwitchComponent labelAlign="right" />);

      switchLabel().parent().should("have.css", "align-items", "right");
    });

    it("verify Checkbox component with labelHelp", () => {
      CypressMountWithProviders(
        <SwitchComponent label="Label For Switch" labelHelp="Label Help" />
      );

      switchIcon().trigger("mouseover");
      tooltipPreview().should("have.text", "Label Help");
    });

    it.each([
      [1, 8],
      [2, 17],
    ])("verify Switch component with labelSpacing %s", (spacing, padding) => {
      CypressMountWithProviders(
        <SwitchComponent labelInline label="label" labelSpacing={spacing} />
      );

      switchLabel()
        .parent()
        .then(($el) => {
          useJQueryCssValueAndAssert($el, "padding-right", padding);
        });
    });

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
      [true, 1, "have.attr", "not.have.attr"],
      [false, 0, "not.have.attr", "have.attr"],
    ])(
      "verify Switch component reverse set to %s",
      (boolVal, position, condition1, condition2) => {
        CypressMountWithProviders(<SwitchComponent reverse={boolVal} />);

        switchDataComponent()
          .children()
          .children()
          .children()
          .children(position)
          .children()
          .should(condition1, "data-element", "label")
          .and(condition2, "role", "switch");
      }
    );

    it.each([
      [SIZE.SMALL, 60, 24],
      [SIZE.LARGE, 78, 40],
    ])("verify Switch component with size set to %s", (size, width, height) => {
      CypressMountWithProviders(<SwitchComponent size={size} />);

      switchInput().then(($el) => {
        useJQueryCssValueAndAssert($el, "height", height);
        useJQueryCssValueAndAssert($el, "width", width);
      });
    });

    it("verify Switch component with value prop", () => {
      CypressMountWithProviders(<SwitchComponent value="switchvalue" />);
      switchInput().should("have.value", "switchvalue");
    });

    it.each([
      ["inline", 399, "have.css", 24],
      ["inline", 400, "have.css", 24],
      ["not inline", 401, "not.have.css", 16],
    ])(
      "check Switch label is %s with adaptiveLabelBreakpoint %s and viewport 400",
      (displayValue, breakpoint, attribute, height) => {
        cy.viewport(400, 300);

        CypressMountWithProviders(
          <SwitchComponent labelInline adaptiveLabelBreakpoint={breakpoint} />
        );

        switchLabel()
          .parent()
          .should(attribute, "box-sizing", "border-box")
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "height", height);
          });
      }
    );

    it("verify Switch component as a required field", () => {
      CypressMountWithProviders(<SwitchComponent required />);

      verifyRequiredAsteriskForLabel();
    });

    it.each(["bottom", "left", "right", "top"])(
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
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onChange callback when a click event is triggered", () => {
      CypressMountWithProviders(<SwitchComponent onChange={callback} />);

      switchInput()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    // skipped because of https://jira.sage.com/browse/FE-5534
    it.skip("should call onChange callback when a keyboard event is triggered", () => {
      CypressMountWithProviders(
        <SwitchComponent autoFocus onChange={callback} />
      );

      switchInput()
        .focus()
        .trigger("keydown", keyCode("Space"))
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<SwitchComponent onBlur={callback} />);

      switchInput()
        .focus()
        .blur({ force: true })
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      CypressMountWithProviders(<SwitchComponent onFocus={callback} />);

      switchInput()
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClick callback when a click event is triggered", () => {
      CypressMountWithProviders(<SwitchComponent onClick={callback} />);

      switchInput()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });
  });
});
