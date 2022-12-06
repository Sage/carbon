import React from "react";
import RadioButton from "./radio-button.component";
import RadioButtonGroup from "./radio-button-group.component";
import {
  SIZE,
  VALIDATION,
  COLOR,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";
import {
  radiobuttonGroup,
  radiobuttonComponent,
  radiobuttonLabel,
  radiobuttonInlineFieldHelp,
  radiobuttonHelpIcon,
  radiobuttonIcon,
  radiobuttonSvg,
  radiobuttonGroupLegend,
  radiobuttonGroupIcon,
  radiobuttonRole,
  radiobutton,
} from "../../../cypress/locators/radiobutton";

import {
  fieldHelpPreview,
  getComponent,
  tooltipPreview,
} from "../../../cypress/locators/index";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  useJQueryCssValueAndAssert,
  verifyRequiredAsteriskForLegend,
} from "../../../cypress/support/component-helper/common-steps";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const radioContainerWidth = 400;
const radioInputWidth = 16;
const labelContainerWidth = 40;

const RadiobuttonComponent = ({ ...props }) => {
  const [setIsChecked] = React.useState(false);
  return (
    <>
      <div
        style={{
          marginTop: "64px",
          marginLeft: "64px",
          width: radioContainerWidth,
        }}
      >
        <RadioButton
          id="radio-1"
          value="radio1"
          label="Radiobutton 1"
          checked={() => setIsChecked(false)}
          onChange={(e) => setIsChecked(e.target.checked)}
          {...props}
        />
      </div>
    </>
  );
};

const RadiobuttonGroupComponent = ({ children, ...props }) => {
  return (
    <div
      style={{
        marginTop: "64px",
        marginLeft: "64px",
      }}
    >
      <RadioButtonGroup
        name="radiobuttongroup"
        legend="Radio group legend"
        {...props}
      >
        <RadioButton id="radio-1" value="radio1" label="Yes" />
        <RadioButton id="radio-2" value="radio2" label="No" />
        <RadioButton id="radio-3" value="radio3" label="Maybe" />

        <>{children}</>
      </RadioButtonGroup>
    </div>
  );
};

