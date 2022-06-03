/* eslint-disable no-shadow */
import * as React from "react";
import Checkbox from "./checkbox.component";
import CheckboxGroup from "./checkbox-group.component";
import Form from "../form";
import {
  checkboxRole,
  checkboxGroup,
} from "../../../cypress/locators/checkbox";
import {
  label,
  legend,
  fieldHelpPreview,
  getDataElementByValue,
  getComponent,
  tooltipPreview,
  helpIcon,
  icon,
  errorIcon,
  warningIcon,
  infoIcon,
} from "../../../cypress/locators/index";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { verifyRequiredAsterisk } from "../../../cypress/support/component-helper/common-steps";

const specialCharacters = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];
const testData = "cypress_data";

const CheckboxComponent = ({ children, ...props }) => {
  const [setIsChecked] = React.useState(false);
  return (
    <>
      <div
        style={{
          marginTop: "64px",
        }}
      >
        <Checkbox
          label="Checkbox 1"
          checked={() => setIsChecked(false)}
          onChange={(e) => setIsChecked(e.target.checked)}
          {...props}
        />
      </div>
    </>
  );
};

const CheckboxGroupComponent = ({ children, ...props }) => {
  const checkboxGroupName = "checkboxGroupName";
  const [setIsChecked] = React.useState(false);
  return (
    <div
      style={{
        marginTop: "64px",
        marginLeft: "64px",
      }}
    >
      <CheckboxGroup
        id="checkboxgroup"
        name="checkboxgroup"
        groupName="{checkboxGroupName} "
        legend="Test CheckboxGroup Label"
        {...props}
      >
        <Checkbox
          label="Required"
          id={`checkbox_${checkboxGroupName}-Required`}
          key={`checkbox_${checkboxGroupName}-Required`}
          name={`checkbox_${checkboxGroupName}-Required`}
          checked={() => setIsChecked(false)}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <Checkbox
          label="Optional"
          id={`checkbox_${checkboxGroupName}-Optional`}
          key={`checkbox_${checkboxGroupName}-Optional`}
          name={`checkbox_${checkboxGroupName}-Optional`}
          checked={() => setIsChecked(false)}
          onChange={(e) => setIsChecked(e.target.checked)}
        />

        <Form>{children}</Form>
      </CheckboxGroup>
    </div>
  );
};

