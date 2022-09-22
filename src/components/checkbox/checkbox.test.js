/* eslint-disable no-shadow */
import * as React from "react";
import Checkbox from "./checkbox.component";
import CheckboxGroup from "./checkbox-group.component";
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
} from "../../../cypress/locators/checkbox";
import {
  fieldHelpPreview,
  getComponent,
  tooltipPreview,
} from "../../../cypress/locators/index";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  verifyRequiredAsteriskForLegend,
  verifyRequiredAsteriskForLabel,
} from "../../../cypress/support/component-helper/common-steps";

const specialCharacters = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];
const testData = "cypress_data";

const CheckboxComponent = ({ ...props }) => {
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
        legend="Test CheckboxGroup Label"
        {...props}
      >
        <Checkbox
          label="Required"
          id="checkbox-Required"
          key="checkbox-Required"
          name="checkbox-Required"
          checked={() => setIsChecked(false)}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <Checkbox
          label="Optional"
          id="checkbox-Required"
          key="checkbox-Required"
          name="checkbox-Required"
          checked={() => setIsChecked(false)}
          onChange={(e) => setIsChecked(e.target.checked)}
        />

        {children}
      </CheckboxGroup>
    </div>
  );
};

context("Testing Checkbox component", () => {
  describe("should render Checkbox component", () => {
    it("should render Checkbox component with data-component", () => {
      CypressMountWithProviders(
        <CheckboxComponent data-component={testData} />
      );
      getComponent(testData).should("have.attr", "data-component", testData);
    });

    it("should render Checkbox component with data-element", () => {
      CypressMountWithProviders(<CheckboxComponent data-element={testData} />);
      checkboxComponent().should("have.attr", "data-element", testData);
    });

    it("should render Checkbox component with data-role", () => {
      CypressMountWithProviders(<CheckboxComponent data-role={testData} />);
      checkboxComponent().should("have.attr", "data-role", testData);
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
    (label) => {
      CypressMountWithProviders(<CheckboxComponent label={label} />);

      checkboxLabel().should("have.text", label);
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
      CypressMountWithProviders(<CheckboxComponent disabled={booleanValue} />);
      checkboxRole().should(assertion);
    }
  );

  it("should render Checkbox component with id", () => {
    CypressMountWithProviders(<CheckboxComponent id={testData} />);
    checkboxRole().should("have.id", testData);
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
    checkboxRole().should("have.css", "height", `${width}px`);
    checkboxRole().should("have.css", "width", `${width}px`);
  });

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

      checkboxLabel().parent().should("have.css", "width", labelRatio);
      checkboxRole().parent().should("have.css", "width", inputRatio);
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

    checkboxSvg().should("have.css", "border-bottom-color", "rgb(203, 55, 74)");
  });

  it("should render Checkbox component with warning", () => {
    CypressMountWithProviders(<CheckboxComponent warning />);

    checkboxSvg().should("have.css", "border-bottom-color", "rgb(239, 103, 0)");
  });

  it("should render Checkbox component with info", () => {
    CypressMountWithProviders(<CheckboxComponent info />);

    checkboxSvg().should("have.css", "border-bottom-color", "rgb(0, 96, 167)");
  });

  it("should render Checkbox component with error message", () => {
    CypressMountWithProviders(<CheckboxComponent error="Error has occurred" />);

    checkboxIcon()
      .should("have.attr", "aria-label", "Error has occurred")
      .should("have.attr", "data-element", "error");
  });

  it("should render Checkbox component with warning message", () => {
    CypressMountWithProviders(
      <CheckboxComponent warning="Warning has occurred" />
    );

    checkboxIcon()
      .should("have.attr", "aria-label", "Warning has occurred")
      .should("have.attr", "data-element", "warning");
  });

  it("should render Checkbox component with info message", () => {
    CypressMountWithProviders(<CheckboxComponent info="Info has occurred" />);

    checkboxIcon()
      .should("have.attr", "aria-label", "Info has occurred")
      .should("have.attr", "data-element", "info");
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
        <CheckboxComponent
          labelHelp="Tooltip info"
          tooltipPosition={position}
        />
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

    it("should call onChange callback when a check event is triggered", () => {
      CypressMountWithProviders(<CheckboxComponent onChange={callback} />);

      checkboxRole()
        .check()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onChange callback when an uncheck event is triggered", () => {
      CypressMountWithProviders(
        <CheckboxComponent checked onChange={callback} />
      );

      checkboxRole()
        .uncheck()
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
          checkboxgroupLegend().should("have.text", legendValue);
        }
      );

      it("should render CheckboxGroup component with error", () => {
        CypressMountWithProviders(<CheckboxGroupComponent error />);

        checkboxSvg().should(
          "have.css",
          "border-bottom-color",
          "rgb(203, 55, 74)"
        );
      });

      it("should render CheckboxGroup component with warning", () => {
        CypressMountWithProviders(<CheckboxGroupComponent warning />);

        checkboxSvg().should(
          "have.css",
          "border-bottom-color",
          "rgb(239, 103, 0)"
        );
      });

      it("should render CheckboxGroup component with info", () => {
        CypressMountWithProviders(<CheckboxGroupComponent info />);

        checkboxSvg().should(
          "have.css",
          "border-bottom-color",
          "rgb(0, 96, 167)"
        );
      });

      it("should render CheckboxGroup component with error message", () => {
        CypressMountWithProviders(
          <CheckboxGroupComponent error="Error has occurred" />
        );

        checkboxGroupIcon()
          .should("have.attr", "aria-label", "Error has occurred")
          .should("have.attr", "data-element", "error");
      });

      it("should render CheckboxGroup component with warning message", () => {
        CypressMountWithProviders(
          <CheckboxGroupComponent warning="Warning has occurred" />
        );

        checkboxGroupIcon()
          .should("have.attr", "aria-label", "Warning has occurred")
          .should("have.attr", "data-element", "warning");
      });

      it("should render CheckboxGroup component with info message", () => {
        CypressMountWithProviders(
          <CheckboxGroupComponent info="Info has occurred" />
        );

        checkboxGroupIcon()
          .should("have.attr", "aria-label", "Info has occurred")
          .should("have.attr", "data-element", "info");
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
          checkboxgroupLegend().should(
            "have.css",
            "justify-content",
            assertion
          );
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
              id="checkbox_id-three"
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
      ])(
        "should render CheckboxGroup component with legendSpacing set to %s",
        (spacing, padding) => {
          CypressMountWithProviders(
            <CheckboxGroupComponent
              legend="AVeryVeryLongLegend"
              legendSpacing={spacing}
              legendWidth="10"
              legendInline
            />
          );
          checkboxgroupLegend().should("have.css", "padding-right", padding);
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
    });
  });
});