context("Testing RadioButton component", () => {
  describe("should render RadioButton component", () => {
    it("should render Radiobutton component with data-component", () => {
      CypressMountWithProviders(
        <RadiobuttonComponent data-component={CHARACTERS.STANDARD} />
      );
      getComponent(CHARACTERS.STANDARD).should(
        "have.attr",
        "data-component",
        CHARACTERS.STANDARD
      );
    });

    it("should render Radiobutton component with data-element", () => {
      CypressMountWithProviders(
        <RadiobuttonComponent data-element={CHARACTERS.STANDARD} />
      );
      radiobuttonComponent().should(
        "have.attr",
        "data-element",
        CHARACTERS.STANDARD
      );
    });

    it("should render Radiobutton component with data-role", () => {
      CypressMountWithProviders(
        <RadiobuttonComponent data-role={CHARACTERS.STANDARD} />
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
      "should render Radiobutton component with checked state set to %s",
      (booleanValue, assertion) => {
        CypressMountWithProviders(
          <RadiobuttonComponent checked={booleanValue} />
        );
        radiobuttonRole().should(assertion);
      }
    );
  });

  it.each(testData)(
    "should render Radiobutton component with %s as a label",
    (label) => {
      CypressMountWithProviders(<RadiobuttonComponent label={label} />);

      radiobuttonLabel().should("have.text", label);
    }
  );

  it.each(testData)(
    "should render Radiobutton component with %s as fieldHelp",
    (fieldHelp) => {
      CypressMountWithProviders(<RadiobuttonComponent fieldHelp={fieldHelp} />);

      fieldHelpPreview().should("have.text", fieldHelp);
    }
  );

  it("should render Radiobutton component with inline fieldHelp", () => {
    CypressMountWithProviders(
      <RadiobuttonComponent fieldHelp="Inline fieldhelp" fieldHelpInline />
    );

    radiobuttonInlineFieldHelp().should("have.text", "Inline fieldhelp");
  });

  it("should render Radiobutton component with helpAriaLabel", () => {
    CypressMountWithProviders(
      <RadiobuttonComponent
        label="Label For CheckBox"
        labelHelp="Label Help"
        helpAriaLabel="This text provides more information for the label"
      />
    );

    radiobuttonIcon().trigger("mouseover");
    radiobuttonHelpIcon().should(
      "have.attr",
      "aria-label",
      "This text provides more information for the label"
    );
  });

  it.each([
    [true, "be.disabled"],
    [false, "not.be.disabled"],
  ])(
    "should render Radiobutton component with disabled prop set to %s",
    (booleanValue, assertion) => {
      CypressMountWithProviders(
        <RadiobuttonComponent disabled={booleanValue} />
      );
      radiobuttonRole().should(assertion);
    }
  );

  it("should render Radiobutton component with id", () => {
    CypressMountWithProviders(
      <RadiobuttonComponent id={CHARACTERS.STANDARD} />
    );
    radiobuttonRole().should("have.id", CHARACTERS.STANDARD);
  });

  it("should render Radiobutton component with name", () => {
    CypressMountWithProviders(<RadiobuttonComponent name="radiobutton name" />);
    radiobuttonRole().should("have.attr", "name", "radiobutton name");
  });

  it("should render Radiobutton component with value prop", () => {
    CypressMountWithProviders(
      <RadiobuttonComponent value="radiobuttonvalue" />
    );
    radiobuttonRole().should("have.value", "radiobuttonvalue");
  });

  it.each([
    [SIZE.SMALL, 16],
    [SIZE.LARGE, 24],
  ])(
    "should render Radiobutton component with size set to %s",
    (size, heightAndWidth) => {
      CypressMountWithProviders(<RadiobuttonComponent size={size} />);
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
    "should render Radiobutton component with %s as labelSpacing",
    (spacing, padding) => {
      CypressMountWithProviders(
        <RadiobuttonComponent labelSpacing={spacing} />
      );

      radiobuttonLabel().parent().should("have.css", "padding-left", padding);
    }
  );

  it.each([100, 75, 50, 25, 10])(
    "should render Radiobutton using %s as labelWidth with correct width",
    (labelWidth) => {
      CypressMountWithProviders(
        <RadiobuttonComponent
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
    "should render Radiobutton using %s as inputWidth and render it with correct width",
    (inputWidth) => {
      CypressMountWithProviders(
        <RadiobuttonComponent labelWidth={10} reverse inputWidth={inputWidth} />
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

  it("should render Radiobutton component with autoFocus", () => {
    CypressMountWithProviders(<RadiobuttonComponent autoFocus />);
    radiobuttonRole().should("be.focused");
  });

  it("should render Radiobutton component with error", () => {
    CypressMountWithProviders(<RadiobuttonComponent error />);

    radiobuttonSvg().should(
      "have.css",
      "border-bottom-color",
      VALIDATION.ERROR
    );
  });

  it("should render Radiobutton component with warning", () => {
    CypressMountWithProviders(<RadiobuttonComponent warning />);

    radiobuttonSvg().should(
      "have.css",
      "border-bottom-color",
      VALIDATION.WARNING
    );
  });

  it("should render Radiobutton component with info", () => {
    CypressMountWithProviders(<RadiobuttonComponent info />);

    radiobuttonSvg().should("have.css", "border-bottom-color", VALIDATION.INFO);
  });

  it("should render Radiobutton component with error message", () => {
    CypressMountWithProviders(
      <RadiobuttonComponent error="Error has occurred" />
    );

    radiobuttonIcon()
      .should("have.attr", "aria-label", "Error has occurred")
      .should("have.attr", "data-element", "error");
  });

  it("should render Radiobutton component with warning message", () => {
    CypressMountWithProviders(
      <RadiobuttonComponent warning="Warning has occurred" />
    );

    radiobuttonIcon()
      .should("have.attr", "aria-label", "Warning has occurred")
      .should("have.attr", "data-element", "warning");
  });

  it("should render Radiobutton component with info message", () => {
    CypressMountWithProviders(
      <RadiobuttonComponent info="Info has occurred" />
    );

    radiobuttonIcon()
      .should("have.attr", "aria-label", "Info has occurred")
      .should("have.attr", "data-element", "info");
  });

  it.each([
    [true, "0"],
    [false, "1"],
  ])(
    "should render Radiobutton with reverse prop set to %s",
    (reverseValue, position) => {
      CypressMountWithProviders(
        <RadiobuttonComponent
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
    "should render RadiobuttonComponent component with tooltip positioned to the %s",
    (position) => {
      CypressMountWithProviders(
        <RadiobuttonComponent
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

  it("should render Radiobutton component with fill color set to black by default", () => {
    CypressMountWithProviders(<RadiobuttonComponent checked />);
    radiobuttonRole()
      .should("be.checked")
      .should("have.css", "color", COLOR.BLACK);
  });

  describe("should render Radiobutton component and check events", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<RadiobuttonComponent onBlur={callback} />);

      radiobuttonRole()
        .focus()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onChange callback when a check event is triggered", () => {
      CypressMountWithProviders(<RadiobuttonComponent onChange={callback} />);

      radiobuttonRole()
        .check()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      CypressMountWithProviders(<RadiobuttonComponent onFocus={callback} />);

      radiobuttonRole()
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClick callback when a click event is triggered", () => {
      CypressMountWithProviders(<RadiobuttonComponent onClick={callback} />);

      radiobuttonRole()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    describe("Testing RadiobuttonGroup component", () => {
      it.each(testData)(
        "should render RadiobuttonGroup component with %s as legend",
        (legendValue) => {
          CypressMountWithProviders(
            <RadiobuttonGroupComponent legend={legendValue} />
          );
          radiobuttonGroupLegend().should("have.text", legendValue);
        }
      );

      it("should render RadiobuttonGroup component with error", () => {
        CypressMountWithProviders(<RadiobuttonGroupComponent error />);

        radiobuttonSvg().should(
          "have.css",
          "border-bottom-color",
          VALIDATION.ERROR
        );
      });

      it("should render RadiobuttonGroup component with warning", () => {
        CypressMountWithProviders(<RadiobuttonGroupComponent warning />);

        radiobuttonSvg().should(
          "have.css",
          "border-bottom-color",
          VALIDATION.WARNING
        );
      });

      it("should render RadiobuttonGroup component with info", () => {
        CypressMountWithProviders(<RadiobuttonGroupComponent info />);

        radiobuttonSvg().should(
          "have.css",
          "border-bottom-color",
          VALIDATION.INFO
        );
      });

      it("should render RadiobuttonGroup component with error message", () => {
        CypressMountWithProviders(
          <RadiobuttonGroupComponent error="Error has occurred" />
        );

        radiobuttonGroupIcon()
          .should("have.attr", "aria-label", "Error has occurred")
          .should("have.attr", "data-element", "error");
      });

      it("should render RadiobuttonGroup component with warning message", () => {
        CypressMountWithProviders(
          <RadiobuttonGroupComponent warning="Warning has occurred" />
        );

        radiobuttonGroupIcon()
          .should("have.attr", "aria-label", "Warning has occurred")
          .should("have.attr", "data-element", "warning");
      });

      it("should render RadiobuttonGroup component with info message", () => {
        CypressMountWithProviders(
          <RadiobuttonGroupComponent info="Info has occurred" />
        );

        radiobuttonGroupIcon()
          .should("have.attr", "aria-label", "Info has occurred")
          .should("have.attr", "data-element", "info");
      });

      it.each([
        ["left", "start"],
        ["right", "end"],
      ])(
        "should render RadiobuttonGroup component with inline legend aligned to %s",
        (position, assertion) => {
          CypressMountWithProviders(
            <RadiobuttonGroupComponent
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
        "should render RadiobuttonGroup component with inline legend width set to %s",
        (width) => {
          CypressMountWithProviders(
            <RadiobuttonGroupComponent legendWidth={width} legendInline />
          );
          radiobuttonGroupLegend().should("have.attr", "width", width);
        }
      );

      it("should render RadiobuttonGroup component with children", () => {
        CypressMountWithProviders(
          <RadiobuttonGroupComponent>
            <RadioButton id="radio-4" value="radio4" label="Don't Know" />
          </RadiobuttonGroupComponent>
        );
        radiobuttonGroup().should("contain.text", "Don't Know");
      });

      it.each([
        [1, "8px"],
        [2, "16px"],
      ])(
        "should render RadiobuttonGroup component with legendSpacing set to %s",
        (spacing, padding) => {
          CypressMountWithProviders(
            <RadiobuttonGroupComponent
              legendSpacing={spacing}
              legendWidth="10"
              legendInline
            />
          );
          radiobuttonGroupLegend().should("have.css", "padding-right", padding);
        }
      );

      it.each(["top", "bottom", "left", "right"])(
        "should render RadiobuttonGroupComponent component with tooltip positioned to the %s",
        (position) => {
          CypressMountWithProviders(
            <RadiobuttonGroupComponent
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

      it("should render RadiobuttonGroup component as a required field", () => {
        CypressMountWithProviders(<RadiobuttonGroupComponent required />);

        verifyRequiredAsteriskForLegend();
      });

      it("should render RadiobuttonGroup with radiobuttons inline", () => {
        CypressMountWithProviders(<RadiobuttonGroupComponent inline />);

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
        "should check RadiobuttonGroup legend is %s with adaptiveLabelBreakpoint %s and viewport 400",
        (alignment, breakpoint, float) => {
          cy.viewport(400, 300);

          CypressMountWithProviders(
            <RadiobuttonGroupComponent
              adaptiveLegendBreakpoint={breakpoint}
              adaptiveSpacingBreakpoint={breakpoint}
            />
          );

          radiobuttonGroupLegend().should("have.css", "float", float);
        }
      );
    });
  });
});