context("Testing Checkbox component", () => {
  describe("Should render Checkbox component", () => {
    it("should render Checkbox component with data-component", () => {
      CypressMountWithProviders(
        <CheckboxComponent data-component={testData} />
      );
      getComponent(testData).should("exist");
    });

    it("should render Checkbox component with data-element", () => {
      CypressMountWithProviders(<CheckboxComponent data-element={testData} />);
      getDataElementByValue(testData).should("exist");
    });

    it("should render Checkbox component with data-role", () => {
      CypressMountWithProviders(<CheckboxComponent data-role={testData} />);
      cy.get(`[data-role=${testData}]`).should("exist");
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
  });

  it.each(specialCharacters)(
    "should render Checkbox component with %s as a label",
    (checkboxLabel) => {
      CypressMountWithProviders(<CheckboxComponent label={checkboxLabel} />);

      label().should("have.text", checkboxLabel);
    }
  );

  it.each(specialCharacters)(
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

    cy.get(
      "[data-component=checkbox] > div:nth-child(1) > div > div > span"
    ).should("have.text", "Inline fieldhelp");
  });

  it("should render Checkbox component with helpAriaLabel", () => {
    CypressMountWithProviders(
      <CheckboxComponent
        label="Label For CheckBox"
        labelHelp="Label Help"
        helpAriaLabel="This text provides more information for the label"
      />
    );

    icon().trigger("mouseover");
    helpIcon()
      .should("have.attr", "aria-label")
      .and("contain", "This text provides more information for the label");
  });

  it.each([
    [true, "be.disabled"],
    [false, "not.be.disabled"],
  ])(
    "should render Checkbox component with disabled prop set to %s",
    (booleanValue, assertion) => {
      CypressMountWithProviders(<CheckboxComponent disabled={booleanValue} />);
      checkboxRole().should(assertion);
    }
  );

  it("should render Checkbox component with id", () => {
    CypressMountWithProviders(
      <CheckboxComponent id="f62d5e6e-248c-4b04-ae51-f7fab5bd93a3" />
    );
    checkboxRole().should("have.id", "f62d5e6e-248c-4b04-ae51-f7fab5bd93a3");
  });

  it("should render Checkbox component with name", () => {
    CypressMountWithProviders(<CheckboxComponent name="confirm permission" />);
    checkboxRole().should("have.attr", "name", "confirm permission");
  });

  it("should render Checkbox component with value prop", () => {
    CypressMountWithProviders(<CheckboxComponent value="checkboxvalue" />);
    checkboxRole().should("have.value", "checkboxvalue");
  });

  it.each([
    ["small", "16"],
    ["large", "24"],
  ])("should render Checkbox component with size set to %s", (size, width) => {
    CypressMountWithProviders(<CheckboxComponent size={size} />);
    checkboxRole().should("have.css", "height").and("contain", `${width}px`);
    checkboxRole().should("have.css", "width").and("contain", `${width}px`);
  });

  it.each([
    [1, "8px"],
    [2, "16px"],
  ])(
    "should render Checkbox component with %s as labelSpacing",
    (spacing, padding) => {
      CypressMountWithProviders(<CheckboxComponent labelSpacing={spacing} />);

      label().parent().should("have.css", "padding-left", padding);
    }
  );

  it.each([
    ["10", "90", "135px", "1215px"],
    ["30", "70", "405px", "945px"],
    ["80", "20", "1080px", "270px"],
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

      label().parent().should("have.css", "width", labelRatio);
      checkboxRole().parent().should("have.css", "width", inputRatio);
    }
  );

  it("should render Checkbox component as a required field", () => {
    CypressMountWithProviders(
      <CheckboxComponent label="Required Checkbox" required />
    );
    verifyRequiredAsterisk("Required Checkbox");
  });

  it("should render Checkbox component with autoFocus", () => {
    CypressMountWithProviders(<CheckboxComponent autoFocus />);
    checkboxRole().should("be.focused");
  });

  it("should render Checkbox component with error ", () => {
    CypressMountWithProviders(<CheckboxComponent error />);

    cy.get("svg").should("have.css", "border-bottom-color", "rgb(205, 56, 75)");
  });

  it("should render Checkbox component with warning ", () => {
    CypressMountWithProviders(<CheckboxComponent warning />);

    cy.get("svg").should("have.css", "border-bottom-color", "rgb(239, 103, 0)");
  });

  it("should render Checkbox component with info ", () => {
    CypressMountWithProviders(<CheckboxComponent info />);

    cy.get("svg").should("have.css", "border-bottom-color", "rgb(0, 96, 167)");
  });

  it("should render Checkbox component with error message ", () => {
    CypressMountWithProviders(<CheckboxComponent error="Error has occurred" />);

    errorIcon()
      .should("exist")
      .should("have.attr", "aria-label")
      .and("contain", "Error has occurred");
  });

  it("should render Checkbox component with warning message", () => {
    CypressMountWithProviders(
      <CheckboxComponent warning="Warning has occurred" />
    );

    warningIcon()
      .should("exist")
      .should("have.attr", "aria-label")
      .and("contain", "Warning has occurred");
  });

  it("should render Checkbox component with info message", () => {
    CypressMountWithProviders(<CheckboxComponent info="Info has occurred" />);

    infoIcon()
      .should("exist")
      .should("have.attr", "aria-label")
      .and("contain", "Info has occurred");
  });

  it.each([
    [true, "0"],
    [false, "1"],
  ])(
    "should render Checkbox with reverse prop set to %s",
    (reverseValue, position) => {
      CypressMountWithProviders(
        <CheckboxComponent label="Checkbox Label" reverse={reverseValue} />
      );
      cy.get(
        "[data-component=checkbox] > div:nth-child(1) > div > div:nth-child(1)"
      )
        .children()
        .eq(position)
        .should("have.text", "Checkbox Label");
    }
  );

  it.each(["bottom", "left", "right", "top"])(
    "should render CheckboxComponent component with tooltip positioned to the %s",
    (position) => {
      CypressMountWithProviders(
        <CheckboxComponent
          labelHelp="Tooltip info"
          tooltipPosition={position}
        />
      );
      getComponent("icon").trigger("mouseover");
      tooltipPreview()
        .should("have.text", "Tooltip info")
        .should("have.attr", "data-placement", `${position}`);
    }
  );

  it("should render Checkbox component with tick color set to rgb(0, 0, 0)", () => {
    CypressMountWithProviders(<CheckboxComponent checked />);
    checkboxRole()
      .should("be.checked")
      .should("have.css", "color", "rgb(0, 0, 0)");
  });

  describe("should render CheckBox component and check events", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<CheckboxComponent onBlur={callback} />);

      checkboxRole()
        .focus()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onChange callback when an onChange event is triggered", () => {
      CypressMountWithProviders(<CheckboxComponent onChange={callback} />);

      checkboxRole()
        .check()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      CypressMountWithProviders(<CheckboxComponent onFocus={callback} />);

      checkboxRole()
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClick callback when a click event is triggered", () => {
      CypressMountWithProviders(<CheckboxComponent onClick={callback} />);

      checkboxRole()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    describe("Testing CheckboxGroup component", () => {
      it.each(specialCharacters)(
        "should render CheckboxGroup component with %s as legend",
        (legendValue) => {
          CypressMountWithProviders(
            <CheckboxGroupComponent legend={legendValue} />
          );
          legend().should("have.text", legendValue);
        }
      );

      it("should render CheckboxGroup component with error ", () => {
        CypressMountWithProviders(<CheckboxGroupComponent error />);

        cy.get("svg").should(
          "have.css",
          "border-bottom-color",
          "rgb(205, 56, 75)"
        );
      });

      it("should render CheckboxGroup component with warning ", () => {
        CypressMountWithProviders(<CheckboxGroupComponent warning />);

        cy.get("svg").should(
          "have.css",
          "border-bottom-color",
          "rgb(239, 103, 0)"
        );
      });

      it("should render CheckboxGroup component with info ", () => {
        CypressMountWithProviders(<CheckboxGroupComponent info />);

        cy.get("svg").should(
          "have.css",
          "border-bottom-color",
          "rgb(0, 96, 167)"
        );
      });

      it("should render CheckboxGroup component with error message ", () => {
        CypressMountWithProviders(
          <CheckboxGroupComponent error="Error has occurred" />
        );

        errorIcon()
          .should("exist")
          .should("have.attr", "aria-label")
          .and("contain", "Error has occurred");
      });

      it("should render CheckboxGroup component with warning message", () => {
        CypressMountWithProviders(
          <CheckboxGroupComponent warning="Warning has occurred" />
        );

        warningIcon()
          .should("exist")
          .should("have.attr", "aria-label")
          .and("contain", "Warning has occurred");
      });

      it("should render CheckboxGroup component with info message", () => {
        CypressMountWithProviders(
          <CheckboxGroupComponent info="Info has occurred" />
        );

        infoIcon()
          .should("exist")
          .should("have.attr", "aria-label")
          .and("contain", "Info has occurred");
      });

      it("should render CheckboxGroup component with groupName", () => {
        CypressMountWithProviders(<CheckboxGroupComponent />);

        checkboxRole()
          .eq(0)
          .should("have.attr", "name", "checkbox_checkboxGroupName-Required");
      });

      it.each([
        ["left", "flex-start"],
        ["right", "flex-end"],
      ])(
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
          legend().should("have.css", "justify-content", assertion);
        }
      );

      it.each([20, 40])(
        "should render CheckboxGroup component with inline legend width set to %s ",
        (width) => {
          CypressMountWithProviders(
            <CheckboxGroupComponent
              legend="CheckBox Legend"
              legendWidth={width}
              legendInline
            />
          );
          legend().should("have.attr", "width", width);
        }
      );

      it("should render CheckboxGroup component with children ", () => {
        CypressMountWithProviders(
          <CheckboxGroupComponent>
            <span>Child 1</span>
            <span>Child 2</span>
          </CheckboxGroupComponent>
        );
        checkboxGroup()
          .should("contain.text", "Child 1")
          .should("contain.text", "Child 2");
      });

      it.each([
        [1, "8px"],
        [2, "16px"],
      ])(
        "should render CheckboxGroup component with legendSpacing set to %s ",
        (spacing, padding) => {
          CypressMountWithProviders(
            <CheckboxGroupComponent
              legend="AVeryVeryLongLegend"
              legendSpacing={spacing}
              legendWidth="10"
              legendInline
            />
          );
          legend().should("have.css", "padding-right", padding);
        }
      );

      it.each(["top", "bottom", "left", "right"])(
        "should render CheckboxGroupComponent component with tooltip positioned to the %s",
        (position) => {
          CypressMountWithProviders(
            <CheckboxGroupComponent
              legend="Checkbox Legend"
              error="Something is wrong"
              tooltipPosition={position}
            />
          );
          getComponent("icon").trigger("mouseover");
          tooltipPreview()
            .should("have.text", "Something is wrong")
            .should("have.attr", "data-placement", position);
        }
      );

      it("should render CheckboxGroup component as a required field", () => {
        CypressMountWithProviders(
          <CheckboxGroupComponent legend="Required CheckboxGroup" required />
        );

        verifyRequiredAsterisk("Required CheckboxGroup");
      });
    });
  });
});
